import React from 'react';
import CategoryCard from './CategoryCard';

const Categories = () => {
    return (
        <section className="body-font bg-base-100">
            <div className="container md:py-12 px-5 mx-auto">
                <div className="p-5 md:p-10">
                    <h2 className='text-2xl md:text-3xl font-semibold'>EXPLORE CATEGORIES</h2>
                    <hr className="my-4 w-40 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded border-0 md:my-4 dark:bg-gray-700" />
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