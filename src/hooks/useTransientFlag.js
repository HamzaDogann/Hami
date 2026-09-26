import { useCallback, useEffect, useRef, useState } from 'react';

// A boolean that turns true on trigger() and falls back to false after `durationMs`
// (e.g. a "Downloaded" label). The timer is cleaned up on unmount.
export function useTransientFlag(durationMs) {
    const [active, setActive] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => () => clearTimeout(timerRef.current), []);

    const trigger = useCallback(() => {
        clearTimeout(timerRef.current);
        setActive(true);
        timerRef.current = setTimeout(() => setActive(false), durationMs);
    }, [durationMs]);

    const reset = useCallback(() => {
        clearTimeout(timerRef.current);
        setActive(false);
    }, []);

    return { active, trigger, reset };
}
