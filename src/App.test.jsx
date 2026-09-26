// @vitest-environment jsdom
// Smoke tests: the whole app is rendered and driven like a user would, with the AI functions mocked.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, configure, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

const jsonResponse = (body, { ok = true, status = 200 } = {}) => ({ ok, status, json: async () => body });
const imageResponse = () => ({ ok: true, status: 200, blob: async () => new Blob(['fake-image'], { type: 'image/jpeg' }) });

// The text page is lazy-loaded; its first import (markdown + syntax highlighter) can take a few seconds.
configure({ asyncUtilTimeout: 15000 });

let fetchMock;

const renderApp = (path) =>
    render(
        <MemoryRouter initialEntries={[path]}>
            <App />
        </MemoryRouter>
    );

const signIn = () => localStorage.setItem('userAccount', JSON.stringify({ avatarId: 1, username: 'Ada' }));

beforeEach(() => {
    localStorage.clear();
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    URL.createObjectURL = vi.fn(() => 'blob:mock-image');
    URL.revokeObjectURL = vi.fn();
});

afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
});

describe('routing', () => {
    it('sends visitors without a profile to the login page', async () => {
        const { container } = renderApp('/menu');
        expect(container.querySelector('.hami-logo-box')).not.toBeNull();
        expect(screen.queryByText('Text Generator')).toBeNull();
    });

    it('shows the menu to signed-in users', () => {
        signIn();
        renderApp('/');
        expect(screen.getByText('Text Generator')).toBeTruthy();
        expect(screen.getByText('Image Generator')).toBeTruthy();
    });

    it('lets a new user pick a name and avatar and reach the menu', async () => {
        vi.useFakeTimers({ shouldAdvanceTime: true });
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        renderApp('/');

        await act(async () => { vi.advanceTimersByTime(12500); });

        // Next without a name is rejected
        await user.click(screen.getByText('Next'));
        expect(screen.getByText('Please choose a username and avatar')).toBeTruthy();

        await user.type(screen.getByPlaceholderText('Please choose a username'), 'Ada');
        await user.click(screen.getByAltText('Avatar 3'));
        await user.click(screen.getByText('Next'));

        expect(await screen.findByText('Text Generator')).toBeTruthy();
        expect(JSON.parse(localStorage.getItem('userAccount'))).toEqual({ avatarId: 3, username: 'Ada' });
    });
});

describe('text generator', () => {
    beforeEach(signIn);

    it('answers a prompt, saves it as favorite and deletes it again', async () => {
        fetchMock.mockResolvedValue(jsonResponse({ text: '## Merhaba dünya\n\nHello there' }));
        const user = userEvent.setup();
        const { container } = renderApp('/text-generator');

        await user.type(await screen.findByPlaceholderText('Write your message here...'), 'Say hi');
        await user.keyboard('{Enter}');

        expect(await screen.findByText('Merhaba dünya')).toBeTruthy();
        expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ prompt: 'Say hi', language: 'en' });

        // heart button = 4th action button
        await user.click(container.querySelectorAll('.icon-btns button')[3]);
        expect(screen.getByText('A new favorite chat has been added')).toBeTruthy();
        expect(JSON.parse(localStorage.getItem('favChats'))).toHaveLength(1);

        // open the favorite, then delete it through the confirm popup
        await user.click(container.querySelector('.favorite-chats-ul li'));
        await user.click(container.querySelectorAll('.selected-favorite .options-btns')[1]);
        await user.click(container.querySelector('#delete-btn'));

        await waitFor(() => expect(screen.getByText('No favorite chats')).toBeTruthy());
        expect(JSON.parse(localStorage.getItem('favChats'))).toEqual([]);
        expect(container.querySelector('.selected-favorite')).toBeNull();
    });

    it('shows a readable message when the free quota is used up', async () => {
        fetchMock.mockResolvedValue(jsonResponse({ error: { code: 'quota' } }, { ok: false, status: 402 }));
        const user = userEvent.setup();
        const { container } = renderApp('/text-generator');

        await user.type(await screen.findByPlaceholderText('Write your message here...'), 'Hello');
        await user.click(container.querySelector('#sendButton'));

        expect(await screen.findByText(/monthly free AI quota/)).toBeTruthy();
        // no like / favorite buttons for an error message
        expect(container.querySelector('.icon-btns')).toBeNull();
    });
});

describe('image generator', () => {
    beforeEach(signIn);

    it('generates an image, saves it and finds it in the favorites page', async () => {
        fetchMock.mockResolvedValue(imageResponse());
        const user = userEvent.setup();
        const { container } = renderApp('/image-generator');

        // empty prompt is rejected
        await user.click(screen.getAllByText('Generate Image')[0]);
        expect(screen.getByText('Please input a prompt.')).toBeTruthy();
        expect(fetchMock).not.toHaveBeenCalled();

        await user.type(screen.getByPlaceholderText(/Write your request/), 'a red fox');
        await user.click(screen.getByText('Cinematic'));
        await user.click(screen.getByText('Medium'));
        await user.click(screen.getAllByText('Generate Image')[0]);

        expect(await screen.findByText('Download Image')).toBeTruthy();
        expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ prompt: 'a red fox', quality: 'Medium', style: 'Cinematic' });
        expect(container.querySelector('.img-element').getAttribute('src')).toBe('blob:mock-image');

        await user.click(screen.getByText('Save In Favorites'));
        expect(await screen.findByText('Saved')).toBeTruthy();
        expect(JSON.parse(localStorage.getItem('favImages'))).toHaveLength(1);

        await user.click(container.querySelector('.show-favorites-btn'));
        expect(await screen.findByText('Favorite Images')).toBeTruthy();
        expect(container.querySelectorAll('.image-box img')).toHaveLength(1);

        // search narrows the list
        await user.type(screen.getByPlaceholderText('Search in favorites...'), 'zzz');
        expect(screen.getByText('Not found favorite images')).toBeTruthy();
    });

    it('tells the user when the browser storage is full', async () => {
        fetchMock.mockResolvedValue(imageResponse());
        const user = userEvent.setup();
        const { container } = renderApp('/image-generator');

        await user.type(await screen.findByPlaceholderText(/Write your request/), 'a red fox');
        await user.click(screen.getAllByText('Generate Image')[0]);
        await screen.findByText('Download Image');

        const original = Storage.prototype.setItem;
        Storage.prototype.setItem = () => { throw new Error('QuotaExceededError'); };
        try {
            await user.click(screen.getByText('Save In Favorites'));
            expect(await screen.findByText(/storage is full/)).toBeTruthy();
            expect(container.querySelector('.saved-span')).toBeNull();
        } finally {
            Storage.prototype.setItem = original;
        }
    });
});
