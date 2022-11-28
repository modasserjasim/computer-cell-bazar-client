import React from 'react';
import Swal from 'sweetalert2';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Spinners/Loading';

const AllBuyers = () => {
    const { data: allBuyers = [], isLoading, refetch } = useQuery({
        queryKey: ['all-buyers'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/all-buyers`);
            const data = await res.json();
            return data.allBuyers;
        }
    });

    const handleBuyerDelete = buyer => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete the buyer ${buyer.name}. It won't be able to revert this!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete buyer!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}/buyer/${buyer._id}`, {
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
                                title: `The buyer ${buyer?.name} has been deleted!`,
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
            <h2 className='text-3xl mb-5'>All Buyers</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allBuyers?.map((buyer, index) => <tr key={buyer._id}>
                                <th>{index + 1}</th>
                                <td className='flex items-center gap-2'><img src={buyer.photoURL} alt="img" className='w-10 h-10 btn-circle' />{buyer.name}</td>
                                <td>{buyer.email}</td>
                                <td>
                                    <button onClick={() => handleBuyerDelete(buyer)} className="p-0 hover:text-primary"><RiDeleteBin6Line className='text-2xl' /></button>

                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;