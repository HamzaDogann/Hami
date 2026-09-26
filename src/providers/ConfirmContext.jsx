import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import ConfirmPopup from '../components/ConfirmPopup/ConfirmPopup';
import { useLanguage } from './LanguageContext';
import { useModal } from './AlertModalContext';

const ConfirmContext = createContext(null);

// Any component can ask "are you sure?" with confirm({ content, onConfirm }) instead of owning popup state.
export const ConfirmProvider = ({ children }) => {
    const { t } = useLanguage();
    const { showAlert } = useModal();
    const [request, setRequest] = useState(null);

    const confirm = useCallback((options) => setRequest(options), []);
    const close = useCallback(() => setRequest(null), []);

    const handleConfirm = () => {
        request.onConfirm();
        close();
        showAlert(t('deleteDone'));
    };

    const value = useMemo(() => ({ confirm }), [confirm]);

    return (
        <ConfirmContext.Provider value={value}>
            {children}
            {request && <ConfirmPopup content={request.content} onConfirm={handleConfirm} onCancel={close} />}
        </ConfirmContext.Provider>
    );
};

export const useConfirm = () => {
    const context = useContext(ConfirmContext);
    if (!context) throw new Error('useConfirm must be used inside <ConfirmProvider>');
    return context;
};
