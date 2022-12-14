import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';
import Spinner from '../../components/Spinners/Spinner';

const Signup = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [userRole, setUserRole] = useState('buyer');
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUserProfile, loading, setLoading, } = useContext(AuthContext);

    //from JWT TOKEN HOOK
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);

    const navigate = useNavigate();
    if (token) {
        navigate('/');
    }

    const handleSignUp = data => {
        // console.log(data);
        // add image to imageBB
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        // console.log(image);
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`;
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    createUser(data.email, data.password)
                        .then(result => {
                            const user = result.user;
                            setLoading(false);
                            toast.success(`You have successfully created your account, ${data.name}`);
                            //update profile
                            updateUserProfile(data.name, imgData.data.display_url)
                                .then(() => {
                                    saveUserToDB(user.displayName, user.email, user.photoURL, userRole)
                                    setLoading(false);
                                })
                                .catch(err => toast.error(err));

                        })
                        .catch(err => {
                            toast.error('Sorry!', err.code);
                            setLoading(false);
                        })
                }
            })

    }
    const saveUserToDB = (name, email, photoURL, role) => {
        const user = {
            name,
            email,
            photoURL,
            role,
            isSellerVerified: false
        };
        fetch(`${process.env.REACT_APP_API_URL}/user`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('save user', data);
                setCreatedUserEmail(user.email);
            })
    }


    return (
        <div className="h-full bg-base-200 w-full py-16 px-4">
            <div className="flex flex-col items-center justify-center">

                <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-5 md:p-10">
                    <div className='mb-10'>
                        <p tabIndex={0} className="text-2xl text-center font-extrabold leading-6 text-gray-800">
                            Signup to create your account
                        </p>

                    </div>
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <div className="relative">
                            <input {...register("name", { required: "Name is required" })} type="text" name='name' id="floating_outlined-name" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                            <label htmlFor="floating_outlined-name" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Your Name</label>
                            <div>
                                {errors.email && <p role="alert" className='text-red-700 text-xs'>{errors.email?.message}</p>}
                            </div>
                        </div>
                        <div className="relative mt-4">
                            <input {...register("img", { required: "Image is required" })} type="file" name='img' id="floating_outlined-img" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                            <label htmlFor="floating_outlined-img" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Choose Profile Photo</label>
                            <div>
                                {errors.img && <p role="alert" className='text-red-700 text-xs'>{errors.img?.message}</p>}
                            </div>

                        </div>
                        <div className="relative mt-4">
                            <input {...register("email", { required: "Email Address is required" })} type="email" id="floating_outlined-email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                            <label htmlFor="floating_outlined-email" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email Address</label>
                            <div>
                                {errors.email && <p role="alert" className='text-red-700 text-xs'>{errors.email?.message}</p>}
                            </div>
                        </div>
                        <div className="w-full pt-4">
                            <div className="relative flex items-center justify-center">
                                <div className='w-full'>
                                    <input {...register("password", {
                                        required: "Password is required!",
                                        minLength: { value: 8, message: "Password should be at least 8 char" },
                                        pattern: {
                                            value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/
                                            , message: "Please use symbol, num, upper & lowercase"
                                        }
                                    })} type={passwordShown ? "text" : "password"} id="floating_outlined-pass" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                                    <label htmlFor="floating_outlined-pass" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
                                </div>
                                <div onClick={() => setPasswordShown(!passwordShown)} className="absolute right-0 mr-3 cursor-pointer">
                                    {
                                        passwordShown ? <BsEye /> : <BsEyeSlash />
                                    }
                                </div>

                            </div>
                            {errors.password && <p role="alert" className='text-red-700 text-xs'>{errors.password?.message}</p>}
                        </div>
                        <div className="relative mt-4">
                            <div className='flex gap-3'>
                                <select onChange={(event) => setUserRole(event.target.value)}
                                    value={userRole}

                                    name="role"
                                    id="floating_outlined-radio"
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                                    placeholder='Select Your Role'
                                    required
                                >
                                    <option value='buyer'>Buyer</option>
                                    <option value='seller'>Seller</option>
                                </select>
                            </div>

                            <label htmlFor="floating_outlined-radio" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">I'm creating account as a</label>

                        </div>


                        <div className="mt-8">
                            <button type="submit" className="text-lg rounded-md font-semibold leading-none text-white focus:outline-none bg-gradient-to-tl from-primary to-secondary border hover:bg-secondary py-4 w-full">

                                {loading ? <Spinner /> : 'Create my account'}
                            </button>
                        </div>
                    </form>
                    <p className="text-sm text-center mt-8 font-medium leading-none text-gray-500">
                        Already have an account?{" "}
                        <Link to='/login' tabIndex={0} className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer">
                            {" "}
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;