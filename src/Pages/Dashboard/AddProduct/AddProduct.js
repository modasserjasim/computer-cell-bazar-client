import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../../components/Spinners/Loading';
import Spinner from '../../../components/Spinners/Spinner';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import useSeller from '../../../hooks/useSeller';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const [sellerVerifyStatus, setSellerVerifyStatus] = useState(null);
    console.log('seller status inside add product', sellerVerifyStatus);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [condition, setCondition] = useState('Excellent');
    const [productCategory, setProductCategory] = useState('apple-laptops');
    const navigate = useNavigate();
    const date = new Date().toLocaleString().split(',')[0];

    // get product categories from db collection to assign the dropdown
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['product-categories'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/product-categories`);
            const data = await res.json();
            return data.productCategories;
        }

    })

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/user/seller/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log('inside add', data);
                setSellerVerifyStatus(data.isSellerVerified);
            })
    }, [user?.email])

    const handleAddProduct = data => {
        setLoading(true);
        // console.log(data);

        // add image to imageBB
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`;
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                // console.log(imgData);
                if (imgData.success) {
                    const productImg = (imgData.data.url);
                    // console.log(productImg);
                    const productInfo = {
                        title: data.productTitle,
                        publishedDate: date,
                        resalePrice: data.sellingPrice,
                        originalPrice: data.originalPrice,
                        condition: condition,
                        yearsOfUse: data.yearsOfUse,
                        location: data.location,
                        phone: data.phone,
                        category_id: productCategory,
                        sellerName: user.displayName,
                        sellerEmail: user.email,
                        isSellerVerified: sellerVerifyStatus,
                        sellerImgURL: user.photoURL,
                        imgURL: productImg,
                        description: data.description

                    }
                    console.log(productInfo);
                    //save product information to the database
                    fetch(`${process.env.REACT_APP_API_URL}/add-product`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            authorization: `bearer ${localStorage.getItem('computerBazar-token')}`
                        },
                        body: JSON.stringify(productInfo)
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result.status) {
                                setLoading(false);
                                toast.success(result.message);
                                navigate('/dashboard/my-products')
                            } else {
                                toast.error(result.error);

                            }
                        })
                }
            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h1 className='text-3xl mb-5'>Add A New Product</h1>
            <form onSubmit={handleSubmit(handleAddProduct)} className="bg-white shadow rounded w-full md:w-10/12 lg:w-3/6  p-5 md:p-10">
                <div className="relative">
                    <input {...register("productTitle", { required: "Product Title is required" })} type="text" name='productTitle' id="floating_outlined_productTitle" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " />
                    <label htmlFor="floating_outlined_productTitle" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Product Title</label>
                    <div>
                        {errors.productTitle && <p role="alert" className='text-red-700 text-xs'>{errors.productTitle?.message}</p>}
                    </div>
                </div>
                <div className='md:flex md:items-center md:gap-3'>
                    <div className="relative mt-4 w-full">
                        <input {...register("sellingPrice", { required: "Product Selling Price is required", min: 1, max: 999999, maxLength: { value: 6, message: "The amount should be less than 999999" } })} name='sellingPrice' type="number" id="floating_outlined_sellingPrice" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                        <label htmlFor="floating_outlined_sellingPrice" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Product Price</label>
                        <div>
                            {errors.sellingPrice && <p role="alert" className='text-red-700 text-xs'>{errors.sellingPrice?.message}</p>}
                        </div>
                    </div>
                    <div className="relative mt-4 w-full">
                        <input {...register("originalPrice", {
                            required: "Product sellingPrice is required", min: 1, max: 999999,
                            maxLength: { value: 6, message: "The amount should be less than 999999" }
                        })} name='originalPrice' type="number" id="floating_outlined_originalPrice" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                        <label htmlFor="floating_outlined_originalPrice" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Original Product Price</label>
                        <div>
                            {errors.originalPrice && <p role="alert" className='text-red-700 text-xs'>{errors.originalPrice?.message}</p>}
                        </div>
                    </div>
                </div>

                <div className="relative mt-4">
                    <input {...register("img", { required: "Image is required" })} type="file" name='img' id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                    <label htmlFor="floating_outlined" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Choose Product Photo</label>
                    <div>
                        {errors.img && <p role="alert" className='text-red-700 text-xs'>{errors.img?.message}</p>}
                    </div>

                </div>
                <div className="relative mt-4">
                    <select onChange={(event) => setProductCategory(event.target.value)}
                        value={productCategory}
                        name="category"
                        id="floating_outlined_time"
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                        placeholder='Select category'
                        required
                    >
                        {
                            categories?.map(category => <option key={category._id} value={category.id}>{category.name}</option>)
                        }

                    </select>
                    <label htmlFor="floating_outlined_time" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Select Product Category/Brand</label>

                </div>
                <div className="relative mt-4">
                    <select onChange={(event) => setCondition(event.target.value)}
                        value={condition}
                        id="floating_outlined_time"
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                        placeholder=''
                        required
                    >
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>

                    </select>
                    <label htmlFor="floating_outlined_time" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Select Product Condition</label>

                </div>

                <div className='md:flex md:items-center md:gap-3'>
                    <div className="relative mt-4 w-full">
                        <input {...register("phone", { required: "Your phone is required" })} type="tel" name='phone' id="floating_outlined_phone" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                        <label htmlFor="floating_outlined_phone" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Phone Number</label>
                    </div>
                    <div className="relative mt-4 w-full">
                        <input {...register("location", { required: "Your location is required" })} name='location' type="text" id="floating_outlined_location" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                        <label htmlFor="floating_outlined_location" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Location</label>
                    </div>
                </div>
                <div className="relative mt-4 w-full">
                    <input {...register("yearsOfUse", { required: "Years of use is required" })} name='yearsOfUse' type="number" id="floating_outlined_yearsOfUse" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                    <label htmlFor="floating_outlined_yearsOfUse" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Years of purchase/use?</label>
                    <div>
                        {errors.yearsOfUse && <p role="alert" className='text-red-700 text-xs'>{errors.yearsOfUse?.message}</p>}
                    </div>
                </div>
                <div className="relative mt-4 w-full">
                    <textarea {...register("description", { required: "Product description is required" })} name='description' type="textarea" id="floating_outlined_description" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                    <label htmlFor="floating_outlined_description" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Product Description</label>
                    <div>
                        {errors.description && <p role="alert" className='text-red-700 text-xs'>{errors.description?.message}</p>}
                    </div>
                </div>

                <div className="mt-8">
                    <button type="submit" className="text-lg rounded-md font-semibold leading-none text-white focus:outline-none bg-gradient-to-tl from-primary to-secondary border hover:bg-secondary py-4 w-full">
                        {loading ? <Spinner /> : 'Add New Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;