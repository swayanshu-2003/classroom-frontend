import React, { useEffect, useState } from 'react'
import Banner1 from '@/assets/banners/banner1.jpg'
import ClassIdCard from '@/components/cards/ClassIdCard'
import ClassBanner from '@/components/class-banners/ClassBanner'
import { useParams } from 'next/navigation'
import axiosInstance from '@/utils/api'
import { toast } from '@/components/ui/use-toast'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import ClassDetailsSkeletonLoader from '@/components/skeleton-loaders/ClassDetailsSkeletonLoader'
import moment from 'moment'
import Link from 'next/link'

const ClassDetails = () => {
    const params: any = useParams()

    const [assignments, setAssignments] = useState<any>([])

    const [classroomDetails, setClassroomDetails] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const fetchClassroomDetails = async () => {

        try {
            const res = await axiosInstance.get(`/classroom/${params.class_id}`)
            console.log(res)
            if (res?.data?.success) {
                setClassroomDetails(res?.data?.data)
            } else {
                toast({
                    description: "Something went wrong",
                })
            }
        } catch (err) {
            toast({
                description: "Something went wrong",
            })
        }

    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await fetchClassroomDetails()
            await fetchAssignments()
            setLoading(false)
        }
        fetchData()
    }, [])


    const fetchAssignments = async () => {
        try {

            const res: any = await axiosInstance.get(`/assignments/${params.class_id}`)
            console.log(res)
            if (res?.data?.success) {
                const extractedNotices = res?.data?.data?.filter((item: any) => item?.type === "Notice")
                console.log(extractedNotices)
                setAssignments(extractedNotices)
            } else {
                toast({
                    description: "❌ something went wrong, please try again"
                })
            }
        } catch (error) {
            toast({
                description: "❌ something went wrong, please try again"
            })
        }

    }



    return (
        loading ? <ClassDetailsSkeletonLoader /> :
            <div className="w-full flex flex-col ">
                <div
                    className="relative bg-gray-800 rounded-lg flex flex-col justify-end "
                    style={{
                        backgroundImage: `url(${Banner1.src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '300px',
                    }}
                >
                    <div className="bg-black bg-opacity-50 p-5 rounded-lg">
                        <p className="text-4xl text-white font-bold mb-4">{classroomDetails?.class_name}</p>
                        <p className="text-lg text-white mb-4">{classroomDetails?.description}</p>
                        <div className="flex items-center gap-3 bg-white w-fit px-2 py-1 rounded-lg">
                            <Avatar className='w-8 h-8'>
                                <AvatarImage src={classroomDetails?.owner?.profile_picture} alt={classroomDetails?.owner?.name} />
                                <AvatarFallback>{classroomDetails?.owner?.name}</AvatarFallback>
                            </Avatar>
                            <div className="w-fit flex flex-col gap-0">
                                <span className="text-sm  text-blue-800">{classroomDetails?.owner?.name}</span>
                                <span className="text-xs  text-zinc-400">@{classroomDetails?.owner?.username}</span>
                            </div>
                        </div>
                    </div>
                </div>





                <div className="flex gap-5 w-full h-auto " style={{ marginTop: "20px" }}>
                    <div className="w-[110px] h-20 border border-zinc-300 rounded-lg py-3 flex flex-col justify-center items-center gap-1">
                        <p className="text-xs text-zinc-600">Class Code</p>
                        <span className="border-zinc-300 border-b w-full  rounded-lg"></span>
                        <p className="text-2xl text-indigo-500 font-bold cursor-pointer mt-1">{classroomDetails?.class_id}</p>
                    </div>
                    <div className="w-11/12">

                        <div className="w-full h-fit rounded-lg border border-zinc-300 p-4" >
                            <p className="text-xl font-semibold text-blue-800 mb-3 font-mono ">Recent Notices</p>
                            <hr />
                            {assignments?.map((item: any, index: any) => (
                                <div key={index} className="px-4 py-4 my-5 w-full font-normal border border-zinc-200 rounded-lg">
                                    <div className="flex flex-col justify-between md:flex-row">
                                        <div className="w-fit flex flex-col gap-0 mb-3">
                                            <h3 className=" text-base font-semibold leading-snug text-gray-600">
                                                {item.title}
                                            </h3>
                                            <p className="flex gap-2 text-xs font-semibold leading-snug text-gray-600">
                                                <span className="font-light">by</span> <span className='italic underline'>{item?.created_by?.name}</span>
                                            </p>
                                        </div>
                                        <div className="flex items-center mb-2 space-x-2">
                                            <p className="px-2 text-gray-200 bg-purple-500 rounded text-sm">{item.type || "Assignment"}</p>
                                            <p className="px-2 text-gray-500  rounded text-xs">{moment(item.created_at).format('DD MM YYYY')}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm">
                                        {item.description}
                                    </p>
                                    <Link href={item.link} className="text-blue-500 text-sm mt-2">
                                        {item.link}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


            </div>

    )
}

export default ClassDetails