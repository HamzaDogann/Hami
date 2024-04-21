//React Hooks
import React, { useEffect } from 'react';

//Styles
import "./avatarSelection.css"

const Avatar = ({ id, AvatarImage, isSelected, onSelect }) => {

    const handleClick = () => {
        onSelect(id);
    };

    useEffect(() => {
        const avatarElement = document.getElementById(`avatar-${id}`);
        if (!isSelected) {
            avatarElement.style.opacity = 0.9;
        } else {
            avatarElement.style.opacity = 1;
        }
    }, [id, isSelected]);

    return (
        <div
            id={`avatar-${id}`}
            onClick={handleClick}
            className={`cursor-pointer avatar-style sm:mx-4 hover:scale-110 transition-all ease-in-out 
            ${isSelected ? 'bg-white rounded-full' : ''}`}>

            <img className='avatar-img-style sm:w-14 border-white'
                src={AvatarImage}
                alt={`Avatar ${id}`} 
            />
        </div>
    );
};

export default Avatar;
