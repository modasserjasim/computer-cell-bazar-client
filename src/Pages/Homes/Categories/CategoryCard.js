import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = () => {
    return (
        <Link className="group relative flex h-96 rounded-md w-full items-end bg-black">
            <img
                alt="Bike"
                src="https://images.unsplash.com/photo-1605008585816-03ab23ce80af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="absolute inset-0 h-full w-full object-cover transition-opacity group-hover:opacity-90"
            />

            <div
                className="relative w-full bg-gradient-to-r from-primary to-secondary p-6 text-center tracking-widest text-white transition-colors hover:bg-black"
            >
                <h3 className="text-lg uppercase">Custom Shop</h3>

                <p className="mt-1 text-xs font-medium uppercase">Design your own</p>
            </div>
        </Link>

    );
};

export default CategoryCard;