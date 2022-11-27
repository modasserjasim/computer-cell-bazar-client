import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { GoVerified } from "react-icons/go";

const AllSellers = () => {
    const { data: allSellers = [], refetch } = useQuery({
        queryKey: ['all-sellers'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/all-seller`);
            const data = await res.json();
            return data.allSellers;
        }
    });
    console.log(allSellers);

    const handleVerified = () => {

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
                            <th>isVerified</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allSellers?.map((seller, index) => <tr key={seller._id}>
                                <th>{index + 1}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td> {
                                    seller?.isVerified ? <span className='tooltip' data-tip="Verified Seller">
                                        <GoVerified className='text-blue-400 text-xl' />
                                    </span> : <button onClick={() => handleVerified(seller._id)} className='btn btn-xs bg-primary text-white border-0'>Make Admin</button>
                                }</td>
                                <td>
                                    <button className='btn btn-xs mr-2'>Delete</button>

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