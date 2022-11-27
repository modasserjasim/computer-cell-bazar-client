import React from 'react';

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <p className='text-7xl font-thin'>L</p>
            <div className='w-10 h-10 border-8 border-dashed rounded-full animate-spin mt-5 border-l-primary border-r-secondary border-b-accent border-t-green-500'></div>
            <p className='text-7xl font-thin'>ading....</p>
        </div>
    );
};

export default Loading;