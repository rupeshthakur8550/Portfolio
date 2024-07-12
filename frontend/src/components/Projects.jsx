import React, { useState, useRef } from 'react';
import { useTheme } from './context/AppContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useInView } from 'react-intersection-observer';
import { Food_Space, Food_Space_Order, Food_User_PlaceOrder, Food_My_Menu, Food_User_Dashboard, Food_seller_AddItems, Food_seller_Order, Food_seller_ViewItems, Food_seller_Profile, Cal1, Cal2, Food_Menu_Page, EMS1, EMS2, EMS3, EMS4, Route_Planning_Tool1, Route_Planning_Tool2, Route_Planning_Tool3, Travel_Diaries, Travel_Diaries_Login, TravelDiaries_AllPosts, TravelDiaries_AddPost, TravelDiaries_Chats, TravelDiaries_Profile, TravelDiaries_UpdateProfile } from '../Assets/ImportHandler.js';

const Projects = () => {
    const { theme } = useTheme();
    const [visibleProjects, setVisibleProjects] = useState([]);

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
            image: [Travel_Diaries, Travel_Diaries_Login, TravelDiaries_AllPosts, TravelDiaries_AddPost, TravelDiaries_Chats, TravelDiaries_Profile, TravelDiaries_UpdateProfile]
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
            image: [Food_Space, Food_Menu_Page, Food_Space_Order, Food_User_PlaceOrder, Food_My_Menu, Food_User_Dashboard, Food_seller_AddItems, Food_seller_Order, Food_seller_ViewItems, Food_seller_Profile]
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
            image: [Cal1, Cal2]
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
            image: [Route_Planning_Tool1, Route_Planning_Tool2, Route_Planning_Tool3]
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
            image: [EMS1, EMS2, EMS3, EMS4]
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
                    {projectDetails.map((project, index) => {
                        const [ref, inView] = useInView({
                            triggerOnce: true,
                            threshold: 0.1,
                            delay: index * 500, // Delay to animate each project one after another
                        });

                        return (
                            <div
                                key={index}
                                ref={ref}
                                className={`p-6 border-y-2 rounded-lg shadow-lg transition-transform duration-500 ease-out ${inView ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                                    } ${theme !== 'light' ? 'bg-white' : 'bg-gray-800'}`}
                            >
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
                                    <time className='text-sm font-normal mb-2'>{project.date}</time>
                                    <p className='text-base font-normal mb-2 '>{project.technologies}</p>
                                    <ul className='list-disc pl-5'>
                                        {project.description.map((desc, i) => (
                                            <li key={i} className='text-base font-normal text-justify mb-1'>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Projects;
