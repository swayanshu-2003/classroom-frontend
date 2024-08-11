"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Logo from '@/assets/logo/logo.webp';
import Image from 'next/image';
import { clearToken, getToken, setToken } from '@/utils/LocalStorageUtils';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    const [token, setTokenState] = useState<any>(null);

    useEffect(() => {
        // Retrieve token when the component mounts
        const storedToken: any = localStorage.getItem('token');
        setTokenState(storedToken);

        // Listen for localStorage changes
        const handleStorageChange = () => {
            setTokenState(localStorage.getItem('token'));
        };

        window.addEventListener('storage', handleStorageChange);

        console.log(localStorage.getItem('token'))
        console.log(token)
        // Cleanup listener on unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        clearToken();
        setTokenState(null);
        router.push('/login');
    };

    return (
        <header className="bg-white sticky top-0 left-0 border-b border-zinc-200 z-[99999999]">
            <div className="mx-auto  px-7">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-1 md:flex md:items-center md:gap-12">
                        <Link className="block text-indigo-600" href="/">
                            <span className="sr-only">Home</span>
                            <Image src={Logo} alt="Logo" width={100} height={100} />
                        </Link>
                    </div>

                    <div className="md:flex md:items-center md:gap-12">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">

                                <li>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75" href="/dashboard"> Dashboard </Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="flex items-center gap-4">
                            {!token ? (
                                <div className="sm:flex sm:gap-4">
                                    <Link
                                        className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                                        href="/login"
                                    >
                                        Login
                                    </Link>
                                    <div className="hidden sm:flex">
                                        <Link
                                            className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-indigo-600"
                                            href="/create-account"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="sm:flex sm:gap-4">
                                    <button
                                        className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                            <div className="block md:hidden">
                                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
