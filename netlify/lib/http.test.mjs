import { describe, expect, it, vi } from 'vitest';

import { codeFromStatus, isConnectionError, isRetryable, withNetworkRetry } from './http.mjs';

const connectTimeout = () => Object.assign(new TypeError('fetch failed'), { cause: { code: 'UND_ERR_CONNECT_TIMEOUT' } });

describe('isConnectionError', () => {
    it('recognizes fetch failures and connection error codes', () => {
        expect(isConnectionError(connectTimeout())).toBe(true);
        expect(isConnectionError({ code: 'ECONNRESET' })).toBe(true);
    });

    it('does not treat HTTP or input errors as connection problems', () => {
        expect(isConnectionError({ httpResponse: { status: 500 } })).toBe(false);
        expect(isConnectionError(new Error('bad input'))).toBe(false);
    });
});

describe('withNetworkRetry', () => {
    it('retries connection failures and returns the first success', async () => {
        const task = vi.fn().mockRejectedValueOnce(connectTimeout()).mockResolvedValue('ok');
        await expect(withNetworkRetry(task, { attempts: 3, isNetworkError: isConnectionError })).resolves.toBe('ok');
        expect(task).toHaveBeenCalledTimes(2);
    });

    it('gives up after the last attempt', async () => {
        const task = vi.fn().mockRejectedValue(connectTimeout());
        await expect(withNetworkRetry(task, { attempts: 3, isNetworkError: isConnectionError })).rejects.toThrow('fetch failed');
        expect(task).toHaveBeenCalledTimes(3);
    });

    it('does not retry other errors', async () => {
        const task = vi.fn().mockRejectedValue(new Error('401'));
        await expect(withNetworkRetry(task, { attempts: 3, isNetworkError: isConnectionError })).rejects.toThrow('401');
        expect(task).toHaveBeenCalledTimes(1);
    });
});

describe('status mapping', () => {
    it('maps account level statuses to codes the UI can explain', () => {
        expect(codeFromStatus(401)).toBe('auth');
        expect(codeFromStatus(402)).toBe('quota');
        expect(codeFromStatus(429)).toBe('rate_limit');
        expect(codeFromStatus(503)).toBe('unavailable');
    });

    it('only falls back to another model for errors a different model could avoid', () => {
        expect(isRetryable(503)).toBe(true);
        expect(isRetryable(404)).toBe(true);
        expect(isRetryable(402)).toBe(false);
        expect(isRetryable(429)).toBe(false);
    });
});
