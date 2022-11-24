import React from 'react';
import CategoryCard from './CategoryCard';

const Categories = () => {
    return (
        <section className="body-font">
            <div className="container px-5 pb-24 mx-auto">
                <div className="-mt-40 p-5 md:p-10 bg-base-100 shadow-md rounded-md">
                    <h2 className='text-center text-3xl md:text-4xl'>FEATURED PRODUCTS</h2>
                    <hr className="my-4 mx-auto w-60 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded border-0 md:my-4 dark:bg-gray-700" />
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 md:mt-12'>
                        {
                            [...Array(3)].map((_, i) => <CategoryCard key={i}></CategoryCard>)
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Categories;