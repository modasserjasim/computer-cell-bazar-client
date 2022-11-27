import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const BookingModal = ({ selectedProduct, setSelectedProduct }) => {
    const { user } = useContext(AuthContext);
    const { _id, title, resalePrice } = selectedProduct;

    const handleBooking = e => {
        e.preventDefault();
        const form = e.target;

        const bookingInfo = {
            productName: title,
            productId: _id,
            price: resalePrice,
            buyerName: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            meetingLocation: form.location.value,
        }
        fetch(`${process.env.REACT_APP_API_URL}/booking`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(bookingInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    setSelectedProduct(null);
                    toast.success(data.message);

                } else {
                    toast.error(data.error)
                }
            })

    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative bg-white">
                    <label htmlFor="booking-modal" className="btn btn-sm border-0 bg-gradient-to-r from-red-600 to-secondary text-white btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{title} - ৳{resalePrice}</h3>
                    <form onSubmit={handleBooking}>

                        <div className="relative mt-3">
                            <input name='name' type="text" defaultValue={user?.displayName} disabled id="floating_outlined_name" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                            <label htmlFor="floating_outlined_name" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Full Name</label>
                        </div>
                        <div className="relative my-3">
                            <input name='email' type="email" defaultValue={user?.email} disabled id="floating_outlined_email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder="Dhanmondi, Dhaka" required />
                            <label htmlFor="floating_outlined_email" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email Address</label>
                        </div>
                        <div className="relative mt-3">
                            <input name='price' type="text" value={resalePrice} disabled id="floating_outlined_price" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                            <label htmlFor="floating_outlined_price" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Product Price</label>
                        </div>
                        <div className="relative mt-3">
                            <input name='phone' type="tel" id="floating_outlined_phone" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                            <label htmlFor="floating_outlined_phone" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Phone Number</label>
                        </div>
                        <div className="relative mt-3 mb-4">
                            <input name='location' type="text" id="floating_outlined_location" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                            <label htmlFor="floating_outlined_location" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Meeting Location</label>
                        </div>

                        <button
                            className="btn w-full btn-primary bg-gradient-to-r from-primary to-secondary text-white text-lg">Booking Now</button>
                    </form>

                </div>
            </div>
        </>
    );
};

export default BookingModal;