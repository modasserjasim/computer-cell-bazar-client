import React from 'react';
import hero from '../../../assets/images/hero.png';
const Hero = () => {
    return (
        <div className="bg-gradient-to-r from-primary via-accent to-secondary pb-40 pt-20 md:pt-0">
            <div>
                <div className="px-3 max-w-7xl mx-auto flex flex-wrap flex-col md:flex-row items-center justify-between text-white">
                    <div className="flex flex-col w-full md:w-1/2 justify-center items-start text-center md:text-left">
                        <p className="uppercase tracking-loose w-full">Welcome to</p>
                        <h1 className="my-4 text-5xl font-bold leading-tight">
                            Computer Cell Bazar
                        </h1>
                        <p className="leading-normal text-2xl mb-8">
                            Computer Cell Bazar is a classified ads website for second hand computers. We help people buy and sell laptop, desktop and computer parts.
                        </p>
                        <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                            Get Started
                        </button>
                    </div>
                    <div className="w-full md:w-1/2 py-6">
                        <img className="w-full z-50" src={hero} alt='this is sample' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;