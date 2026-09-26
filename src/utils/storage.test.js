import { beforeEach, describe, expect, it, vi } from 'vitest';

import { readJSON, writeJSON, readString } from './storage';

const createStorage = ({ failOnWrite = false } = {}) => {
    const data = new Map();
    return {
        getItem: (key) => (data.has(key) ? data.get(key) : null),
        setItem: (key, value) => {
            if (failOnWrite) throw new Error('QuotaExceededError');
            data.set(key, String(value));
        },
        removeItem: (key) => data.delete(key),
    };
};

describe('storage', () => {
    beforeEach(() => {
        vi.stubGlobal('localStorage', createStorage());
    });

    it('round-trips JSON values', () => {
        expect(writeJSON('k', { a: [1, 2] })).toBe(true);
        expect(readJSON('k', null)).toEqual({ a: [1, 2] });
    });

    it('returns the fallback for missing keys', () => {
        expect(readJSON('missing', 'fallback')).toBe('fallback');
        expect(readString('missing')).toBeNull();
    });

    it('returns the fallback for corrupted JSON instead of throwing', () => {
        localStorage.setItem('bad', '{not json');
        expect(readJSON('bad', [])).toEqual([]);
    });

    it('reports false when the browser refuses the write (quota exceeded)', () => {
        vi.stubGlobal('localStorage', createStorage({ failOnWrite: true }));
        expect(writeJSON('k', 'value')).toBe(false);
    });
});
