import { useCallback } from 'react';

import { useTransientFlag } from './useTransientFlag';

// copy(text) writes to the clipboard; `copied` stays true for `resetAfterMs` so the UI can show a check mark.
export function useCopyToClipboard(resetAfterMs = 1500) {
    const { active: copied, trigger, reset } = useTransientFlag(resetAfterMs);

    const copy = useCallback(async (text) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            return; // Clipboard blocked (insecure context / permission); nothing to confirm.
        }
        trigger();
    }, [trigger]);

    return { copied, copy, reset };
}
