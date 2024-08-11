import axiosInstance from '@/utils/api';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaUserTie } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Skeleton } from '../ui/skeleton';
import { getUser } from '@/utils/LocalStorageUtils';
import { CustomModal } from '../ui/Modal';
import CreateClassForm from '../forms/CreateClassForm';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';
import { toast } from '../ui/use-toast';

const ClassroomCard = ({ refetch, classroom }: any) => {
    const [owner, setOwner] = React.useState<any>(null);
    const [viewButtons, setViewButtons] = React.useState<boolean>(false)
    const [openEditModal, setOpenEditModal] = React.useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false)
    const [loading, setLoading] = useState<any>(false)
    const [deleteClassId, setDeleteClassId] = useState<any>(null)

    useEffect(() => {
        const fetchOwner = async () => {
            try {
                const response = await axiosInstance.post(`/user/${classroom?.owner_id}`);
                setOwner(response?.data?.data);

            } catch (error) {
                console.error('Error fetching owner:', error);
            }
        };
        fetchOwner()
    }, [classroom])

    const handleEditAndDelete = () => {
        let parsedUser: any;
        const user = getUser();
        if (user) {
            parsedUser = JSON.parse(user);

            if (classroom?.owner_id === parsedUser.token) {
                setViewButtons(true)
            } else {

                setViewButtons(false)
            }
        }

    }

    const deleteClassroom = async () => {
        setLoading(true)
        try {

            const res: any = await axiosInstance.patch(`/classroom/edit/${deleteClassId}`, { is_deleted: true })
            if (res?.data?.success) {
                toast({
                    description: "classroom deleted successfully"
                })

            } else {
                toast({
                    description: "something went wrong"
                })
            }
        } catch (err) {
            console.log(err)
            toast({
                description: "something went wrong"
            })

        }
        await refetch()
        setLoading(false)
        setOpenDeleteModal(false)
    }


    return (
        <>
            <div className="bg-indigo-50 md:max-w-xs w-full h-[88px] px-4 pt-3 pb-1 cursor-pointer transition-all duration-500 ease-in-out overflow-hidden"
                onMouseOver={handleEditAndDelete}
                onMouseLeave={() => setViewButtons(false)}
                style={{
                    fontFamily: 'Inter, sans-serif',
                    borderRadius: '1rem'
                }}>
                <Link href={`/classroom/${classroom?.class_id}`} className="flex flex-col px-0 h-full">
                    <div className="w-full flex justify-between">
                        <p className="text-md md:text-lg font-semibold m-0 truncate w-3/4 whitespace-nowrap text-ellipsis" style={{ color: 'rgb(89, 79, 253)' }}>{classroom?.class_name}</p>

                        <div className="px-2 flex-1 lg:flex-none flex justify-center items-center text-center border border-transparent text-xs font-black" style={{
                            backgroundColor: 'rgb(89, 79, 253)',
                            color: 'rgb(255, 255, 255)',
                            borderRadius: '0.375rem'
                        }}>
                            ID : {classroom?.class_id}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-stretch my-2 w-full flex-grow">
                        <div className="w-full flex justify-between items-center mt-4 lg:mt-0 border-zinc-200 border-t pt-2 -mb-1">
                            <span className="text-sm">
                                <p className="no-underline shrink-0 text-zinc-400 flex items-center gap-2"><FaUserTie /><span className='text-xs text-gray-400'></span>{owner?.name}</p>
                            </span>
                        </div>
                    </div>
                </Link>
                <div className={`w-full justify-end -mt-5 gap-2 px-1 text-lg ${viewButtons ? "flex" : "hidden"}`}>
                    <FaEdit className='text-green-500' onClick={() => setOpenEditModal(true)} />
                    <MdDeleteForever className='text-red-500' onClick={() => {
                        setOpenDeleteModal(true);
                        setDeleteClassId(classroom?.class_id);
                    }} />
                </div>
            </div>

            <CustomModal
                open={openEditModal}
                setOpen={setOpenEditModal}
                className='w-fit'
                child={
                    <CreateClassForm
                        refetch={refetch}
                        setOpen={setOpenEditModal}
                        editData={classroom}
                        type="edit"
                    />
                }
            />
            <CustomModal
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
                className='w-fit'
                child={
                    <div className='w-[400px]'>
                        <p className='w-full py-3'>Are you sure, You want to delete this class?</p>
                        <div className="w-full flex gap-3 items-center mt-5 justify-end py-2">
                            <button onClick={() => setOpenDeleteModal(false)} disabled={loading} type='submit' className="rounded border border-red-500 py-1 px-6 text-md text-red-600 hover:bg-red-100 focus:outline-none">Cancel</button>
                            <button onClick={deleteClassroom} disabled={loading} type='submit' className="rounded border-0 bg-indigo-500 py-1 px-6 text-md text-white hover:bg-indigo-600 focus:outline-none">{loading ? <ClipLoader color='white' size={15} /> : "Confirm"}</button>
                        </div>
                    </div>
                }
            />
        </>

    )
}

export default ClassroomCard;
