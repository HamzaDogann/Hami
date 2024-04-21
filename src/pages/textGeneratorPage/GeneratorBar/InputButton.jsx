//React Hooks
import React, { useRef, useEffect, useContext } from 'react';

// Providers
import { AIContext } from '../../../providers/AIChatContext';

// Styles - Icons
import "../textGenerator.css";
import { BiSend } from 'react-icons/bi';

function InputButton({ theme, language }) {

    const inputRef = useRef(null);

    const { onSent, setInput, input, resultData } = useContext(AIContext)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 200)}px`;
        }

        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                inputRef.current.style.height = 'auto';
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [input]);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const inputController = () => {
        return !input || !input.trim();

    };
    const handleButtonClick = () => {
        if (!inputController() && resultData === "empty") {
            onSent();
        }

        if (!inputController() && resultData !== "") {
            onSent();
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            handleButtonClick();
        }
    };

    return (
        <div
            className={`search-box ${!theme ? "bg-[#212121]" : "bg-gray-300"}`}>
            <textarea
                className={`${!theme ? "bg-[#212121] text-white  " : "bg-gray-300 text-black"} `}
                id="myTextarea"
                ref={inputRef}
                rows="1"
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={`${language === "en" ? "Write your message here..." : "Mesajınızı buraya yazın..."}`}
                style={{ maxHeight: '200px', overflowY: 'auto', borderRadius: '30px 10px 30px 30px', padding: '10px', paddingLeft: '20px', resize: 'none', position: 'absolute', bottom: '10px', outline: 'none', zIndex: '999' }}
            />

            <button
                id="sendButton"
                disabled={inputController()}
                onClick={handleButtonClick}>
                <BiSend />
            </button>
        </div>
    );
}

export default InputButton;
