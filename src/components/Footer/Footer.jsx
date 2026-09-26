import { Link } from 'react-router-dom'

import { useTheme } from '../../providers/ThemeContext';

import "./FooterStyles.css";

import { FaGithub } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";
import { IoLogoYoutube } from "react-icons/io5";

const SOCIAL_LINKS = [
    { href: "https://www.youtube.com/", label: "YouTube", Icon: IoLogoYoutube },
    { href: "https://www.linkedin.com/in/hamzadogann/", label: "LinkedIn", Icon: GrLinkedin },
    { href: "https://github.com/HamzaDogann", label: "GitHub", Icon: FaGithub },
    { href: "https://www.instagram.com/hamza.dgn_/", label: "Instagram", Icon: FaSquareInstagram },
];

const Footer = () => {

    const { isLightTheme } = useTheme();

    return (
        <div className={`footer-box w-full flex text-center relative h-60 bottom-0 ${!isLightTheme ? "bg-[#121212]" : "bg-[#e5e7eb]"}`}>
            {/* Logo */}
            <div>
                <h1 className="footer-hami-logo mt-8 relative">
                    <Link to="/">Hami</Link>
                </h1>
            </div>

            {/* Links */}
            <div className={`links-box border-gray-50 flex justify-center items-center h-20 mt-3`}>
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                    <a key={href} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className={`${!isLightTheme ? 'text-white' : 'text-[#3f3f46]'} link-item`}>
                        <Icon />
                    </a>
                ))}
            </div>

            {/* Copyright */}
            <div className='mt-4'>
                <span className={`text-[#71717a] copyright-span`}>Copyright © 2024 Hamza Dogan. All rights reserved.</span>
            </div>
        </div>
    )
}

export default Footer
