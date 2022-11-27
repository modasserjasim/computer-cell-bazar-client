import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import BookingModal from '../../Products/BookingModal/BookingModal';
import ProductCard from '../../Products/ProductCard/ProductCard';
import AdvertisedCard from './AdvertisedCard';

const AdvertisedProducts = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { data: adsProducts = [] } = useQuery({
        queryKey: ['advertised-products'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/advertised-products`);
            const data = await res.json();
            return data.adsProducts
        }
    })
    return (
        <div>
            {
                adsProducts.length > 0 && <section className="body-font bg-base-100">
                    <div className="container pt-12 px-4 mx-auto">
                        <div className="p-5 md:p-10">
                            <h2 className='text-2xl md:text-3xl font-semibold'>FEATURED PRODUCTS</h2>
                            <hr className="my-4 w-40 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded border-0 md:my-4 dark:bg-gray-700" />
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 md:mt-12'>
                                {
                                    adsProducts.map(product => <ProductCard
                                        key={product._id}
                                        product={product}
                                        setSelectedProduct={setSelectedProduct}>
                                    </ProductCard>)
                                }
                            </div>
                        </div>
                        {
                            selectedProduct && <BookingModal
                                selectedProduct={selectedProduct}
                                setSelectedProduct={setSelectedProduct}
                            >
                            </BookingModal>
                        }
                    </div>
                </section>
            }
        </div>

    );
};

export default AdvertisedProducts;