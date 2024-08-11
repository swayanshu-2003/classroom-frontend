import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ClassroomMembersSkeletonLoader = () => {
    return (
        <div className='w-full flex mt-10 justify-between'>
            <div className="w-5/6 flex flex-col">
                <div className="w-4/6 bg-white shadow-md rounded-md overflow-hidden mx-auto mt-16">
                    <div className="bg-gray-100 py-2 px-4">
                        <Skeleton className="h-6 w-1/4" />
                    </div>
                    <ul className="divide-y divide-gray-200">
                        <li className="flex items-center py-4 px-6">
                            <Skeleton className="h-6 w-6 mr-4" />
                            <Skeleton className="w-12 h-12 rounded-full object-cover mr-4" />
                            <div className="flex-1">
                                <Skeleton className="h-6 w-1/2" />
                                <Skeleton className="h-4 w-1/4 mt-1" />
                            </div>
                        </li>
                        <li className="flex items-center py-4 px-6">
                            <Skeleton className="h-6 w-6 mr-4" />
                            <Skeleton className="w-12 h-12 rounded-full object-cover mr-4" />
                            <div className="flex-1">
                                <Skeleton className="h-6 w-1/2" />
                                <Skeleton className="h-4 w-1/4 mt-1" />
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="w-4/6 bg-white shadow-md rounded-md overflow-hidden mx-auto mt-16">
                    <div className="bg-gray-100 py-2 px-4">
                        <Skeleton className="h-6 w-1/4" />
                    </div>
                    <ul className="divide-y divide-gray-200">
                        <li className="flex items-center py-4 px-6">
                            <Skeleton className="h-6 w-6 mr-4" />
                            <Skeleton className="w-12 h-12 rounded-full object-cover mr-4" />
                            <div className="flex-1">
                                <Skeleton className="h-6 w-1/2" />
                                <Skeleton className="h-4 w-1/4 mt-1" />
                            </div>
                        </li>
                        <li className="flex items-center py-4 px-6">
                            <Skeleton className="h-6 w-6 mr-4" />
                            <Skeleton className="w-12 h-12 rounded-full object-cover mr-4" />
                            <div className="flex-1">
                                <Skeleton className="h-6 w-1/2" />
                                <Skeleton className="h-4 w-1/4 mt-1" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ClassroomMembersSkeletonLoader