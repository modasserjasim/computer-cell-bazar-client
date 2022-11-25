import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import ProductCard from '../ProductCard/ProductCard';

const CategoryProducts = () => {
    const { categoryProducts } = useLoaderData();
    const [product, setProduct] = useState(null);

    return (
        <div className='bg-base-200 py-20 px-4'>
            <div className='max-w-7xl mx-auto'>
                <h2 className='text-center text-2xl md:text-3xl font-semibold'>{categoryProducts.length} PRODUCTS FOUND</h2>
                <hr className="my-4 mx-auto w-40 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded border-0 md:my-4" />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-20'>
                    {
                        categoryProducts.length > 0 && (
                            categoryProducts.map(product => <ProductCard
                                key={product._id}
                                product={product}
                                setProduct={setProduct}>
                            </ProductCard>)
                        )
                    }
                </div>
            </div>
            {
                product && <BookingModal
                    product={product}
                    setProduct={setProduct}
                >
                </BookingModal>
            }
        </div>
    );
};

export default CategoryProducts;