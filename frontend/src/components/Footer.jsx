import React from 'react';
import { Footer } from 'flowbite-react';
import { Link, NavLink } from 'react-router-dom';
import { BsLinkedin, BsInstagram, BsGithub } from 'react-icons/bs';
import { SiCodefresh, SiLeetcode, SiGmail } from 'react-icons/si';
import { useTheme } from './context/AppContext'

const FooterP = () => {
    const { theme } = useTheme();
    return (
        <Footer container className={`${theme === 'dark' ? 'text-gray-900 bg-white' : 'text-white bg-gray-900'} rounded-none`}>
            <div className='w-full mx-auto text-white'>
                <div className='flex flex-col sm:flex-row justify-between items-center mb-5'>
                    <div className="flex justify-center">
                        <Link to="/" className={`flex items-center ${theme === 'dark' ? 'text-gray-900' : 'text-white'} font-semibold text-lg md:text-2xl typewriter`} style={{ fontVariant: 'unicase' }}>
                            <SiCodefresh className="mr-3 h-6 w-6 md:h-8 md:w-8" />
                            {'< Rupesh / Thakur >'}
                        </Link>
                    </div>
                    <Footer.Divider className={`${theme === 'dark' ? 'border-gray-900' : ''} sm:hidden block my-3`} />
                    <div className='flex flex-col items-center sm:items-start text-center sm:text-left'>
                        <Footer.Title className={`${theme === 'dark' ? 'text-gray-700' : 'text-gray-200'} text-xl font-semibold mb-4`} style={{ fontVariant: 'unicase' }} title='Contact Me' />
                        <Footer.LinkGroup col>
                            <Footer.Link className={`${theme === 'dark' ? 'text-gray-700 hover:text-gray-950' : 'text-gray-100 hover:text-gray-300'} font-semibold dark:text-gray-100'}`} href='mailto:rupeshthakur80078@gmail.com'>Email: rupeshthakur80078@gmail.com</Footer.Link>
                            <Footer.Link className={`${theme === 'dark' ? 'text-gray-700 hover:text-gray-950' : 'text-gray-100 hover:text-gray-300'} font-semibold dark:text-gray-100'}`} href='tel:+918550948693'>Phone: +91-8550948693</Footer.Link>
                            <Footer.Link className={`${theme === 'dark' ? 'text-gray-700 hover:text-gray-950' : 'text-gray-100 hover:text-gray-300'} font-semibold dark:text-gray-100'}`} href='#'>Ganesh Colony, Tambepura, Amalner, Dist Jalgaon, Maharashtra, India</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
                <Footer.Divider className={`${theme === 'dark' ? 'border-gray-900' : ''}`} />
                <div className='w-full my-3 sm:flex text-center sm:justify-between'>
                    <Footer.Copyright
                        className={`${theme === 'dark' ? 'text-gray-700 hover:text-gray-950' : 'text-gray-100 hover:text-gray-300'} font-semibold dark:text-gray-100'}`}
                        href='#'
                        by=" Rupesh Thakur"
                        year={new Date().getFullYear()}
                    />
                    <div className="flex gap-6 sm:mt-0 mt-4 justify-center">
                        <Footer.Icon className={`${theme === 'dark' ? 'text-gray-700 hover:text-gray-950' : 'text-gray-100 hover:text-gray-300'}`} href='https://in.linkedin.com/in/rupesh-thakur-010209207' icon={BsLinkedin} />
                        <Footer.Icon className={`${theme === 'dark' ? 'text-gray-700 hover:text-gray-950' : 'text-gray-100 hover:text-gray-300'}`} href='https://leetcode.com/rupeshthakur80078/' icon={SiLeetcode} />
                        <Footer.Icon className={`${theme === 'dark' ? 'text-gray-700 hover:text-gray-950' : 'text-gray-100 hover:text-gray-300'}`} href='https://github.com/rupeshthakur8550' icon={BsGithub} />
                        <Footer.Icon className={`${theme === 'dark' ? 'text-gray-700 hover:text-gray-950' : 'text-gray-100 hover:text-gray-300'}`} href='mailto:rupeshthakur80078@gmail.com' icon={SiGmail} />
                        <Footer.Icon className={`${theme === 'dark' ? 'text-gray-700 hover:text-gray-950' : 'text-gray-100 hover:text-gray-300'}`} href='https://www.instagram.com/mr_evil_shadow/' icon={BsInstagram} />
                    </div>
                </div>
                <Footer.Divider className={`${theme === 'dark' ? 'border-gray-900' : ''}`} />
            </div>
        </Footer>
    );
}

export default FooterP;
