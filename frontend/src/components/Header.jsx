import React, { useState, useEffect } from 'react';
import { Navbar, Dropdown } from 'flowbite-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { SiCodefresh } from 'react-icons/si';
import { useTheme } from './context/AppContext';
import ToggleSwitch from './ToggleSwitch';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [headerValue, setHeaderValue] = useState('Home');
    const [linkValue, setLinkValue] = useState('/');
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleDropdownItemClick = (value, link) => {
        setHeaderValue(value);
        setLinkValue(link);
        navigate(link);
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const offset = -60;
            const sectionPosition = section.offsetTop + offset;
            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-50 ${isHomePage
                ? scrolled
                    ? 'bg-white shadow-lg'
                    : 'bg-transparent'
                : 'bg-white shadow-lg'
                } ${theme === 'dark' ? 'dark-theme' : ''}`}
        >
            <Navbar className={`${isHomePage ? (scrolled ? (theme !== 'dark' ? 'bg-white' : 'bg-gray-900') : 'bg-transparent') : (theme !== 'dark' ? 'bg-white' : 'bg-gray-900')} p-3`}>
                <div className="flex justify-between px-2">
                    <NavLink to="/" className={`flex items-center ${theme !== 'dark' ? 'text-gray-900' : 'text-white'} font-semibold text-nowrap sm:text-lg text-md typewriter`} style={{ fontVariant: 'unicase' }}>
                        <SiCodefresh className="mr-3 h-6 w-6 md:h-8 md:w-8" />
                        {'< Rupesh / Thakur >'}
                    </NavLink>
                </div>
                <div className="flex flex-wrap justify-center sm:gap-3 md:gap-4 lg:gap-6 items-center mx-auto">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `block py-2 duration-200 ${isActive ? (isHomePage && !scrolled ? (theme !== 'dark' ? 'text-gray-900' : 'text-white') : (theme !== 'dark' ? 'text-orange-700' : 'text-orange-200')) : (isHomePage && !scrolled ? (theme !== 'dark' ? 'text-gray-700' : 'text-gray-200') : 'text-gray-700')} font-semibold text-lg mx-2 hidden md:block`}
                        onClick={() => scrollToSection('home')}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="#"
                        className={({ isActive }) => `block py-2 duration-200 ${isActive ? (isHomePage && !scrolled ? (theme !== 'dark' ? 'text-gray-900' : 'text-white') : (theme !== 'dark' ? 'text-orange-700' : 'text-orange-200')) : (isHomePage && !scrolled ? (theme !== 'dark' ? 'text-gray-700' : 'text-gray-200') : 'text-gray-700')} font-semibold text-lg mx-2 hidden md:block`}
                        onClick={() => scrollToSection('about')}
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="#"
                        className={({ isActive }) => `block py-2 duration-200 ${isActive ? (isHomePage && !scrolled ? (theme !== 'dark' ? 'text-gray-900' : 'text-white') : (theme !== 'dark' ? 'text-orange-700' : 'text-orange-200')) : (isHomePage && !scrolled ? (theme !== 'dark' ? 'text-gray-700' : 'text-gray-200') : 'text-gray-700')} font-semibold text-lg mx-2 hidden md:block`}
                        onClick={() => scrollToSection('projects')}
                    >
                        Projects
                    </NavLink>
                    <NavLink
                        to="#"
                        className={({ isActive }) => `block py-2 duration-200 ${isActive ? (isHomePage && !scrolled ? (theme !== 'dark' ? 'text-gray-900' : 'text-white') : (theme !== 'dark' ? 'text-orange-700' : 'text-orange-200')) : (isHomePage && !scrolled ? (theme !== 'dark' ? 'text-gray-700' : 'text-gray-200') : 'text-gray-700')} font-semibold text-lg mx-2 hidden md:block`}
                        onClick={() => scrollToSection('contact')}
                    >
                        Contact Me
                    </NavLink>
                    <NavLink
                        to="#"
                        className={({ isActive }) => `block py-2 duration-200 ${isActive ? (isHomePage && !scrolled ? (theme !== 'dark' ? 'text-gray-900' : 'text-white') : (theme !== 'dark' ? 'text-orange-700' : 'text-orange-200')) : (isHomePage && !scrolled ? (theme !== 'dark' ? 'text-gray-700' : 'text-gray-200') : 'text-gray-700')} font-semibold text-lg mx-2 hidden md:block`}
                        onClick={() => scrollToSection('resume')}
                    >
                        Resume
                    </NavLink>
                </div>
                <div className="block md:hidden mr-5">
                    <Dropdown
                        inline
                        arrowIcon={false}
                        className={`${isHomePage && !scrolled ? 'bg-transparent' : (theme !== 'dark' ? 'bg-white' : 'bg-gray-900')} flex justify-center items-center w-32`}
                        label={
                            <NavLink
                                to={linkValue}
                                className={({ isActive }) => `block py-2 duration-200 ${isActive ? (isHomePage && !scrolled ? (theme !== 'dark' ? 'text-gray-900' : 'text-white') : (theme !== 'dark' ? 'text-orange-700' : 'text-orange-200')) : ''} font-semibold mx-2 block md:hidden`}
                            >
                                {headerValue}
                            </NavLink>
                        }
                    >
                        <Dropdown.Item
                            className={`text-md ${isHomePage && !scrolled ? (theme === 'dark' ? 'text-white' : 'text-gray-900') : (theme === 'dark' ? 'text-white' : 'text-gray-900')}`}
                            onClick={() => {
                                scrollToSection('home');
                                handleDropdownItemClick('Home', '/');
                            }}
                        >
                            Home
                        </Dropdown.Item>
                        <Dropdown.Item
                            className={`text-md ${isHomePage && !scrolled ? (theme === 'dark' ? 'text-white' : 'text-gray-900') : (theme === 'dark' ? 'text-white' : 'text-gray-900')}`}
                            onClick={() => {
                                scrollToSection('about');
                                handleDropdownItemClick('About', '#');
                            }}
                        >
                            About
                        </Dropdown.Item>
                        <Dropdown.Item
                            className={`text-md ${isHomePage && !scrolled ? (theme === 'dark' ? 'text-white' : 'text-gray-900') : (theme === 'dark' ? 'text-white' : 'text-gray-900')}`}
                            onClick={() => {
                                scrollToSection('projects');
                                handleDropdownItemClick('Projects', '#');
                            }}
                        >
                            Projects
                        </Dropdown.Item>
                        <Dropdown.Item
                            className={`text-md ${isHomePage && !scrolled ? (theme === 'dark' ? 'text-white' : 'text-gray-900') : (theme === 'dark' ? 'text-white' : 'text-gray-900')}`}
                            onClick={() => {
                                scrollToSection('contact');
                                handleDropdownItemClick('Contact Me', '#');
                            }}
                        >
                            Contact Me
                        </Dropdown.Item>
                        <Dropdown.Item
                            className={`text-md ${isHomePage && !scrolled ? (theme === 'dark' ? 'text-white' : 'text-gray-900') : (theme === 'dark' ? 'text-white' : 'text-gray-900')}`}
                            onClick={() => {
                                scrollToSection('resume');
                                handleDropdownItemClick('Resume', '#');
                            }}
                        >
                            Resume
                        </Dropdown.Item>
                    </Dropdown>
                </div>
                <ToggleSwitch checked={theme === 'dark'} onChange={toggleTheme} className="ml-2 md:mx-4" />
            </Navbar >
        </div >
    );
};

export default Header;
