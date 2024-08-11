import ClassIdCard from '@/components/cards/ClassIdCard'
import React, { useEffect, useState } from 'react'
import { FieldErrors, FieldValues, useForm, UseFormClearErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useParams } from 'next/navigation'
import axiosInstance from '@/utils/api'
import { toast } from '@/components/ui/use-toast'
import AssignmentLoader from '@/components/skeleton-loaders/assignment-loader'
import moment from 'moment'
import Link from 'next/link'

const Assignments = () => {

    const [assignments, setAssignments] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [isTeacher, setIsTeacher] = useState<boolean>(false)
    const [classDetails, setClassDetails] = useState<any>(null)

    const params: any = useParams()

    const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm()

    const onSubmit = async (data: any) => {
        const payload = {
            ...data,
            class_id: `${params.class_id}`
        }
        const res: any = await axiosInstance.post(`/assignment/create`, payload)
        await refetchAssignments()
        console.log(res)
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token === classDetails?.owner_id) {
            setIsTeacher(true)
        } else {
            setIsTeacher(false)
        }
    }, [classDetails])

    const fetchAssignments = async () => {
        setLoading(true)
        try {
            const res: any = await axiosInstance.get(`/assignments/${params.class_id}`)
            if (res?.data?.success) {
                setAssignments(res?.data?.data)
            } else {
                toast({
                    description: "❌ something went wrong, please try again"
                })
            }
        } catch (error) {
            toast({
                description: "❌ something went wrong, please try again"
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAssignments()
    }, [])

    const refetchAssignments = async () => {
        await fetchAssignments()
    }

    return (
        loading ? (
            <AssignmentLoader />
        ) : (
            <div className='flex flex-col lg:flex-row mt-10 gap-8'>
                <div className="w-full lg:w-3/4 flex flex-col justify-between">
                    {isTeacher &&
                        <div className="relative w-full bg-white rounded-lg border pt-4 mb-9">
                            <div className="absolute px-2 py-1 top-0 -left-[0.5] bg-indigo-200 rounded-tl-lg rounded-br-lg">
                                <h2 className="text-sm font-semibold text-indigo-800">Assignment | Homework | Quiz</h2>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="w-full mb-2 mt-6 flex flex-col md:flex-row">
                                    <div className="w-full md:w-3/4 px-3 mb-2 mt-6">
                                        <input className="text-gray-500 text-sm font-normal placeholder:text-sm rounded-lg placeholder:font-normal border border-gray-200 leading-normal w-full px-4 p-2 placeholder-gray-400 focus:outline-none focus:bg-white" {...register("title", { required: true })} placeholder="Title*" />
                                        {errors.title && <span className="text-red-500 text-xs">This field is required</span>}
                                    </div>
                                    <div className="w-full md:w-1/4 px-3 mb-2 mt-6">
                                        <CustomSelect className='' register={register} errors={errors} setValue={setValue} clearErrors={clearErrors} />
                                    </div>
                                </div>
                                <div className="w-full px-3 mb-2 mt-6">
                                    <textarea className="text-gray-500 text-sm font-normal placeholder:text-sm placeholder:font-normal rounded-lg border border-gray-200 leading-normal w-full h-28 p-3 placeholder-gray-400 focus:outline-none focus:bg-white" {...register("description", { required: true })} placeholder="Description*" ></textarea>
                                    {errors.description && <span className="text-red-500 text-xs">This field is required</span>}
                                </div>
                                <div className="w-full px-3 mb-2 mt-6">
                                    <input className="text-gray-500 text-sm font-normal placeholder:text-sm placeholder:font-normal rounded-lg border border-gray-200 leading-normal w-full px-4 p-2 placeholder-gray-400 focus:outline-none focus:bg-white" {...register("link")} placeholder="Link ( if any )" />
                                </div>
                                <div className="w-full flex justify-end px-3 my-3">
                                    <button type='submit' className="px-4 py-2 rounded-md text-white bg-indigo-500 text-sm">Post Assignment</button>
                                </div>
                            </form>
                        </div>
                    }
                    <h1 className='text-2xl text-indigo-800 font-semibold font-mono mb-2'>Recent Feeds</h1>
                    <hr />
                    {assignments?.length !== 0 && assignments?.map((item: any, index: any) =>
                        <div key={index} className="px-4 py-4 my-5 w-full font-normal border border-zinc-200 rounded-lg">
                            <div className="flex flex-col justify-between md:flex-row">
                                <div className="flex flex-col gap-0 mb-3">
                                    <h3 className="text-base font-semibold leading-snug text-gray-600">
                                        {item.title}
                                    </h3>
                                    <p className="flex gap-2 text-xs font-normal leading-snug text-gray-600">
                                        <span className="font-light">by</span> <span className='italic'>{item?.created_by?.name}</span>
                                    </p>
                                </div>
                                <div className="flex items-center mb-2 space-x-2">
                                    <p className="px-2 text-gray-200 bg-orange-500 rounded text-sm">{item.type || "Assignment"}</p>
                                    <p className="px-2 text-gray-500 rounded text-xs">{moment(item.created_at).format('DD MM YYYY')}</p>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm">
                                {item.description}
                            </p>
                            <Link href={item.link} className="text-blue-500 text-sm mt-2">
                                {item.link}
                            </Link>
                        </div>
                    )}
                    <small className='text-gray-500 text-xs my-6 w-full text-center'>no more feeds to show</small>
                </div>


                <ClassIdCard setClassDetails={setClassDetails} />

            </div>
        )
    )
}

export default Assignments

export const CustomSelect = ({ className, register, errors, setValue, clearErrors }: { className: string, register: UseFormRegister<FieldValues>, errors: FieldErrors<FieldValues>, setValue: UseFormSetValue<FieldValues>, clearErrors: UseFormClearErrors<FieldValues> }) => {
    return (
        <>
            <Select {...register("type", { required: true })} onValueChange={(value) => {
                clearErrors("type")
                setValue("type", value)
            }}>
                <SelectTrigger className="w-full text-zinc-400">
                    <SelectValue className='text-zinc-400' placeholder="Select a type *" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Select a type</SelectLabel>
                        <SelectItem value="Assignment">Assignment</SelectItem>
                        <SelectItem value="Quiz">Quiz</SelectItem>
                        <SelectItem value="Homework">Homework</SelectItem>
                        <SelectItem value="Notice">Notice</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            {errors.type && <span className="text-red-500 text-xs">This field is required</span>}
        </>
    )
}
