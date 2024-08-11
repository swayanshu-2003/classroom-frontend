"use client";
import CreateClassForm from '@/components/forms/CreateClassForm';
import JoinClassroomForm from '@/components/forms/JoinClassroomForm';
import CreateClassButton from '@/components/overlay/CreateClassButton';
import JoinClassroom from '@/components/overlay/JoinClassroom';
import Sidebar from '@/components/sidebar/Sidebar';
import { CustomModal } from '@/components/ui/Modal';
import ClassroomList from '@/sections/ClassroomList';
import axiosInstance from '@/utils/api';
import { getToken } from '@/utils/LocalStorageUtils';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const page = () => {
    const [joinedClassroomData, setJoinedClasssroomData] = useState<any>(null);
    const [createdClassroomData, setCreatedClasssroomData] = useState<any>(null);
    const [teachingClassroomData, setTeachingClasssroomData] = useState<any>(null);
    const [pageLoading, setPageLoading] = useState<boolean>(true);
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [openJoinModal, setOpenJoinModal] = useState<boolean>(false);

    const router = useRouter();
    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push('/login');
        }
    }, []);

    const fetchClasses = async () => {
        const res = await axiosInstance.get('/classrooms');
        if (res?.data?.success) {
            setJoinedClasssroomData(filterClassrooms(res?.data?.joined_as_student));
            setCreatedClasssroomData(res?.data?.own);
            setTeachingClasssroomData(filterClassrooms(res?.data?.joined_as_teacher));
        }
        setPageLoading(false);
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const filterClassrooms = (classrooms: any) => {
        return classrooms?.map(({ classroom, index }: any) => {
            return classroom;
        });
    };

    const refetchDashboard = async () => {
        console.log("inside refetch");
        await fetchClasses();
    };

    return (
        <div className='w-full flex flex-col lg:flex-row gap-5 mb-32 md:mb-0'>
            <Sidebar />
            <div className="w-full md:w-5/6 lg:w-4/5 flex flex-col gap-5">
                <div className='ml-0 lg:ml-20 w-full mb-20'>
                    <ClassroomList refetch={refetchDashboard} loading={pageLoading} classrooms={createdClassroomData} title="Created by You" />
                </div>
                <div className='ml-0 lg:ml-20 w-full mb-20'>
                    <ClassroomList refetch={refetchDashboard} loading={pageLoading} classrooms={joinedClassroomData} title="Joined as Student" />
                </div>
                <div className='ml-0 lg:ml-20 w-full mb-20'>
                    <ClassroomList refetch={refetchDashboard} loading={pageLoading} classrooms={teachingClassroomData} title="Joined as Teacher" />
                </div>
            </div>
            <CreateClassButton setOpen={setOpenCreateModal} />
            <JoinClassroom setOpen={setOpenJoinModal} />
            <CustomModal className='w-fit' open={openCreateModal} setOpen={setOpenCreateModal} child={<CreateClassForm refetch={refetchDashboard} editData={{}} type="create" setOpen={setOpenCreateModal} />} />
            <CustomModal className='w-fit' open={openJoinModal} setOpen={setOpenJoinModal} child={<JoinClassroomForm refetch={refetchDashboard} setOpen={setOpenJoinModal} />} />
        </div>
    );
};

export default page;
