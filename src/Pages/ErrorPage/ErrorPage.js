import React from 'react';
import { Link } from 'react-router-dom';
import errorImg from '../../assets/images/404page.jpg'

const ErrorPage = () => {
    return (
        <div className="flex items-center flex-col justify-center lg:flex-row px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28 min-h-screen">
            <div className="w-full lg:w-1/2">
                <img className="w-full" src={errorImg} alt="404" />
            </div>
            <div className="w-full lg:w-1/2">
                <h1 className="py-4 text-3xl lg:text-5xl font-extrabold">Looks like you've found the doorway to the great nothing</h1>
                <p className="py-4 text-xl">The content you’re looking for doesn’t exist. Either it was removed, or you mistyped the link.</p>
                <p className="py-2 text-xl">Sorry about that! Please visit our homepage to get where you need to go.</p>
                <Link to='/'>
                    <button className="w-full lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-primary text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:accent focus:ring-opacity-50 text-2xl">Go back to Homepage</button> </Link>
            </div>
        </div>
    );
};

export default ErrorPage;