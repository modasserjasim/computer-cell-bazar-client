import React, { useContext } from 'react';
import { NavLink, Outlet, ScrollRestoration } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import Footer from '../Pages/Shared/Footer/Footer';
import Header from '../Pages/Shared/Header/Header';
import { BsCalendar4Week, BsPlusCircleDotted, BsPerson } from "react-icons/bs";
import { GiDoctorFace } from "react-icons/gi";
import { GoSignOut } from "react-icons/go";

const DashboardLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);

    const inActive = "flex justify-start items-center gap-2 text-white uppercase btn btn-sm btn-ghost";
    const activeMenu = "flex justify-start items-center gap-2 btn btn-sm glass text-white"

    return (
        <div>
            <Header></Header>
            <div className="sm:flex border-t border-base-200">
                <div className="flex flex-col md:min-h-screen p-3 bg-gradient-to-r from-primary to-secondary sm:w-60 md:w-80">
                    <div className="space-y-3 md:sticky md:top-24">
                        <div className="hidden sm:block">
                            <div id="profile" className="space-y-3">
                                <img
                                    src={user?.photoURL}
                                    alt="Avatar user"
                                    className="w-10 md:w-16 rounded-full mx-auto"
                                />
                                <div>
                                    <h2
                                        className="font-medium text-white text-sm md:text-lg text-center"
                                    >
                                        {user?.displayName}
                                    </h2>
                                    <p className="text-xs text-gray-200 text-center">Administrator</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <ul className="pt-2 pb-4 space-y-3 text-sm flex justify-between items-center sm:block">
                                <li className="rounded-sm">
                                    <NavLink to='/dashboard' className={({ isActive }) => isActive ? activeMenu : inActive} >
                                        <BsCalendar4Week />
                                        <span className='hidden sm:block'>My Orders</span>
                                    </NavLink>
                                </li>
                                {/* seller options  */}
                                <li className="rounded-sm">
                                    <NavLink to='/dashboard/add-product' className={({ isActive }) => isActive ? activeMenu : inActive} >
                                        <BsCalendar4Week />
                                        <span className='hidden sm:block'>Add A Product</span>
                                    </NavLink>
                                </li>
                                <li className="rounded-sm">
                                    <NavLink to='/dashboard/my-products' className={({ isActive }) => isActive ? activeMenu : inActive} >
                                        <BsCalendar4Week />
                                        <span className='hidden sm:block'>My Products</span>
                                    </NavLink>
                                </li>
                                <li className="rounded-sm">
                                    <NavLink to='/dashboard/my-buyers' className={({ isActive }) => isActive ? activeMenu : inActive} >
                                        <BsCalendar4Week />
                                        <span className='hidden sm:block'>My Buyers</span>
                                    </NavLink>
                                </li>
                                {
                                    isAdmin && <>

                                        <li className="rounded-sm">
                                            <NavLink to='/dashboard/all-sellers' className={({ isActive }) => isActive ? activeMenu : inActive} >
                                                <BsPlusCircleDotted className='text-lg' />
                                                <span className='hidden sm:block'>All Sellers</span>
                                            </NavLink>
                                        </li>
                                        <li className="rounded-sm">
                                            <NavLink to='/dashboard/all-buyers' className={({ isActive }) => isActive ? activeMenu : inActive} >
                                                <GiDoctorFace className='text-xl' />
                                                <span className='hidden sm:block'>All Buyers</span>
                                            </NavLink>
                                        </li>
                                        <li className="rounded-sm">
                                            <NavLink to='/dashboard/reported-items' className={({ isActive }) => isActive ? activeMenu : inActive} >
                                                <BsPerson className='text-2xl' />
                                                <span className='hidden sm:block'>Reported Items</span>
                                            </NavLink>
                                        </li>
                                    </>
                                }
                                <li className="rounded-sm">
                                    <button onClick={logout} className={`${inActive} w-full`} >
                                        <GoSignOut className='text-2xl' />
                                        <span className='hidden sm:block'>Log out</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mx-auto my-7 sm:my-12 container px-5 md:px-20 lg:px-32">
                    <Outlet></Outlet>
                    <ScrollRestoration />
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;