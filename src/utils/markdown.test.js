import { describe, expect, it } from 'vitest';

import { markdownToPlainText } from './markdown';

describe('markdownToPlainText', () => {
    it('keeps heading text but drops the # markers', () => {
        expect(markdownToPlainText('# Title\n\nBody')).toBe('Title\n\nBody');
    });

    it('removes bold, italic and inline code markers', () => {
        expect(markdownToPlainText('**bold** and *italic* and `code`')).toBe('bold and italic and code');
    });

    it('keeps the link text and image alt text', () => {
        expect(markdownToPlainText('[Hami](https://example.com) ![logo](a.png)')).toBe('Hami logo');
    });

    it('keeps the content of fenced code blocks', () => {
        const markdown = 'Before\n```js\nconst a = 1;\n```\nAfter';
        expect(markdownToPlainText(markdown)).toBe('Before\nconst a = 1;\n\nAfter');
    });

    it('leaves list bullets alone', () => {
        expect(markdownToPlainText('* one\n* two')).toBe('* one\n* two');
    });
});
