import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Spinners/Loading';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const url = `${process.env.REACT_APP_API_URL}/my-orders?email=${user?.email}`;
    const { data: myOrders = [], isLoading } = useQuery({
        queryKey: ['my-orders', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('computerBazar-token')}`
                }
            });
            const data = await res.json();
            return data.myOrders;
        }
    })
    console.log(myOrders);

    if (isLoading) {
        return <Loading></Loading>;
    }
    return (
        <div>
            <h2 className='text-3xl mb-5'>MY ORDERS</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Meeting Location</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            myOrders?.map((order, index) => <tr key={order._id}>
                                <th>{index + 1}</th>
                                <td className='flex items-center gap-2'><img src={order?.productImg} alt="img" className='w-10 h-10 btn-circle' />{order.productName}</td>
                                <td>৳{order?.price}</td>
                                <td>{order?.meetingLocation}</td>
                                <td>
                                    {
                                        order.price && !order.paid && <Link to={`/dashboard/payment/${order._id}`}>
                                            <button
                                                className='btn btn-primary btn-sm text-white'>PAY</button>
                                        </Link>
                                    }
                                    {
                                        order.price && order.paid && <button
                                            className='btn btn-primary btn-sm bg-green-700 border-0 text-white disabled'>PAID</button>
                                    }
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;