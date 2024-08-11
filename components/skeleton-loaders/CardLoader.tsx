import React from 'react'
import { Skeleton } from '../ui/skeleton'

const CardLoader = () => {
    return (
        <div className="bg-indigo-50 w-80 px-4 pt-3 pb-1 cursor-pointer transition-all duration-500 ease-in-out overflow-y-hidden"
            style={{
                fontFamily: 'Inter, sans-serif',
                borderRadius: '1rem'
            }}>
            <div className="flex flex-col px-0 ">
                <div className="w-full flex justify-between">
                    <div className="w-full flex justify-between items-center">
                        <Skeleton className="h-6 w-24 bg-slate-200" />
                    </div>
                    <Skeleton className="h-6 w-20 px-2 bg-slate-200" />

                </div>
                <div className="flex flex-col gap-2 items-stretch my-2">
                    <div className="flex-1">
                        <Skeleton className="h-4 w-full my-1 bg-slate-200" />
                        <Skeleton className="h-4 w-3/4 my-1 bg-slate-200" />
                    </div>
                    <div className="w-full flex justify-between items-center mt-4 lg:mt-0 ">
                        <Skeleton className="h-4 w-32 bg-slate-200" />
                        <div className="gap-2 px-1 text-lg hidden">
                            <Skeleton className="h-6 w-6 rounded-full bg-slate-200" />
                            <Skeleton className="h-6 w-6 rounded-full   bg-slate-300" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardLoader