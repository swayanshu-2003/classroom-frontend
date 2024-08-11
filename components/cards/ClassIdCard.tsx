import axiosInstance from '@/utils/api'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from '../ui/use-toast'
import { Skeleton } from '../ui/skeleton'

const ClassIdCard = ({ setClassDetails }: { setClassDetails?: any }) => {

    const params: any = useParams()

    const [classroomDetails, setClassroomDetails] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchClassroomDetails = async () => {
            setLoading(true)
            try {
                const res = await axiosInstance.get(`/classroom/${params.class_id}`)
                console.log(res)
                if (res?.data?.success) {
                    setClassroomDetails(res?.data?.data)
                    setClassDetails(res?.data?.data)
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
            setLoading(false)
        }
        fetchClassroomDetails()
    }, [])




    return (
        loading ? <ClassroomDetailsSkeleton /> :
            <div className="bg-white overflow-hidden shadow rounded-lg border h-fit m-3 w-full md:w-3/12">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Classroom Details
                    </h3>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-xs font-medium text-gray-400  ">
                                Classroom
                            </dt>

                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {classroomDetails?.class_name}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-xs font-medium text-gray-400">
                                Class ID
                            </dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 bg-purple-600  text-white w-fit px-1 rounded-md">
                                {classroomDetails?.class_id}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-xs font-medium text-gray-400">
                                By
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {classroomDetails?.owner?.name}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-xs font-medium text-gray-400">
                                Description
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-justify ml-2">
                                {classroomDetails?.description}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
    )
}

export default ClassIdCard




export const ClassroomDetailsSkeleton = () => {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg border h-fit w-3/12">
            <div className="px-4 py-5 sm:px-6">
                <Skeleton className="h-6 w-1/3" />
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            <Skeleton className="h-4 w-1/2" />
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <Skeleton className="h-4 w-3/4" />
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            <Skeleton className="h-4 w-1/2" />
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <Skeleton className="h-4 w-3/4" />
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            <Skeleton className="h-4 w-1/2" />
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <Skeleton className="h-4 w-3/4" />
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            <Skeleton className="h-4 w-1/2" />
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-justify ml-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4 mt-2" />
                            <Skeleton className="h-4 w-2/3 mt-2" />
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

