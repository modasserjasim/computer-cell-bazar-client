import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    const { id, name, photoURL } = category;
    return (
        <Link to={`/category/${id}`} className="group relative flex h-96 rounded-md w-full items-end bg-black">
            <img
                alt={name}
                src={photoURL}
                className="absolute inset-0 h-full w-full object-cover transition-opacity group-hover:opacity-90"
            />

            <div
                className="relative w-full bg-gradient-to-r from-primary to-secondary p-6 text-center tracking-widest text-white transition-colors hover:bg-black"
            >
                <h3 className="text-lg uppercase">{name}</h3>

                <p className="mt-1 text-xs font-medium uppercase">Explore your desired category</p>
            </div>
        </Link>

    );
};

export default CategoryCard;