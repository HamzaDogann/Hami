//Router
import { Link, useNavigate } from 'react-router-dom'

//Styles
import "./FooterStyles.css";

// Links Icons
import { FaGithub } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";
import { IoLogoYoutube } from "react-icons/io5";


const Footer = ({ theme }) => {

    const Navigate = useNavigate();

    const handleHami = () => {
        // Home
        Navigate("/")
        // Reload for clean performance
        window.location.reload();
    };

    return (
        <>
            <div className={`footer-box w-full flex text-center relative h-60 bottom-0 ${!theme ? "bg-[#121212]" : "bg-[#e5e7eb]"}`}>
                {/* Logo */}
                <div>
                    <h1 onClick={handleHami} className="footer-hami-logo mt-8 relative">
                        <Link>Hami</Link>
                    </h1>
                </div>

                {/* Links */}
                <div className={`links-box border-gray-50 flex justify-center items-center h-20 mt-3`}>
                    <a href="https://www.youtube.com/" target="_blank" className={`${!theme ? 'text-white' : 'text-[#3f3f46]'} link-item`}><IoLogoYoutube /></a>
                    <a href="https://www.linkedin.com/in/hamzadogann/" target="_blank" className={`${!theme ? 'text-white' : 'text-[#3f3f46]'} link-item`}><GrLinkedin /></a>
                    <a href="https://github.com/HamzaDogann" target="_blank" className={`${!theme ? 'text-white' : 'text-[#3f3f46]'} link-item`}><FaGithub /></a>
                    <a href="https://www.instagram.com/hamza.dgn_/" target="_blank" className={`${!theme ? 'text-white' : 'text-[#3f3f46]'} link-item`}><FaSquareInstagram /></a>
                </div>

                {/* Copyright */}
                <div className='mt-4'>
                    <span className={`text-[#71717a] copyright-span`}>Copyright © 2024 Hamza Dogan. All rights reserved.</span>
                </div>
            </div>
        </>
    )
}

export default Footer