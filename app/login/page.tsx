"use client";
import React, { useEffect, useState } from 'react'
import Logo from "@/assets/logo/logo.webp"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getToken, setToken, setUser } from '@/utils/LocalStorageUtils';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Loader from '@/components/loader/loader';

const page = () => {
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    useEffect(() => {
        const token = getToken()
        if (token) {
            router.push('/dashboard');
        }
    }, []);

    const methods = useForm()
    const { handleSubmit, formState: { errors }, register } = methods

    const onSubmit = async (data: any) => {
        setLoading(true)
        console.log(data)
        const res: any = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`, data)
        console.log(res)
        if (res?.status === 200) {
            setToken(res?.data?.token)
            setUser(res?.data)
            router.push('/dashboard')
        }
        setLoading(false)
    }

    console.log(errors)

    return (
        <>
            {loading && <Loader loading={loading} />}

            <div className="min-h-screen bg-gray-600 text-gray-900 flex justify-center max-h-screen">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div>
                            <Image src={Logo} className="w-32 mx-auto" alt="" />
                        </div>
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">
                                Login
                            </h1>
                            <div className="w-full flex-1">


                                <form className="mx-auto max-w-xs mt-5" onSubmit={handleSubmit(onSubmit)}>
                                    <input
                                        className="w-full px-8 py-4  rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text"
                                        placeholder="Username"
                                        {...register("username", { required: "Username is required" })}
                                    />
                                    {errors?.username && <small className="text-red-500 text-xs">{errors.username.message?.toString()}</small>}
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        placeholder="Password"
                                        {...register("password", { required: "Password is required" })}
                                    />
                                    {errors?.password && <small className="text-red-500 text-xs">{errors.password.message?.toString()}</small>}
                                    <button
                                        type='submit'
                                        className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    >
                                        <svg
                                            className="w-6 h-6 -ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3">Login</span>
                                    </button>

                                    <div className="my-6 border-b text-center">
                                        <Link href="/create-account" className="underline leading-none px-2 inline-block text-sm text-blue-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                            Don't have Account? Create one
                                        </Link>
                                    </div>
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        I agree to abide by templatana's
                                        <a href="#" className="border-b border-gray-500 border-dotted">
                                            Terms of Service
                                        </a>
                                        and its
                                        <a href="#" className="border-b border-gray-500 border-dotted">
                                            Privacy Policy
                                        </a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                        <div
                            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{ backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')" }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default page