import { useEffect, useRef } from 'react';

import { useAIChat } from '../../../providers/AIChatContext';
import { useLanguage } from '../../../providers/LanguageContext';
import { useTheme } from '../../../providers/ThemeContext';

import "../textGenerator.css";
import { BiSend } from 'react-icons/bi';

const MAX_INPUT_HEIGHT = 200;

function InputButton() {

    const inputRef = useRef(null);

    const { t } = useLanguage();
    const { isLightTheme } = useTheme();
    const { input, setInput, sendPrompt, loading } = useAIChat();

    const canSend = input.trim() !== "" && !loading;

    // Grow with the text; shrink back when the user clicks elsewhere.
    useEffect(() => {
        const textarea = inputRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_INPUT_HEIGHT)}px`;
        }

        const handleClickOutside = (event) => {
            if (textarea && !textarea.contains(event.target)) textarea.style.height = 'auto';
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [input]);

    // Enter sends, Shift+Enter inserts a new line.
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (canSend) sendPrompt();
        }
    };

    return (
        <div
            className={`search-box ${!isLightTheme ? "bg-[#212121]" : "bg-gray-300"}`}>
            <textarea
                className={`${!isLightTheme ? "bg-[#212121] text-white  " : "bg-gray-300 text-black"} `}
                id="myTextarea"
                ref={inputRef}
                rows="1"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("messagePlaceholder")}
                style={{ maxHeight: `${MAX_INPUT_HEIGHT}px`, overflowY: 'auto', borderRadius: '30px 10px 30px 30px', padding: '10px', paddingLeft: '20px', resize: 'none', position: 'absolute', bottom: '10px', outline: 'none', zIndex: '999' }}
            />

            <button
                id="sendButton"
                disabled={!canSend}
                onClick={sendPrompt}>
                <BiSend />
            </button>
        </div>
    );
}

export default InputButton;
