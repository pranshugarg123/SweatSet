import React from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Header({ userLoggedin, setUserLoggedin }) {
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleLogout = async () => {
        axios
            .get("http://localhost:5001/auth/logout")
            .then((res) => {
                console.log(res.data);
                setUserLoggedin(null);
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-black border-b border-gray-500 px-4 lg:px-6 py-2.5">
                {" "}
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl sm:order-0">
                    {/* ----------------- Left section ----------------- */}
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://i.ibb.co/THJXBgb/Logo-Full.png"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>

                    {/* ----------------- Right section ----------------- */}
                    <div className="flex items-center lg:order-2 sm:order-2">
                        {userLoggedin === null ? (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-400 text-lg hover:bg-black hover:text-red-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                >
                                    Get started
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={() => handleLogout()}
                                className="text-white bg-red-500 hover:bg-white hover:text-red-500 focus:ring-4 focus:ring-blue-300 font-semibold rounded-full px-5 py-3 transition duration-300 ease-in-out mr-2 text-base focus:outline-none"
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    {/* ----------------- Middle section ----------------- */}
                    {/* <button className="justify-between items-center  bg-white lg:flex lg:w-auto sm:order-1">
                        Button
                    </button> */}
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `${
                                            isActive
                                                ? "text-red-500"
                                                : "text-gray-400"
                                        } text-lg block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-red-600 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `${
                                            isActive
                                                ? "text-red-500"
                                                : "text-gray-400"
                                        } text-lg block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-red-600 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        `${
                                            isActive
                                                ? "text-red-500"
                                                : "text-gray-400"
                                        } text-lg block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-red-600 lg:p-0`
                                    }
                                >
                                    Contacts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) =>
                                        `${
                                            isActive
                                                ? "text-red-500"
                                                : "text-gray-400"
                                        } text-lg block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-red-600 lg:p-0`
                                    }
                                >
                                    Profile
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
