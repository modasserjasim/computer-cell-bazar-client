import React, { useContext } from 'react';
import { NavLink, Outlet, ScrollRestoration } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import Footer from '../Pages/Shared/Footer/Footer';
import Header from '../Pages/Shared/Header/Header';
import { GoSignOut } from "react-icons/go";
import { BsCartCheck, BsBookmarkCheck } from "react-icons/bs";
import { RiProductHuntLine, RiFolderAddLine, RiUser2Fill, RiUser3Line } from "react-icons/ri";
import { MdReportGmailerrorred } from "react-icons/md";
import useSeller from '../hooks/useSeller';
import useBuyer from '../hooks/useBuyer';

const DashboardLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);
    const [isBuyer] = useBuyer(user?.email);

    const inActive = "flex justify-start items-center gap-2 text-white uppercase btn btn-sm btn-ghost";
    const activeMenu = "flex justify-start items-center gap-2 btn btn-sm glass text-white"

    return (
        <div>
            <Header></Header>
            <div className="sm:flex border-t border-base-200">
                <div className="flex flex-col md:min-h-screen p-3 bg-gradient-to-r from-primary to-secondary sm:w-72 md:w-80">
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
                                    <p className="text-xs text-gray-200 text-center">
                                        {isAdmin && 'Administrator'}
                                        {isSeller && 'Seller'}
                                        {isBuyer && 'Buyer'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <ul className="pt-2 pb-4 space-y-3 text-sm flex justify-between items-center sm:block">
                                {
                                    isBuyer && <>
                                        <li className="rounded-sm">
                                            <NavLink to='/dashboard/my-orders' className={({ isActive }) => isActive ? activeMenu : inActive} >
                                                <BsCartCheck className='text-2xl' />
                                                <span className='hidden sm:block'>My Orders</span>
                                            </NavLink>
                                        </li>
                                        <li className="rounded-sm">
                                            <NavLink to='/dashboard/wishlist' className={({ isActive }) => isActive ? activeMenu : inActive} >
                                                <BsBookmarkCheck className='text-2xl' />
                                                <span className='hidden sm:block'>My Wishlist</span>
                                            </NavLink>
                                        </li>
                                    </>
                                }

                                {/* seller options  */}
                                {
                                    isSeller && <>
                                        <li className="rounded-sm">
                                            <NavLink to='/dashboard/add-product' className={({ isActive }) => isActive ? activeMenu : inActive} >
                                                <RiFolderAddLine className='text-2xl' />
                                                <span className='hidden sm:block'>Add A Product</span>
                                            </NavLink>
                                        </li>
                                        <li className="rounded-sm">
                                            <NavLink to='/dashboard/my-products' className={({ isActive }) => isActive ? activeMenu : inActive} >
                                                <RiProductHuntLine className='text-2xl' />
                                                <span className='hidden sm:block'>My Products</span>
                                            </NavLink>
                                        </li>
                                        <li className="rounded-sm">
                                            <NavLink to='/dashboard/my-buyers' className={({ isActive }) => isActive ? activeMenu : inActive} >
                                                <RiUser2Fill className='text-2xl' />
                                                <span className='hidden sm:block'>My Buyers</span>
                                            </NavLink>
                                        </li>
                                    </>
                                }

                                {
                                    isAdmin && <>

                                        <li className="rounded-sm">
                                            <NavLink to='/dashboard/all-sellers' className={({ isActive }) => isActive ? activeMenu : inActive} >
                                                <RiUser3Line className='text-2xl' />
                                                <span className='hidden sm:block'>All Sellers</span>
                                            </NavLink>
                                        </li>
                                        <li className="rounded-sm">
                                            <NavLink to='/dashboard/all-buyers' className={({ isActive }) => isActive ? activeMenu : inActive} >
                                                <RiUser2Fill className='text-2xl' />
                                                <span className='hidden sm:block'>All Buyers</span>
                                            </NavLink>
                                        </li>
                                        <li className="rounded-sm">
                                            <NavLink to='/dashboard/reported-products' className={({ isActive }) => isActive ? activeMenu : inActive} >
                                                <MdReportGmailerrorred className='text-2xl' />
                                                <span className='hidden sm:block'>Reported Products</span>
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