import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { aiErrorKey, translations } from './translations';

const sourceFiles = (dir) =>
    readdirSync(dir).flatMap((name) => {
        const path = join(dir, name);
        if (statSync(path).isDirectory()) return sourceFiles(path);
        return /\.jsx?$/.test(name) && !/\.test\.jsx?$/.test(name) ? [path] : [];
    });

// Every key the UI can ask for: t("key"), labelKey / captionKey entries, intro stages and suggestions.
const usedKeys = () => {
    const keys = new Set();
    const patterns = [/\bt\(\s*["'](\w+)["']\s*\)/g, /Key:\s*["'](\w+)["']/g, /stage:\s*["'](loginInfo\w+)["']/g, /["'](suggestion\d)["']/g];

    for (const file of sourceFiles('src')) {
        const code = readFileSync(file, 'utf8');
        for (const pattern of patterns) {
            for (const match of code.matchAll(pattern)) keys.add(match[1]);
        }
    }
    return keys;
};

describe('translations', () => {
    const languages = Object.keys(translations);

    it('defines the same keys in every language', () => {
        const [first, ...others] = languages;
        for (const language of others) {
            expect(Object.keys(translations[language]).sort(), `${language} vs ${first}`).toEqual(Object.keys(translations[first]).sort());
        }
    });

    it('has no empty texts', () => {
        for (const language of languages) {
            for (const [key, text] of Object.entries(translations[language])) {
                expect(text.trim(), `${language}.${key}`).not.toBe('');
            }
        }
    });

    it('covers every key used in the source code', () => {
        const used = usedKeys();
        expect(used.size).toBeGreaterThan(50);
        for (const key of used) {
            for (const language of languages) {
                expect(translations[language][key], `${language}.${key} is missing`).toBeDefined();
            }
        }
    });

    it('maps every AI error code to an existing text', () => {
        for (const code of ['auth', 'quota', 'rate_limit', 'bad_request', 'unavailable', 'config', 'network', undefined]) {
            expect(translations.en[aiErrorKey(code)]).toBeDefined();
        }
    });
});
