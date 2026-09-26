import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import Modal from '../components/ModalComponent/Modal';

const ModalContext = createContext(null);

const ALERT_DURATION_MS = 3750;

// Shows a short-lived alert message. The alert itself is rendered here, so pages only call showAlert().
export const ModalProvider = ({ children }) => {
    const [content, setContent] = useState('');
    const timerRef = useRef(null);

    const showAlert = useCallback((message) => {
        clearTimeout(timerRef.current);
        setContent(message);
        timerRef.current = setTimeout(() => setContent(''), ALERT_DURATION_MS);
    }, []);

    useEffect(() => () => clearTimeout(timerRef.current), []);

    const value = useMemo(() => ({ showAlert }), [showAlert]);

    return (
        <ModalContext.Provider value={value}>
            {children}
            {content && <Modal content={content} />}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error('useModal must be used inside <ModalProvider>');
    return context;
};
