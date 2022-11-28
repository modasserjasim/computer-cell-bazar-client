import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Loading from '../../../components/Spinners/Loading';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import { updateProductSaleStatus } from '../../../api/updateProductSaleStatus';


const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const url = `${process.env.REACT_APP_API_URL}/my-products?email=${user?.email}`;
    const { data: products = [], isLoading, refetch } = useQuery({
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

    //handle mark the product as sold
    const handleSoldStatus = id => {
        updateProductSaleStatus(id)
            .then(data => {
                if (data.status) {
                    refetch();
                    toast.success(data.message);
                }
            })
        // fetch(`${process.env.REACT_APP_API_URL}/my-product/${id}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'content-type': 'application/json',
        //         authorization: `bearer ${localStorage.getItem('computerBazar-token')}`
        //     },
        //     body: JSON.stringify({ status: true })
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         // console.log(data);
        //         if (data.status) {
        //             refetch();
        //             toast.success(data.message);
        //         }

        //     })
    }
    //handle mark the product as available again
    const handleAvailableStatus = id => {
        fetch(`${process.env.REACT_APP_API_URL}/my-product/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('computerBazar-token')}`
            },
            body: JSON.stringify({ status: false })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.status) {
                    refetch();
                    toast.success(data.message);
                }

            })
    }
    //handle make the product as advertised/boosted
    const handleAdvertised = id => {
        fetch(`${process.env.REACT_APP_API_URL}/my-product/ad/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('computerBazar-token')}`
            },
            body: JSON.stringify({ status: true })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.status) {
                    refetch();
                    toast.success(data.message);
                }

            })
    }
    const handleProductDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}/my-product/${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${localStorage.getItem('computerBazar-token')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.status) {
                            refetch();
                            Swal.fire({
                                icon: 'success',
                                title: 'Your Product has been deleted!',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        }
                    })

            }
        })
    }

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
                            <th>Sales Status</th>
                            <th>Advertised</th>
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
                                        product.resalePrice && !product.isSold && <button
                                            onClick={() => handleSoldStatus(product._id)}
                                            className='btn btn-primary btn-sm text-white tooltip' data-tip="Click to Mark as Sold">Available</button>

                                    }
                                    {
                                        product.resalePrice && product.isSold && <button
                                            onClick={() => handleAvailableStatus(product._id)}
                                            className='btn btn-secondary btn-sm bg-red-700 text-white tooltip' data-tip="Click to Mark as Available">Sold</button>
                                    }
                                </td>
                                <td>
                                    {
                                        !product.isSold && !product.isAdvertised && <button
                                            onClick={() => handleAdvertised(product._id)}
                                            className='btn btn-primary btn-sm text-white tooltip' data-tip="Click to Ad your Product">Boost Now</button>

                                    }
                                    {
                                        !product.isSold && product.isAdvertised && <button
                                            className='btn bg-green-700 text-white btn-sm' >Boosted</button>
                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleProductDelete(product._id)} className="btn btn-ghost mr-2 p-0"><RiDeleteBin6Line className='text-2xl' /></button>
                                    {/* <button className='btn btn-ghost p-0'><RiEditBoxLine className='text-2xl' /></button> */}
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