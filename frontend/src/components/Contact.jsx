import React, { useState } from 'react';
import { useTheme } from './context/AppContext';
import { Label, TextInput, Textarea, Button } from 'flowbite-react';
import axios from 'axios';

const Contact = () => {
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/send-email', formData);
            alert('Message sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send message');
        }
    };

    return (
        <div
            id='contact'
            className={`flex flex-col justify-center items-center p-4 md:p-8 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}
        >
            <div className={`w-full p-8 rounded-lg shadow-lg ${theme !== 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                <h1 className={`text-4xl my-8 md:mx-[20vw] text-center font-bold border-x-4 ${theme !== 'light' ? 'text-orange-700 border-gray-900' : 'text-orange-200'}`}>
                    CONTACT ME
                </h1>
                <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} flex justify-center flex-col`}>
                    <div className={`md:grid md:grid-cols-2 md:gap-8 border-b-8 ${theme !== 'dark' ? 'border-gray-900' : 'border-gray-100'} py-10 justify-center items-center`}>
                        <div>
                            <p className={`text-justify text-lg mx-8 ${theme === 'light' ? ' text-gray-900' : 'text-gray-100'} mb-4`}>
                                👋 Hey there! I’m Rupesh Thakur, a passionate Full Stack Web Developer with expertise in both frontend and backend technologies. My toolkit includes Java and Node.js with Express.js, and I thrive on building scalable web applications that deliver exceptional user experiences.
                            </p>
                            <p className={`text-justify text-lg mx-8 ${theme === 'light' ? ' text-gray-900' : 'text-gray-100'} mb-4`}>
                                🌐You can explore my projects over on <a href="https://github.com/yourgithubusername" className="text-orange-500 hover:underline">GitHub</a>. There, you’ll find a collection of my work—ranging from sleek UI designs to robust backend systems. Feel free to dive in and see how I bring ideas to life through code!
                            </p>
                            <p className={`text-justify text-lg mx-8 ${theme === 'light' ? ' text-gray-900' : 'text-gray-100'} mb-4`}>
                                🚀I’m actively seeking full-time opportunities where I can contribute my skills, collaborate with talented teams, and make a meaningful impact. If you’re looking for someone who combines efficiency, a keen eye for UI, and solid development chops, I’d love to connect.
                            </p>
                            <p className={`text-justify text-lg mx-8 ${theme === 'light' ? ' text-gray-900' : 'text-gray-100'} mb-8`}>
                                Feel free to reach out—I’m just an email away! 📩
                            </p>
                        </div>
                        <form className="space-y-4 px-10" onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor="fullName" value="Full Name" className={`${theme === 'light' ? ' text-gray-900' : 'text-gray-100'}`} />
                                <TextInput
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    shadow
                                    className={`mt-1 block w-full border-2 rounded-md border-gray-800`}
                                    style={{ height: '35px' }}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email" value="Email" className={`${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`} />
                                <TextInput
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    shadow
                                    className={`mt-1 block w-full border-2 rounded-md border-gray-800`}
                                    style={{ height: '35px' }}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="contactNumber" value="Contact Number" className={`${theme === 'light' ? ' text-gray-900' : 'text-gray-100'}`} />
                                <TextInput
                                    id="contactNumber"
                                    name="contactNumber"
                                    type="tel"
                                    required
                                    shadow
                                    className={`mt-1 block w-full border-2 rounded-md border-gray-800`}
                                    style={{ height: '35px' }}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="message" value="Message" className={`${theme === 'light' ? ' text-gray-900' : 'text-gray-100'}`} />
                                <Textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    required
                                    shadow
                                    className={`mt-1 block w-full border-2 rounded-md border-gray-800`}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    className={`self-center hover:bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white sm:w-[40%] mt-5 w-[60%] transition-transform text-nowrap transform hover:scale-105 rounded-md h-9 ${theme !== 'dark' ? 'text-gray-900 border-black' : 'text-white border-white'} border-2 lg:w-[12vw]`}
                                >
                                    Send Message
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className="relative m-8 overflow-hidden rounded-lg" style={{ height: '70vh' }}>
                        <h1 className={`text-2xl my-8 pb-6 text-center font-bold md:ml-[30vw] md:mr-[30vw] border-b-2 ${theme === 'light' ? 'text-orange-700 border-gray-900' : 'text-orange-200'}`}>
                            MAP
                        </h1>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3701.648601531522!2d75.05712391505026!3d21.03201668599824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd92fbf303dfe6d%3A0xfad6e3b4c7f775e7!2sGanesh%20Colony%2C%20Amalner%2C%20Maharashtra%20425101%2C%20India!5e0!3m2!1sen!2sus!4v1627393638242!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            aria-hidden="false"
                            tabIndex="0"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
