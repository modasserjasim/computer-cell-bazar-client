import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import { IoPricetagsOutline } from "react-icons/io5";
import { GoVerified, GoLocation, GoCalendar } from "react-icons/go";

const ProductCard = ({ product, setProduct }) => {
    const { user } = useContext(AuthContext);
    const { title, publishedDate, location, resalePrice, originalPrice, yearsOfUse, sellerName, isSellerVerified, imgURL } = product;
    return (
        <div className="w-full overflow-hidden bg-base-100 rounded-lg shadow-lg">
            <img className="object-cover object-center w-full h-56" src={imgURL} alt='PRODUCT' />

            <div className='flex justify-between px-6 py-2 bg-gray-900'>
                <div className="flex items-center ">
                    <img src={user?.photoURL} className="w-12 btn-circle" alt="USER" />

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
                <h3 className='flex items-center gap-2 text-lg'><GoCalendar /> {publishedDate}</h3>
                <h1 className="text-2xl font-semibold">{title}</h1>

                <p className="pt-2"><b>YEARS OF USE:</b> {yearsOfUse} YEAR(S)</p>
                <p className="py-1"><b>ORIGINAL PRICE:</b> ৳{originalPrice}</p>

                <div className='flex justify-between items-center'>
                    <div className="flex items-center mt-4 text-2xl">
                        <IoPricetagsOutline />
                        <h1 className="px-2 ">PRICE: ৳{resalePrice}</h1>
                    </div>
                    <label onClick={() => setProduct(product)}
                        htmlFor="booking-modal"
                        className='btn btn-primary btn-sm text-white bg-gradient-to-r from-primary to-secondary'>Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;