import React from 'react'
import backgroundImage from '../Assets/Bkg2.png';

const Banner = () => {
    return (
        <section id='home' className="flex flex-col relative overflow-hidden bg-cover bg-center justify-center items-center" style={{ backgroundImage: `url(${backgroundImage})` }}><div className=' min-h-screen'></div></section>
    )
}

export default Banner