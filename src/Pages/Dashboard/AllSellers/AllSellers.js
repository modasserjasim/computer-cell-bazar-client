import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { GoVerified } from "react-icons/go";
import { toast } from 'react-toastify';
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import Loading from '../../../components/Spinners/Loading';

const AllSellers = () => {
    const { data: allSellers = [], isLoading, refetch } = useQuery({
        queryKey: ['all-sellers'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/all-sellers`);
            const data = await res.json();
            return data.allSellers;
        }
    });
    console.log(allSellers);

    const handleVerifySeller = id => {
        fetch(`${process.env.REACT_APP_API_URL}/seller/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('computerBazar-token')}`
            },
            body: JSON.stringify({ status: true })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status) {
                    refetch();
                    toast.success(data.message);
                } else {
                    toast.error(data.error)
                }

            })
    }
    const handleSellerDelete = seller => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete the seller ${seller.name}. It won't be able to revert this!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete seller!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}/seller/${seller._id}`, {
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
                                title: `The seller ${seller?.name} has been deleted!`,
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
            <h2 className='text-3xl mb-5'>All Sellers</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Verify Seller</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allSellers?.map((seller, index) => <tr key={seller._id}>
                                <th>{index + 1}</th>
                                <td className='flex items-center gap-2'><img src={seller.photoURL} alt="img" className='w-10 h-10 btn-circle' />{seller.name}</td>
                                <td>{seller.email}</td>
                                <td> {
                                    seller?.isSellerVerified ? <span className='flex items-center gap-2 tooltip' data-tip="Verified Seller">
                                        <GoVerified className='text-blue-500 text-xl' /> Verified
                                    </span> : <button onClick={() => handleVerifySeller(seller._id)} className='btn btn-xs bg-primary text-white border-0'>Verify Seller</button>
                                }</td>
                                <td>
                                    <button onClick={() => handleSellerDelete(seller)} className="p-0 hover:text-primary"><RiDeleteBin6Line className='text-2xl' /></button>

                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;