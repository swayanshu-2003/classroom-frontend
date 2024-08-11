import axiosInstance from '@/utils/api'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '../ui/use-toast'
import { ClipLoader } from 'react-spinners'

const CreateClassForm = ({ refetch, setOpen, editData = {}, type }: { refetch: any; setOpen: any, editData: any, type: string }) => {
    const [loading, setLoading] = useState(false)

    const { toast } = useToast()

    const { handleSubmit, register, formState: { errors }, reset } = useForm()

    useEffect(() => {
        if (type === "edit") {
            reset(editData)
        }
    }, [editData])

    const onSubmit = async (data: any) => {
        setLoading(true)
        if (type === "edit") {
            const res: any = await axiosInstance.patch(`/classroom/edit/${editData?.class_id}`, data)
            console.log(res)
            if (res?.data) {
                toast({
                    description: "✅ Classroom updated successfully",
                    duration: 3000,
                    variant: "default",
                });
                setOpen(false)
            }
        } else {
            const res: any = await axiosInstance.post("/classroom/create", data)

            console.log(res)
            if (res?.data) {
                await refetch();
                toast({
                    description: "✅ Classroom created successfully",
                    duration: 3000,
                    variant: "default",
                });
                setOpen(false)
            }
        }
        await refetch();
        setLoading(false)
    }

    return (
        <div className=''>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-96 mx-auto  flex  flex-col  px-4 pb-4">
                    <h2 className=" title-font text-2xl font-medium text-indigo-900 border-b border-indigo-200 py-2 my-5">{type === "edit" ? "Edit Classroom" : "Create Classroom"}</h2>

                    <div className="mb-4">
                        <label htmlFor="email" className="text-sm leading-7 text-gray-600">Classroom Name</label>
                        <input type="text" id="text" className="w-full rounded-lg border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200" {...register("class_name", { required: "Classroom Name is required" })} />
                        {errors.class_name && <span className='text-red-500 text-xs'>Classroom Name is required</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="text-sm leading-7 text-gray-600">Classroom Description</label>
                        <textarea id="description" className="h-32 w-full resize-none rounded-lg border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200" {...register("description", { required: "Classroom Description is required" })}></textarea>
                        {errors.description && <span className='text-red-500 text-xs'>Classroom Description is required</span>}
                    </div>
                    <div className="w-full flex items-center justify-end gap-3">
                        <button onClick={() => setOpen(false)} disabled={loading} type='submit' className="rounded border border-red-500  py-1 px-6 text-md text-red-600 hover:bg-red-100 focus:outline-none">Cancel</button>
                        <button disabled={loading} type='submit' className="rounded border-0 bg-indigo-500 py-1 px-6 text-md text-white hover:bg-indigo-600 focus:outline-none">{loading ? <ClipLoader color='white' size={15} /> : type === "edit" ? "Edit Classroom" : "Create Classroom"}</button>
                    </div>
                </div>
            </form>



        </div>
    )
}

export default CreateClassForm