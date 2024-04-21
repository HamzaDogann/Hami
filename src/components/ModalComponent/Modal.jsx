// Providers
import { useTheme } from '../../providers/ThemeContext';

//Styles
import './Modal.css';

const Modal = ({ content }) => {

    const { darkMode } = useTheme();
    
    return (
        <div className={`modal-container fixed top-2 ${darkMode ? 'text-black bg-zinc-100' : 'text-white'}`}>
            {content}
        </div>
    );
};

export default Modal;
