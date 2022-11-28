import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Spinner from '../../../components/Spinners/Spinner';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
    const { order } = useLoaderData();
    const { productName, price } = order;
    const navigation = useNavigation();

    if (navigation.state === 'loading') {
        return <Spinner></Spinner>
    }
    return (
        <div>
            <h1 className='text-3xl mb-2'>Payment for {productName}</h1>
            <p className='text-xl'>Please pay <b>৳{price}</b> for your order.</p>
            <div className='md:w-1/2 bg-gray-100 p-8 rounded-md my-7'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm order={order} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;