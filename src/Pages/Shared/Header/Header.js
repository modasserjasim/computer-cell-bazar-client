import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { HiMenuAlt1, HiOutlineX, HiUserCircle } from "react-icons/hi";
import { IoMoonOutline, IoSunnyOutline, IoLaptopOutline } from "react-icons/io5";
import { BiUser, BiEdit } from "react-icons/bi";
import { VscSignOut } from "react-icons/vsc";
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import { themeChange } from 'theme-change';
import { MdOutlineDashboardCustomize } from "react-icons/md";


const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const [navbar, setNavbar] = useState(false);

    useEffect(() => {
        themeChange(false);
    }, []);


    return (
        <nav className="w-full bg-base-100 shadow sticky top-0 z-50">
            <div className="justify-between mx-auto lg:max-w-7xl md:items-center md:flex px-4 md:px-6">
                <div>
                    <div className="flex items-center gap-7 justify-between py-2 md:block">
                        <Link className='flex items-center gap-2' to='/'>
                            {/* <img src={logo} alt="Logo" className='w-44' /> */}
                            <IoLaptopOutline className='text-5xl md:text-7xl text-primary' />
                            <div>
                                <h2 className='text-xl md:text-2xl font-extrabold leading leading-5'>Computer</h2>
                                <h2 className='text-xl md:text-2xl md:-mt-2 font-extrabold leading-5'>Cell Bazar</h2>
                            </div>
                        </Link>

                        <div className="flex items-center md:hidden">
                            <label className="swap swap-rotate mr-2">
                                <input type="checkbox" />
                                <IoSunnyOutline data-set-theme="coffee" data-act-class="ACTIVECLASS" className="swap-on fill-current text-2xl" />
                                <IoMoonOutline data-set-theme="winter" data-act-class="ACTIVECLASS" className="swap-off fill-current text-2xl" />
                            </label>

                            {
                                user?.uid && <>
                                    <div className="dropdown dropdown-hover dropdown-end">
                                        <label className='btn p-0 btn-ghost mr-2 btn-circle avatar' tabIndex={0}>
                                            {
                                                user?.photoURL ? <div className="rounded-full w-9">
                                                    <img src={user?.photoURL} alt='User img' /> </div> :
                                                    <div className="text-4xl rounded-full">
                                                        <HiUserCircle /> </div>
                                            }
                                        </label>
                                        <div tabIndex={0} className="dropdown-content menu p-5 shadow bg-base-100 rounded-box w-52">
                                            {
                                                user?.photoURL && <img className='btn p-0 btn-ghost btn-circle avatar w-24 h-24 mx-auto' src={user?.photoURL} alt='User img' />
                                            }

                                            <h3>Welcome,</h3>
                                            <p>{user?.displayName}</p>
                                            <div className='pt-2 mt-2 border-t border-base-300'>
                                                <Link to='/user-profile' className='text-md flex items-center gap-1 py-2 hover:text-primary'><BiUser className='text-2xl' /> View Profile</Link>
                                                <Link to='/edit-profile' className='text-md flex items-center gap-1 py-2 hover:text-primary'><BiEdit className='text-2xl' /> Edit Profile</Link>
                                                <Link to='/dashboard' className='text-md flex items-center gap-1 py-2 hover:text-primary'><MdOutlineDashboardCustomize className='text-2xl' /> Dashboard</Link>
                                                <Link onClick={logout} className='text-md flex items-center gap-1 py-2 hover:text-primary'><VscSignOut className='text-2xl' /> Logout</Link>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                            <button
                                className="rounded-md "
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <HiOutlineX className='text-3xl text-primary animate-pulse delay-75 transition' />
                                ) : (
                                    <HiMenuAlt1 className='text-3xl' />
                                )}
                            </button>

                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <div className='flex items-center space-x-6'>
                            <ul className="items-center justify-center space-y-4 md:flex md:space-x-8 md:space-y-0 font-semibold uppercase">
                                <li className=" hover:text-primary">
                                    <NavLink className={({ isActive }) => isActive ? 'text-primary' : ''} to='/'>Home</NavLink>
                                </li>
                                <li className="hover:text-primary">
                                    <NavLink to='/blog' className={({ isActive }) => isActive ? 'text-primary' : ''}>Blog</NavLink>
                                </li>
                                {
                                    user?.uid && <li className=" hover:text-primary">
                                        <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'text-primary' : ''}>Dashboard</NavLink>
                                    </li>
                                }
                            </ul>
                            {
                                user?.uid ?
                                    <div className="dropdown dropdown-hover dropdown-end hidden md:block">
                                        <label className='btn p-0 btn-ghost btn-circle avatar' tabIndex={0}>
                                            {
                                                user?.photoURL ? <div className="rounded-full w-10">
                                                    <img className='' src={user?.photoURL} alt='User img' /> </div> :
                                                    <div className="text-4xl rounded-full">
                                                        <HiUserCircle /> </div>
                                            }
                                        </label>
                                        <div tabIndex={0} className="dropdown-content menu p-5 shadow bg-base-100 rounded-box w-52">
                                            {
                                                user?.photoURL && <img className='btn p-0 btn-ghost btn-circle avatar w-24 h-24 mx-auto' src={user?.photoURL} alt='User img' />
                                            }
                                            <h3>Welcome,</h3>
                                            <p>{user?.displayName}</p>
                                            <div className='pt-2 mt-2 border-t border-base-300'>
                                                <Link to='/user-profile' className='text-md flex items-center gap-1 py-2 hover:text-primary'><BiUser className='text-2xl' /> View Profile</Link>
                                                <Link to='/edit-profile' className='text-md flex items-center gap-1 py-2 hover:text-primary'><BiEdit className='text-2xl' /> Edit Profile</Link>
                                                <Link to='/dashboard' className='text-md flex items-center gap-1 py-2 hover:text-primary'><MdOutlineDashboardCustomize className='text-2xl' /> Dashboard</Link>
                                                <Link onClick={logout} className='text-md flex items-center gap-1 py-2 hover:text-primary'><VscSignOut className='text-2xl' /> Logout</Link>
                                            </div>
                                        </div>
                                    </div> : <Link to='/login'
                                        className="hover:text-primary font-semibold uppercase hidden md:block"
                                    >
                                        Login
                                    </Link>
                            }
                            <div className="hover:text-primary hidden md:block">
                                <label className="swap swap-rotate mt-2">
                                    <input type="checkbox" />
                                    <IoSunnyOutline data-set-theme="dark" data-act-class="ACTIVECLASS" className="swap-on fill-current text-2xl" />
                                    <IoMoonOutline data-set-theme="winter" data-act-class="ACTIVECLASS" className="swap-off fill-current text-2xl" />
                                </label>
                            </div>
                        </div>


                        <div className="md:hidden sm:inline-block mb-5 mt-6">
                            {
                                user?.uid ? <Link onClick={logout}
                                    className="px-4 mr-3 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                                >
                                    Log Out
                                </Link> : <>
                                    <Link to='/login'
                                        className="px-4 mr-3 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 font-semibold uppercase"
                                    >
                                        Login
                                    </Link>
                                    <Link to='/signup'
                                        className="px-4 py-2 btn-primary rounded-md shadow font-semibold uppercase"
                                    >
                                        Sign up
                                    </Link>
                                </>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Header;