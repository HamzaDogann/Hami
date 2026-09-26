import "./avatarSelection.css"

const Avatar = ({ id, AvatarImage, isSelected, onSelect }) => (
    <div
        onClick={() => onSelect(id)}
        style={{ opacity: isSelected ? 1 : 0.9 }}
        className={`cursor-pointer avatar-style sm:mx-4 hover:scale-110 transition-all ease-in-out 
            ${isSelected ? 'bg-white rounded-full' : ''}`}>

        <img className='avatar-img-style sm:w-14 border-white'
            src={AvatarImage}
            alt={`Avatar ${id}`}
        />
    </div>
);

export default Avatar;
