'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

const navLinks = [
    { title: 'Stack', path: '#stack' },
    { title: 'Portfolio', path: '#portfolio' },
    { title: 'About', path: '#about' },
    { title: 'Contact', path: '#contact' },
]

const NavBar = () => {
    const [nav, setNav] = useState(false)
    const [activeHash, setActiveHash] = useState('')

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            // Clear active state if we are at the very top (Hero section)
            if (scrollPosition < 100) {
                setActiveHash("");
                return;
            }

            let current = "";
            // Iterate backwards to find the deepest section we've scrolled to
            for (let i = navLinks.length - 1; i >= 0; i--) {
                const link = navLinks[i];
                const element = document.getElementById(link.path.substring(1));
                if (element) {
                    // Check if the top of the section is within 300px of the viewport's top
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 300) {
                        current = link.path;
                        break;
                    }
                }
            }

            if (current) {
                setActiveHash(current);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Run once on mount to capture initial scroll position
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleNav = () => {
        setNav(!nav)
    }

    const closeNav = () => {
        setNav(false)
    }

    return (
        <nav aria-label="Main navigation" className="z-50 fixed flex justify-center w-full text-white font-bold">
            {/* Desktop Navbar */}
            <div className="border border-white/20 mt-8 backdrop-blur-3xl rounded-3xl hidden sm:flex items-center justify-center p-2 max-w-[400px] mx-auto">
                <ul className="flex flex-row p-2 space-x-8 mt-1">
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <Link 
                                href={link.path} 
                                onClick={() => setActiveHash(link.path)}
                                aria-current={activeHash === link.path ? 'page' : undefined}
                                className={`transform leading-[125%] transition-all duration-300 ease-in-out ${activeHash === link.path ? 'text-white/50' : 'hover:text-white/50'}`}
                            >
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Hamburger Menu */}
            <div
                onClick={toggleNav}
                className="sm:hidden absolute top-5 right-6 z-50 border rounded p-2 text-white/70 border-white/70"
            >
                {!nav ? (
                    <AiOutlineMenu size={20} />
                ) : (
                    <AiOutlineClose size={20} />
                )}
            </div>

            <div className={`fixed left-0 top-0 w-full h-full bg-[#1b1b1b] transform transition-transform duration-300 ${nav ? 'translate-x-0' : '-translate-x-full'}`}>

                <ul className='flex flex-col items-center justify-center space-y-8 h-full'>
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <Link 
                                href={link.path} 
                                onClick={() => {
                                    closeNav();
                                    setActiveHash(link.path);
                                }} 
                                aria-current={activeHash === link.path ? 'page' : undefined}
                                className={`transform leading-[125%] transition-all duration-300 ease-in-out ${activeHash === link.path ? 'text-white/50' : 'hover:text-white/50'}`}
                            >
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>

            </div>

        </nav>
    )
}

export default NavBar
