import { useTheme } from '../../providers/ThemeContext';

import './Modal.css';

const Modal = ({ content }) => {

    const { isLightTheme } = useTheme();

    return (
        <div className={`modal-container fixed top-2 ${isLightTheme ? 'text-black bg-zinc-100' : 'text-white'}`}>
            {content}
        </div>
    );
};

export default Modal;
