import React from 'react';
import resume from '../Assets/Resume.pdf';
import jobIcon from '../Assets/Job.svg';
import { useTheme } from './context/AppContext'; // Assuming useTheme hook for theme management

const Resume = () => {
    const { theme } = useTheme();

    const downloadResume = () => {
        const link = document.createElement('a');
        link.href = resume;
        link.setAttribute('download', 'Rupesh_Thakur_Resume.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={`flex flex-col md:flex-row items-center bg-${theme === 'light' ? 'white' : 'gray-900'} text-${theme === 'light' ? 'gray-900' : 'white'} p-6 rounded-lg shadow-md space-y-4 md:space-y-0 md:space-x-6`}>
            <div className="flex-shrink-0 md:order-2">
                <img src={jobIcon} alt="Job Icon" className=" w-64 h-64" />
            </div>
            <div className="text-center md:text-left md:order-1">
                <h2 className="text-2xl font-bold mb-4">Resume Section</h2>
                <p className="text-lg mb-4">Download my resume to learn more about my experience and skills.</p>
                <button
                    onClick={downloadResume}
                    className={`bg-${theme === 'light' ? 'orange-500' : 'orange-700'} hover:bg-${theme === 'light' ? 'orange-600' : 'orange-800'} text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-${theme === 'light' ? 'orange-300' : 'orange-600'} focus:ring-opacity-50`}
                >
                    Download Resume
                </button>
            </div>
        </div>
    );
};

export default Resume;
