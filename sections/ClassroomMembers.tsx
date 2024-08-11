import ClassIdCard from '@/components/cards/ClassIdCard'
import ClassroomMembersSkeletonLoader from '@/components/skeleton-loaders/ClassroomMembersSkeletonLoader'
import { toast } from '@/components/ui/use-toast'
import axiosInstance from '@/utils/api'
import { getToken } from '@/utils/LocalStorageUtils'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ImExit } from "react-icons/im";

const ClassroomMembers = () => {
    const params: any = useParams()

    const router = useRouter()
    const [students, setStudents] = useState<any>([])
    const [teachers, setTeachers] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [ownerId, setOwnerID] = useState<any>(null)

    useEffect(() => {
        const fetchClassroomMembers = async () => {
            setLoading(true)
            try {
                const res = await axiosInstance.get(`/classroom/members/${params.class_id}`);
                console.log(res)
                if (res?.data?.success) {
                    setOwnerID(res?.data?.owner_id)
                    setStudents(res?.data?.students)
                    setTeachers(res?.data?.teachers)
                } else {
                    toast({
                        description: "Something went wrong"
                    })
                }
            } catch (err) {
                toast({
                    description: "Something went wrong"
                })
            }
            setLoading(false)
        }
        fetchClassroomMembers()
    }, [])

    async function handleRemoveMember(user_id: any) {
        setLoading(true)
        try {
            const res: any = await axiosInstance.patch(`classroom/exit/${params.class_id}/${user_id}`);
            console.log(res)
            if (res?.data?.success) {
                toast({
                    description: "Classroom exited successfully"
                })
                router.push("/dashboard")
            } else {
                toast({
                    description: "something went wrong"
                })
            }
        } catch (err) {
            toast({
                description: "something went wrong"
            })
        }
        setLoading(false)
    }

    return (
        loading ? <ClassroomMembersSkeletonLoader /> :
            <div className='w-full flex flex-col lg:flex-row mt-10 gap-8'>
                <div className="w-full lg:w-5/6 flex flex-col">
                    <div className="w-full lg:w-5/6 bg-white shadow-md rounded-md overflow-hidden mx-auto">
                        <div className="bg-indigo-100 py-2 px-4">
                            <h2 className="text-xl font-semibold text-indigo-800">Teachers</h2>
                        </div>
                        <ul className="divide-y divide-gray-200">
                            {teachers?.length > 0 ? teachers?.map((teacher: any, index: any) =>
                                <li key={index} className="flex items-center py-4 px-6">
                                    <span className="text-gray-700 text-lg font-medium mr-4">{index + 1}.</span>
                                    <img className="w-10 h-10 rounded-full object-cover mr-4" src={teacher?.users?.profile_picture}
                                        alt="User avatar" />
                                    <div className="flex-1">
                                        <h3 className="text-base font-medium text-gray-800">{teacher?.users?.name}</h3>
                                        <p className="text-gray-600 text-sm">@{teacher?.users?.username}</p>
                                    </div>
                                </li>
                            ) : (
                                <p className='w-full text-center p-4'>no teachers enrolled</p>
                            )}

                        </ul>
                    </div>

                    <div className="w-full lg:w-5/6 bg-white shadow-md rounded-md overflow-hidden mx-auto mt-16">
                        <div className="bg-green-100 py-2 px-4">
                            <h2 className="text-xl font-semibold text-green-800">Students</h2>
                        </div>
                        <ul className="divide-y divide-gray-200">
                            {students?.length > 0 ? students?.map((student: any, index: any) =>
                                <li key={index} className="relative py-4 px-6">
                                    <div className="flex items-center flex-wrap md:flex-nowrap">
                                        <span className="text-gray-700 text-lg font-medium mr-4">{index + 1}.</span>
                                        <img
                                            className="w-10 h-10 rounded-full object-cover mr-4"
                                            src={student?.users?.profile_picture}
                                            alt="User avatar"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-base font-medium text-gray-800">{student?.users?.name}</h3>
                                            <p className="text-gray-600 text-sm">@{student?.users?.username}</p>
                                        </div>
                                    </div>
                                    {getToken() === ownerId &&
                                        <div onClick={() => handleRemoveMember(student?.user_id)} className="w-full flex gap-2 items-center justify-end -mt-5 text-sm cursor-pointer">
                                            <span className="text-red-500 cursor-pointer ">Remove</span>
                                            <ImExit className="text-red-500 cursor-pointer" />
                                        </div>
                                    }
                                </li>

                            )
                                : (
                                    <p className='w-full text-center p-4'>no sutdents enrolled</p>
                                )}

                        </ul>
                    </div>
                </div>
                <ClassIdCard />

            </div>
    )
}

export default ClassroomMembers
