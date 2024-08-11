import React from 'react'
import { Skeleton } from '../ui/skeleton'

const AssignmentLoader = () => {
    return (
        <div className="w-full flex mt-10 justify-between">
            <div className="w-5/6 flex flex-col justify-between">
                <div className="relative w-full bg-white rounded-lg border pt-4 mx-auto ">
                    <div className="absolute px-2 py-1 top-0 -left-[0.5] bg-indigo-200 rounded-tl-lg rounded-br-lg">
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <form>
                        <div className="w-full mb-2 mt-6 flex">
                            <div className="w-3/4 px-3 mb-2 mt-6">
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div className="w-1/4 px-3 mb-2 mt-6">
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                        <div className="w-full px-3 mb-2 mt-6">
                            <Skeleton className="h-28 w-full" />
                        </div>
                        <div className="w-full px-3 mb-2 mt-6">
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="w-full flex justify-end px-3 my-3">
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </form>
                </div>
                <div className="px-4 py-4 my-5 w-full font-normal border border-zinc-200 rounded-lg">
                    <div className="flex flex-col justify-between md:flex-row">
                        <Skeleton className="h-6 w-64 mb-2" />
                        <div className="flex items-center mb-2 space-x-2">
                            <Skeleton className="h-6 w-12" />
                            <Skeleton className="h-6 w-12" />
                            <Skeleton className="h-6 w-12" />
                        </div>
                    </div>
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
            <div className="w-1/6">
                <Skeleton className="h-16 w-full" />
            </div>
        </div>
    )
}

export default AssignmentLoader