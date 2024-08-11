import ClassroomCard from '@/components/cards/ClassroomCard';
import CardLoader from '@/components/skeleton-loaders/CardLoader';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const ClassroomList = ({ refetch, classrooms, title, loading }: { refetch: any; classrooms: any, title: string, loading: boolean }) => {
    return (
        loading ? (
            <div className="w-full px-6 md:px-0">
                <Skeleton className="h-6 w-16 my-4 rounded-full" />
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                    {
                        [1, 2, 3].map((id: any) => (
                            <CardLoader key={id} />
                        ))
                    }
                </div>
            </div >
        ) : (
            <div className="w-full px-6 md:px-0">
                <p className="text-xl sm:text-2xl font-bold py-4">{title}</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        !classrooms || classrooms?.length === 0 ? (
                            <p>No classrooms found</p>
                        ) : (
                            classrooms?.map((classroom: any) => (
                                <ClassroomCard key={classroom?.class_id} refetch={refetch} classroom={classroom} />
                            ))
                        )
                    }
                </div>
            </div>
        )
    );
}

export default ClassroomList;
