import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Spinners/Loading';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const url = `${process.env.REACT_APP_API_URL}/my-products?email=${user?.email}`;
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['my-products', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('computerBazar-token')}`
                }
            });
            const data = await res.json();
            return data.products;
        }
    })
    console.log(products);

    if (isLoading) {
        return <Loading></Loading>;
    }
    return (
        <div>
            <h2 className='text-3xl mb-5'>My Products</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Condition</th>
                            <th>Status</th>
                            <th>Promotion</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            products?.map((product, index) => <tr key={product._id}>
                                <th>{index + 1}</th>
                                <td className='flex items-center gap-2'><img src={product.imgURL} alt="img" className='w-12 btn-circle' />{product?.title}</td>
                                <td>৳{product?.resalePrice}</td>
                                <td>{product?.condition}</td>
                                <td>
                                    {
                                        product.resalePrice && !product.sold && <button
                                            className='btn btn-primary btn-sm text-white'>Available</button>

                                    }
                                    {
                                        product.resalePrice && product.sold && <button
                                            className='btn btn-primary btn-sm disabled'>Sold</button>
                                    }
                                </td>
                                <td>
                                    {
                                        !product.sold && !product.advertised && <button
                                            className='btn btn-primary btn-sm text-white'>Advertise</button>

                                    }
                                    {
                                        product.advertised && <button
                                            className='btn bg-green-600 btn-sm disabled'>Advertised</button>
                                    }
                                </td>
                                <td>
                                    <label htmlFor="confirmation-modal" className="btn btn-xs mr-2">Delete</label>
                                    <button className='btn btn-xs'>Edit</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;