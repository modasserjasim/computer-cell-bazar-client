import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import Loading from '../../../components/Spinners/Loading';

const ReportedProducts = () => {
    const { data: reportedProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['reported-products'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/reported-products`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('computerBazar-token')}`
                }
            });
            const data = await res.json();
            return data.reportedProducts;
        }
    });
    console.log(reportedProducts);

    const handleProductDelete = product => {
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
                fetch(`${process.env.REACT_APP_API_URL}/my-product/${product._id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${localStorage.getItem('computerBazar-token')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'The Reported Product has been deleted!',
                                showConfirmButton: false,
                                timer: 2000
                            })
                            refetch();
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
            <h2 className='text-3xl mb-5'>Reported Products</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Reported Product Name</th>
                            <th>Price</th>
                            <th>Seller Name</th>
                            <th>Seller Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            reportedProducts?.map((product, index) => <tr key={product._id}>
                                <th>{index + 1}</th>
                                <td className='flex items-center gap-2'><img src={product.imgURL} alt="img" className='w-10 h-10 btn-circle' />{product.title}</td>

                                <td>{product.resalePrice}</td>
                                <td>{product.sellerName} </td>
                                <td>{product.location} </td>

                                <td>
                                    <button onClick={() => handleProductDelete(product)} className="p-0 hover:text-primary"><RiDeleteBin6Line className='text-2xl' /></button>

                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedProducts;