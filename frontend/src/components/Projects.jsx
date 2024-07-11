import React from 'react';
import { useTheme } from './context/AppContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Food_Space_Banner, Food_Space_About, Food_Space_ContactUs, Food_Space_Footer } from '../Assets/ImportHandler.js'

const Projects = () => {
    const { theme } = useTheme();

    const projectDetails = [
        {
            title: 'Travel Diaries',
            technologies: 'Node Js, Express Js, React Js, Tailwind CSS, MongoDB, Flowbite-react',
            link: 'https://github.com/rupeshthakur8550/TravelDiaries',
            date: 'Present',
            description: [
                'Developed a web application called "Travel Diaries" using React.js and Node.js to facilitate travel exploration and memory sharing.',
                'Implemented features allowing users to create, edit, and delete travel memories, with captions, using CRUD operations in the backend.',
                'Utilized Socket.io for real-time chatting in the frontend and backend, ensuring efficient data management and a seamless user experience.',
                'Incorporated authentication mechanisms to ensure users can only edit or delete their own posts, enhancing security and privacy.'
            ],
            image: ['path/to/your/image2_1.png', 'path/to/your/image2_2.png'] // Add multiple images for the carousel
        },
        {
            title: 'Food Space',
            technologies: 'MongoDB, Express.js, React.js, Node.js',
            link: 'https://github.com/rupeshthakur8550/FoodSpace',
            date: 'Present',
            description: [
                'Developed a Food Space web application using MERN stack for efficient food ordering and delivery.',
                'Implemented CRUD operations for the Food Space application in Node.js to efficiently manage food orders and deliveries.',
                'Designed an interactive UI for the application using React.js, HTML, CSS, and JavaScript, facilitating seamless interaction between different scenes.'
            ],
            image: [Food_Space_Banner, Food_Space_About, Food_Space_ContactUs, Food_Space_Footer]
        },
        {
            title: 'Calculator with Local Storage',
            technologies: 'ReactJS, Flowbite-react',
            link: 'https://github.com/rupeshthakur8550/Calculator',
            date: 'June 19, 2024',
            description: [
                'Developed a Calculator web application using React.js and Flowbite-react for efficient calculation and storage.',
                'Implemented local storage to store user input and output, ensuring efficient data management and a seamless user.',
                'Utilized Flowbite-react to enhance the UI and provide a more intuitive user experience.',
            ],
            image: ['path/to/your/image4_1.png', 'path/to/your/image4_2.png'] // Add multiple images for the carousel
        },
        {
            title: 'Route Planning Tool',
            technologies: 'Node Js, Express Js, React Js, Tailwind CSS, Sqlite',
            link: 'https://github.com/rupeshthakur8550/Route-Planning-Tool',
            date: 'February 2024',
            description: [
                'Developed a Route Planning Tool using React.js, Node.js, Express.js, and SQLite database for efficient route optimization.',
                'Implemented nearest neighbor algorithm and complementary algorithms to calculate the shortest route connecting user\'s destinations.',
                'Integrated MapBox API for visual route representation.'
            ],
            image: ['path/to/your/image1_1.png', 'path/to/your/image1_2.png'] // Add multiple images for the carousel
        },
        {
            title: 'Employee Management System',
            technologies: 'Java, Servlet, JSP, JDBC, Apache Tomcat 8.0, My SQL',
            link: 'https://github.com/rupeshthakur8550/Employee-Management-System',
            date: 'March 2022',
            description: [
                'Developed an Employee Management System web application using Java servlets and JSP for efficient data storage and retrieval.',
                'Implemented CRUD operations for the Employee Management System in Java to efficiently manage employee data.',
                'Designed an interactive UI for the application using JSP, HTML, CSS, and JavaScript, facilitating seamless interaction between different scenes.'
            ],
            image: ['path/to/your/image3_1.png', 'path/to/your/image3_2.png'] // Add multiple images for the carousel
        },
    ];

    return (
        <div
            id='projects'
            className={`min-h-screen flex flex-col justify-center items-center p-4 md:p-8 ${theme !== 'light' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-gray-200'}`}
        >
            <div className={`w-full p-8 rounded-lg shadow-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                <h1 className={`text-4xl my-12 md:ml-[20vw] md:mr-[20vw] text-center font-bold border-x-4 ${theme === 'light' ? 'text-orange-700 border-gray-900' : 'text-orange-200'}`}>
                    PROJECTS
                </h1>
                <div className='grid grid-cols-1 md:mx-20 gap-6'>
                    {projectDetails.map((project, index) => (
                        <div key={index} className={`p-6 border-y-2 rounded-lg shadow-lg ${theme !== 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                            <div className='flex flex-col items-center'>
                                <a href={project.link}>
                                    <h1 className={`text-2xl my-8 pb-6 text-center font-bold md:ml-[30vw] md:mr-[30vw] border-b-2 ${theme !== 'light' ? 'text-orange-700 border-gray-900' : 'text-orange-200'}`}>
                                        {project.title}
                                    </h1>
                                </a>
                                {project.image && (
                                    <Carousel
                                        showArrows={true}
                                        showThumbs={false}
                                        infiniteLoop={true}
                                        useKeyboardArrows={true}
                                        autoPlay={true}
                                        className='w-full h-full object-cover rounded-lg mb-4'
                                    >
                                        {project.image.map((img, imgIndex) => (
                                            <div key={imgIndex}>
                                                <img src={img} alt={project.title} className='w-full h-44 object-contain' />
                                            </div>
                                        ))}
                                    </Carousel>
                                )}
                                <time className='text-sm font-normal mb-2 text-gray-400 dark:text-gray-500'>{project.date}</time>
                                <p className='text-base font-normal mb-2 text-gray-500 dark:text-gray-400'>{project.technologies}</p>
                                <ul className='list-disc pl-5'>
                                    {project.description.map((desc, i) => (
                                        <li key={i} className='text-base font-normal text-gray-500 dark:text-gray-400 mb-1'>{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
