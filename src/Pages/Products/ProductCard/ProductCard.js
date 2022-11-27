import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import { IoPricetagsOutline } from "react-icons/io5";
import { GoVerified, GoLocation, GoCalendar } from "react-icons/go";
import { MdReportGmailerrorred, MdCheck } from "react-icons/md";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ProductCard = ({ product, setSelectedProduct }) => {
    const { user } = useContext(AuthContext);
    const { _id, title, publishedDate, location, resalePrice, originalPrice, yearsOfUse, sellerName, isSellerVerified, imgURL, sellerImgURL, isAdvertised, isReported } = product;

    //handle mark the product as sold
    const handleReportProduct = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Did you see any suspicious activity with this seller or product?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Report!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}/reported-product/${id}`, {
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
                            Swal.fire({
                                icon: 'success',
                                title: 'You have successfully reported this product. We will verify the product soon!',
                                showConfirmButton: false,
                                timer: 3000
                            })
                        } else {
                            toast.error('Please login to report this product!')
                        }

                    })
            }
        })

    }
    return (
        <div className="w-full overflow-hidden bg-base-100 rounded-lg shadow-lg">
            {
                isAdvertised && <div className="badge absolute rounded-sm text-white bg-gradient-to-r from-primary via-green-500 to-secondary border-0">ADVERTISED</div>
            }

            <img className="object-cover object-center w-full h-56" src={imgURL} alt='PRODUCT' />

            <div className='flex justify-between flex-wrap gap-3 items-center px-6 py-2 bg-gray-900'>
                <div className="flex items-center ">
                    <img src={sellerImgURL} className="w-12 btn-circle" alt="USER" />

                    <h2 className="mx-3 text-lg font-semibold text-white">{sellerName}</h2>
                    {
                        isSellerVerified &&
                        <span className='tooltip' data-tip="Verified Seller">
                            <GoVerified className='text-blue-400 text-xl' />
                        </span>

                    }

                </div>
                <div className='flex items-center gap-1'>
                    <GoLocation className='text-3xl text-white' /> <h3 className="mx-3 text-lg font-semibold text-white">{location}</h3>
                </div>
            </div>

            <div className="px-6 py-4">

                <div className='flex justify-between items-center'>
                    <h3 className='flex items-center gap-2 text-lg'><GoCalendar /> {publishedDate}</h3>
                    {
                        isReported ? <button className='btn btn-outline btn-xs flex items-center gap-2 tooltip' data-tip="The product is already reported!" disabled><MdCheck /> Reported</button> : <button onClick={() => handleReportProduct(_id)} className='btn btn-outline btn-xs flex items-center gap-2 '><MdReportGmailerrorred /> Report</button>
                    }
                </div>
                <h1 className="text-2xl font-semibold">{title}</h1>

                <p className="pt-2"><b>YEARS OF USE:</b> {yearsOfUse} YEAR(S)</p>
                <p className="py-1"><b>ORIGINAL PRICE:</b> ৳{originalPrice}</p>

                <div className='flex justify-between items-center'>
                    <div className="flex items-center mt-4 text-2xl">
                        <IoPricetagsOutline />
                        <h1 className="px-2 ">PRICE: ৳{resalePrice}</h1>
                    </div>
                    <label onClick={() => setSelectedProduct(product)}
                        htmlFor="booking-modal"
                        className='btn btn-primary btn-sm text-white bg-gradient-to-r from-primary to-secondary'>Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;