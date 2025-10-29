import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets.js'
import { Link, NavLink, useNavigate } from 'react-router-dom'

function Navbar() {

  const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'All Stays', path: '/stays' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const navigate = useNavigate();

    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Hide navbar when scrolling down, show when scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false); // Scrolling down
            } else {
                setIsVisible(true); // Scrolling up
            }
            
            // Add background when scrolled
            setIsScrolled(currentScrollY > 10);
            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        
            
            <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            } ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "bg-transparent py-4 md:py-6"}`}>

                {/* Logo */}
                <Link>
                    <img src={assets.logo} alt="" className={`h-12 `}/>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                            {link.name}
                            <div className='bg-primary h-0.5 w-0 group-hover:w-full transition-all duration-300' />
                        </a>
                    ))}
                    
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">
                    <button onClick={() => navigate('/login')} className='bg-primary text-white py-3 px-6 rounded-full font-light hidden md:block'>Create Account</button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-3 md:hidden">
                    <img src={assets.menu_icon} alt="" className='h-6 cursor-pointer' onClick={() => setIsMenuOpen(true)} />
                </div>

                {/* Mobile Menu */}
                <div className={`fixed items-center top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-start px-8 pt-8 gap-6 font-medium text-gray-800 transition-all duration-500 z-[60] ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="flex items-center justify-between w-full mb-4">
                        <img src={assets.logo} alt="" className='h-10' />
                        <img src={assets.cross_icon} alt="" className='h-7 w-7 cursor-pointer' onClick={() => setIsMenuOpen(false)} />
                    </div>

                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)} className="text-lg hover:text-primary transition-colors">
                            {link.name.toUpperCase()}
                        </a>
                    ))}
                </div>
            </nav>
        
    );


  

}

export default Navbar
