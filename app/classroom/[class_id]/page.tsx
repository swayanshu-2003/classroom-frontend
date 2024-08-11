"use client"
import Sidebar from '@/components/sidebar/Sidebar'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ClassDetails from '@/sections/ClassDetails'
import Assignments from '@/sections/assignments/Assignments'
import ClassroomMembers from '@/sections/ClassroomMembers'


const ClassroomDetails = () => {

    const params: any = useParams()
    console.log(params)

    return (
        <div className='w-full flex gap-5'>
            <Sidebar />
            <div className="w-full md:w-5/6">
                <Tabs defaultValue="details" className="">
                    <TabsList className='w-full flex justify-start' >
                        <TabsTrigger value="details">Class Details</TabsTrigger>
                        <TabsTrigger value="feeds">Feeds</TabsTrigger>
                        <TabsTrigger value="members">People</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className='h-fit'>
                        <ClassDetails />
                    </TabsContent>
                    <TabsContent value="feeds">
                        <Assignments />
                    </TabsContent>
                    <TabsContent value="members">
                        <ClassroomMembers />
                    </TabsContent>
                </Tabs>

            </div>

        </div>
    )
}

export default ClassroomDetails