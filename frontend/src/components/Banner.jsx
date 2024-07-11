// Banner.js
import React from 'react';
import { useTheme } from './context/AppContext';
import backgroundImage from '../Assets/Banner.svg';

const Banner = () => {
    const { theme } = useTheme();

    const scrollToAbout = () => {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id='home'
            className="flex flex-col relative overflow-hidden bg-cover bg-center justify-center items-center min-h-screen"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className={`absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b ${theme === 'dark' ? 'from-black to-transparent opacity-50' : ''} `}></div>
            <div className={`absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t ${theme === 'dark' ? 'from-black to-transparent opacity-50' : ''} `}></div>
            <div
                className={`banner-content relative text-center text-white flex flex-col justify-center p-6 sm:p-10 lg:p-20 animation:fadeIn`} style={{ animation: 'fadeIn 1s ease-out' }}
            >
                <h1 className={`text-5xl sm:text-5xl lg:text-6xl font-bold ${theme === 'dark' ? 'text-gray-900' : 'text-white'} tracking-wide mb-8`} style={{ animation: 'slideIn 1s ease-out' }}>
                    Welcome To <span className={`px-4 py-2 bg-gradient-to-r from-red-400 ${theme === 'dark' ? 'via-gray-100' : 'via-gray-900'} to-purple-600 rounded-lg inline-block text-transparent bg-clip-text text-nowrap`} style={{ fontVariant: 'unicase' }}>My Profile Dev's</span>
                </h1>
                <h3 className={`text-xl sm:text-xl lg:text-2xl font-semibold ${theme === 'dark' ? 'text-gray-900' : 'text-white'} mb-12 border-b-2 text-pretty border-orange-500 pb-8 mx-8`} style={{ animation: 'slideIn 1s ease-out 0.4s forwards' }}>
                    <h4 className='my-5'>
                        Hello, I'm Rupesh Thakur, an Aspiring Full Stack Web Developer and Software Engineer.
                    </h4>
                    <h4 className='md:text-center text-justify my-5'>
                        I'm Passionate about building scalable web applications and working with modern technologies. Experienced in both frontend and backend development, striving to deliver high-quality software solutions.
                    </h4>
                </h3>
                <button
                    style={{ color: (theme !== 'dark' ? 'white' : 'black'), animation: 'slideIn 1s ease-out 0.8s forwards' }}
                    className={`self-center hover:bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white md:w-[25%] w-[40%] transition-transform transform hover:scale-105 rounded-md h-9 ${theme !== 'dark' ? 'text-gray-900 border-black' : 'text-white border-white'} border-2 lg:w-[12vw]`}
                    onClick={scrollToAbout}
                >
                    Know More
                </button>
            </div>
        </section>
    );
};

export default Banner;
