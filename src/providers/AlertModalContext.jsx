//React Hooks
import { createContext, useContext, useState } from 'react';

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState({
        show: false,
        content: '',
    });

    const toggleModal = (show, content) => {
        setShowModal({
            show: show,
            content: content,
        });

        setTimeout(() => {
            setShowModal({ show: false, content: '' });
        }, 3750);
    };

    return (
        <ModalContext.Provider value={{ showModal, toggleModal }}>
            {children}
        </ModalContext.Provider>
    );
};

const useModal = () => {
    const context = useContext(ModalContext);
    return context;
};

export { ModalProvider, useModal };