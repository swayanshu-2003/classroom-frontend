import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ClassDetailsSkeletonLoader = () => {
    return (
        <div className="w-full flex flex-col ">
            <div
                className="relative bg-gray-800 rounded-lg flex flex-col justify-end"
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '300px',
                }}
            >
                <div className="bg-black bg-opacity-50 p-5 rounded-lg">
                    <Skeleton className="h-10 w-3/4 mb-4" />
                    <Skeleton className="h-6 w-1/2 mb-4" />
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-6 w-1/4" />
                    </div>
                </div>
            </div>

            <div className="flex gap-5 w-full h-auto mt-5">
                <div className="w-[110px] h-20 border border-zinc-300 rounded-lg py-3 flex flex-col justify-center items-center gap-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-1 w-full border-b mt-1" />
                    <Skeleton className="h-6 w-3/4 mt-1" />
                </div>
                <div className="w-11/12 h-32 rounded-lg border border-zinc-300 p-4">
                    <Skeleton className="h-full w-full" />
                </div>
            </div>
        </div>
    )
}

export default ClassDetailsSkeletonLoader