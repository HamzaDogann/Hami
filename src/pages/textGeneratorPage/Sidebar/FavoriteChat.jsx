import { memo } from 'react';

import { TiDelete } from "react-icons/ti";

const FavoriteChat = memo(function FavoriteChat({ chat, isLightTheme, onSelect, onDelete }) {

    const handleDelete = (event) => {
        event.stopPropagation(); // Deleting must not also open the chat.
        onDelete(chat);
    };

    return (
        <li onClick={() => onSelect(chat)} className={`li-chat-animation favori-li  mt-3 flex justify-between items-center rounded-[10px] p-4 cursor-pointer ${isLightTheme ? "border-[#cecece] bg-[#d7d7d7bb]" : "border-[#3d3d3d] bg-[#1b1b1bd8]"}`}>
            <span className={`${isLightTheme ? "text-[#303030]" : "text-[#e2e2e2]"} font-light truncate-text`}>
                {chat.title}
            </span>
            <button onClick={handleDelete} value={chat.id} className='delete-btn'><TiDelete /></button>
        </li>
    );
});

export default FavoriteChat;
