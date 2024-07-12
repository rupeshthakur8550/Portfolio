import React, { useEffect, useState } from 'react';
import { useTheme } from './context/AppContext';
import shield from '../Assets/Shield.svg';
import Resume from '../Assets/Resume.pdf'
import { Button } from 'flowbite-react';
import { useInView } from 'react-intersection-observer';

const About = () => {
    const { theme } = useTheme();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const downloadResume = () => {
        const link = document.createElement('a');
        link.href = Resume;
        link.setAttribute('download', 'Rupesh_Thakur_Resume.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const technologies = [
        { category: 'Frontend', items: ['react', 'jsp', 'HTML', 'CSS', 'javascript', 'materialUI', 'flowbitereact', 'tailwindCSS', 'reactIcons'] },
        { category: 'Backend', items: ['nodejs', 'express', 'java', 'servlet', 'javascript', 'nodemon', 'nodemailer', 'socketIO', 'redux'] },
        { category: 'Databases', items: ['mySQL', 'sqlite', 'mongodb', 'firebase'] },
        { category: 'Developer Tools', items: ['VScode', 'eclipse', 'git', 'github', 'postman'] }
    ];

    const iconMap = {
        react: 'react',
        jsp: 'java',
        HTML: 'html',
        CSS: 'css',
        javascript: 'javascript',
        nodejs: 'nodejs',
        express: 'express',
        java: 'java',
        servlet: 'java',
        mySQL: 'mysql',
        sqlite: 'sqlite',
        mongodb: 'mongodb',
        firebase: 'firebase',
        VScode: 'vscode',
        eclipse: 'eclipse',
        github: 'github',
        git: 'git',
        postman: 'postman',
        materialUI: 'materialui',
        flowbitereact: 'react',
        tailwindCSS: 'tailwindcss',
        reactIcons: 'react',
        nodemon: 'nodejs',
        nodemailer: 'nodejs',
        socketIO: 'nodejs',
        redux: 'redux'
    };

    const getIconUrl = (tech) => {
        return `https://skillicons.dev/icons?i=${iconMap[tech]}`;
    };

    const educationDetails = [
        {
            title: 'Post Graduate Degree - M.C.A',
            subtitle: 'Veermata Jijabai Technological Institute, Matunga (VJTI)',
            date: 'Present',
            content: 'CGPA / Percentage: 8.14 / 73.90%',
            university: 'Mumbai University'
        },
        {
            title: 'Under Graduate Degree - B.Sc CS',
            subtitle: 'Pratap College, Amalner (PCA)',
            date: 'Graduated At 2022',
            content: 'CGPA / Percentage: 9.48 / 81.35%',
            university: 'North Maharashtra University, Jalgaon'
        },
        {
            title: 'HSC (Maharashtra State Board)',
            subtitle: 'Pratap College, Amalner (PCA)',
            date: 'Passed At 2019',
            content: 'Percentage: 70.00%'
        },
        {
            title: 'SSC (Maharashtra State Board)',
            subtitle: 'G.S.Highschool, Amalner',
            date: 'Passed At 2017',
            content: 'Percentage: 86.80%'
        }
    ];

    const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [resumeRef, resumeInView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [educationRef, educationInView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [skillsRef, skillsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <div
            id='about'
            className={`min-h-screen flex flex-col justify-center items-center p-4 md:p-8 ${theme === 'light' ? 'bg-gray-100 text-gray-200' : 'bg-gray-900 text-gray-900'}`}
        >
            <div className={`w-full p-8 rounded-lg shadow-lg ${theme !== 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                <h1 className={`text-4xl my-8 md:ml-[20vw] md:mr-[20vw] text-center font-bold border-x-4 ${theme !== 'light' ? 'text-orange-700 border-gray-900' : 'text-orange-200'}`}>
                    ABOUT ME
                </h1>
                <div ref={aboutRef}>
                    <div className={`p-8 rounded-lg text-justify shadow-md ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-white'} `} style={{ animation: aboutInView ? 'fadeIn 1s ease-out' : '' }}>
                        <h2 className="text-3xl font-bold mb-8" style={{ animation: aboutInView ? 'slideIn 1s ease-out 0.4s forwards' : '' }}>Hey there! I’m Rupesh Thakur.</h2>
                        <p className="text-lg mb-4" style={{ animation: aboutInView ? 'slideIn 1s ease-out 0.9s forwards' : '' }}>
                            I am a <span className="font-bold">MCA</span> student at <span className="font-bold">Veermata Jijabai Technological Institute, Matunga (VJTI)</span>.
                            My expertise lies in frontend development, where I specialize in crafting dynamic user interfaces with <span className="font-bold">React</span> and leveraging the <span className="font-bold">Tailwind CSS framework with UI Frameworks</span>.
                            On the backend, I excel in building robust server-side applications using <span className="font-bold">Node.js</span> and <span className="font-bold">Express.js</span>.
                            As a full stack developer, I seamlessly integrate frontend and backend technologies, working fluently with <span className="font-bold">React</span>, <span className="font-bold">Tailwind CSS framework with UI Frameworks</span>,
                            <span className="font-bold">Node.js</span>, and <span className="font-bold">Express.js</span>.
                            My proficiency extends to core web technologies such as <span className="font-bold">HTML</span>, <span className="font-bold">CSS</span>, and <span className="font-bold">JavaScript</span>.
                            You can explore my complete portfolio for insights into my projects, technologies I work with, and more.
                        </p>
                    </div>
                </div>
                <div ref={resumeRef}>
                    <h1 id='resume' className={`text-2xl my-8 pb-6 text-center font-bold md:ml-[30vw] md:mr-[30vw] border-b-2 ${theme !== 'light' ? 'text-orange-700 border-gray-900' : 'text-orange-200'}`}>
                        RESUME
                    </h1>
                    <div align="center">
                        <p className="text-lg mb-4">Download my resume to learn more about my experience and skills.</p>
                        <Button
                            type="submit"
                            className={`self-center hover:bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white sm:w-[40%] mt-5 w-[60%] transition-transform text-nowrap transform hover:scale-105 rounded-md h-9 ${theme === 'dark' ? 'text-gray-900 border-black' : 'text-white border-white'} border-2 lg:w-[12vw]`}
                            onClick={downloadResume}
                        >
                            Download Resume
                        </Button>
                    </div>
                </div>
                <div ref={statsRef}>
                    <h1 className={`text-2xl my-8 pb-6 text-center font-bold md:ml-[30vw] md:mr-[30vw] border-b-2 ${theme !== 'light' ? 'text-orange-700 border-gray-900' : 'text-orange-200'}`}>
                        GITHUB STATS
                    </h1>
                    <div align="center" style={{ animation: statsInView ? 'slideInLeft 2s ease-out forwards' : 'none' }}>
                        <img src="https://github-readme-streak-stats.herokuapp.com/?user=rupeshthakur8550&theme=onedark&hide_border=false" alt="GitHub Streak" /><br /><br />
                        <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=rupeshthakur8550&theme=onedark&hide_border=false&layout=compact" alt="Top Languages" /><br /><br />
                        <img src="https://github-readme-stats.vercel.app/api?username=rupeshthakur8550&theme=onedark&hide_border=false" alt="GitHub Stats" />
                    </div>
                </div>
                <div className='mb-8' ref={educationRef}>
                    <h1 className={`text-2xl my-8 pb-6 text-center md:ml-[30vw] md:mr-[30vw] font-bold border-b-2 ${theme !== 'light' ? 'text-orange-700 border-gray-900' : 'text-orange-200 '}`}>
                        EDUCATION
                    </h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' style={{ animation: educationInView ? 'slideInLeft 2s ease-out forwards' : 'none' }}>
                        {educationDetails.map((edu, index) => (
                            <div key={index} className={`p-4 rounded-lg border-y-2 text-lg shadow-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                                <div className='flex gap-5 justify-center'>
                                    <span className='flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900'>
                                        <svg className='w-4 h-4 text-blue-800 dark:text-blue-300' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                                            <path d='M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z' />
                                        </svg>
                                    </span>
                                </div>
                                <h3 className={`text-lg font-semibold mt-4 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{edu.title}</h3>
                                {edu.date === 'Present' ? <span className='bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded'>{edu.date}</span> : <time className={`text-sm font-normal mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{edu.date}</time>}
                                <p className={`text-base font-normal ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{edu.subtitle}</p>
                                <p className={`text-base font-normal ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{edu.content}</p>
                                {edu.university && <p className={`text-base font-normal ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{edu.university}</p>}
                            </div>
                        ))}
                    </div>
                </div>

                <div ref={skillsRef}>
                    <h1 className={`text-2xl my-8 pb-6 text-center font-bold md:ml-[30vw] md:mr-[30vw] border-b-2 ${theme !== 'light' ? 'text-orange-700 border-gray-900' : 'text-orange-200'}`}>
                        TECHNICAL SKILLS
                    </h1>
                    {technologies.map((tech, index) => (
                        <div key={index} className='mb-4' style={{ animation: skillsInView ? 'slideIn 1s ease-out 0.4s forwards' : 'none' }}>
                            <h2 className='text-2xl font-semibold my-2'>{tech.category} :</h2>
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 justify-items-center'>
                                {tech.items.map((item, idx) => (
                                    <div key={idx} className='flex flex-col items-center'>
                                        <div className='relative'>
                                            <img
                                                src={shield}
                                                alt='Shield'
                                                className='h-24 w-24'
                                            />
                                            <img
                                                src={getIconUrl(item)}
                                                alt={item}
                                                className='h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                                            />
                                        </div>
                                        <span
                                            className={`mt-2 text-sm font-semibold ${theme !== 'light'
                                                ? 'text-gray-900'
                                                : 'text-gray-200'
                                                }`}
                                        >
                                            {item.charAt(0).toUpperCase() + item.slice(1)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </div >
    );
};

export default About;
