import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { updateProductSaleStatus } from '../../../api/updateProductSaleStatus';

const CheckoutForm = ({ order }) => {
    const [cardError, setCardError] = useState('');
    const [succeeded, setSucceeded] = useState('');
    const [processing, setProcessing] = useState(false);
    const [trxId, setTrxId] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const { _id, productId, buyerName, email, price } = order;
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`${process.env.REACT_APP_API_URL}/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('computerBazar-token')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
        } else {
            setCardError('');
        }
        setSucceeded('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyerName,
                        email: email
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === 'succeeded') {
            // console.log('card info', card);
            const payment = {
                bookingId: _id,
                buyerName,
                email,
                price,
                transactionId: paymentIntent.id

            }
            fetch(`${process.env.REACT_APP_API_URL}/payment`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `bearer ${localStorage.getItem('computerBazar-token')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.status) {
                        setSucceeded('Congrats! Your payment completed.');
                        setTrxId(paymentIntent.id);
                        //handle mark the product as sold
                        updateProductSaleStatus(productId)
                            .then(data => {
                                if (data.status) {
                                    toast.success(data.message);
                                }
                            })
                    }
                })


        }
        setProcessing(false);
    };
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            backgroundColor: '#fff',
                            height: '50px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn-sm btn-primary rounded-sm mt-4 w-full text-lg text-white' type="submit" disabled={!stripe || !clientSecret || processing}>
                Pay ৳{price}
            </button>
            {
                cardError && <p className='text-red-700 text-center'>{cardError}</p>
            }
            {
                succeeded && <div className='bg-green-100/90 mt-5 rounded-md p-3'>
                    <p className='text-center text-green-500 text-xl'>{succeeded}</p>
                    <p className='text-center text-black text-sm'><b>Your TrxId:</b> {trxId}</p>
                </div>
            }
        </form>
    );
};

export default CheckoutForm;