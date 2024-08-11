import React from 'react'
import Banner1 from '@/assets/banners/banner1.jpg'
import Banner2 from '@/assets/banners/banner2.jpg'
import Banner3 from '@/assets/banners/banner3.jpg'
import Image from 'next/image'
const ClassBanner = ({ classroomName, description }: any) => {
    return (
        <div
            className="bg-gray-300 rounded-large flex flex-col justify-center "
            style={{ display: "flex", flexDirection: "column", justifyContent: "end", padding: "40px", backgroundImage: `url(${Banner1.src})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '300px' }}
        >
            <p className="text-3xl text-white font-semibold capitalize" style={{ fontSize: '40px', marginBottom: "20px" }}>{classroomName}</p>
            <p className="text-3xl text-white " style={{ fontSize: '15px' }}>{description}
            </p>
        </div>

        // {/* <div
        //         className="bg-gray-300 rounded-large flex flex-col justify-center px-10 py-6"
        //         style={{ display: "flex", flexDirection: "column", justifyContent: "end", backgroundImage: `url(${Banner1.src})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '300px' }}
        //     >
        //         <p className="text-3xl text-white font-semibold capitalize" style={{ fontSize: '40px', marginBottom: "20px" }}>{classroomDetails?.class_name}</p>
        //         <p className="text-3xl text-white " style={{ fontSize: '15px' }}>{classroomDetails?.description}
        //         </p>
        //         <span className='text-xs text-white mt-3'>created by </span>
        //         <div className="text-sm text-white ml-12 mt-2 flex items-center gap-2" style={{ fontSize: '15px' }}>
        //             <Avatar className='w-6 h-6'>
        //                 <AvatarImage src={classroomDetails?.owner?.profile_picture} alt="@shadcn" />
        //                 <AvatarFallback>{classroomDetails?.owner?.name}</AvatarFallback>
        //             </Avatar>
        //             <span className='text-sm text-white'>{classroomDetails?.owner?.name}</span>
        //         </div>
        //     </div> */}
    )
}

export default ClassBanner