import React from 'react';
import AdvertisedCard from './AdvertisedCard';

const AdvertisedProducts = () => {
    return (
        <section className="body-font">
            <div className="container px-5 mx-auto">
                <div className="-mt-40 p-5 md:p-10 bg-base-200 rounded-md">
                    <h2 className='text-center text-2xl md:text-3xl font-semibold'>FEATURED PRODUCTS</h2>
                    <hr className="my-4 mx-auto w-40 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded border-0 md:my-4" />
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 md:mt-12'>
                        {
                            [...Array(3)].map((_, i) => <AdvertisedCard key={i}></AdvertisedCard>)
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdvertisedProducts;