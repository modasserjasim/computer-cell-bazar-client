import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../components/Spinners/Loading';
import CategoryCard from './CategoryCard';

const Categories = () => {
    const { data: productCategories = [], isLoading } = useQuery({
        queryKey: ['product-categories'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/product-categories`);
            const data = await res.json();
            return data.productCategories;
        }

    })

    if (isLoading) {
        return <Loading></Loading>
    }
    return (

        <section className="body-font">
            <div className="container px-3 mx-auto">
                <div className="-mt-40 py-5 px-3 md:p-10 bg-base-200 rounded-md">
                    <h2 className='text-center text-2xl md:text-3xl font-semibold'>EXPLORE CATEGORIES</h2>
                    <hr className="my-4 mx-auto w-40 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded border-0 md:my-4" />
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 md:mt-12'>
                        {
                            productCategories.map(category => <CategoryCard key={category._id} category={category}></CategoryCard>)
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Categories;