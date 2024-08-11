import axiosInstance from '@/utils/api'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const JoinClassroomForm = ({ setOpen, refetch }: any) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [classIDValue, setClassIDValue] = useState("")
    const [roleValue, setRoleValue] = useState("student")
    const [idError, setIdError] = useState("")
    const [roleError, setRoleError] = useState("")

    const router = useRouter()

    const handleSubmit = async () => {
        if (classIDValue?.length === 0) {
            setIdError("please enter a classroom ID")
            return;
        } else if (roleValue?.length === 0) {
            setRoleError("please select a role")
        } else {
            setIdError("")
            setRoleError("")
        }
        const payload = {
            class_id: classIDValue,
            role: roleValue
        }
        console.log(payload)
        try {
            const res: any = await axiosInstance.post('/classroom/join', payload)
            console.log(res)
            if (res?.data?.success) {

                toast({
                    description: "✅ Joined Classroom successfully"
                })
                router.push(`/classroom/${res?.data?.data?.class_id}`)
            } else {
                toast({
                    description: "❌ Something went wrong"
                })
            }
        } catch (err) {
            toast({
                description: "❌ Something went wrong"
            })
            console.log(err)
        }
        await refetch();
    }

    const roles = [
        {
            label: "Student",
            value: "student"
        },
        {
            label: "Teacher",
            value: "teacher"
        },
    ]

    return (
        <div>

            <form className="w-96 mx-auto  flex  flex-col  px-4 pb-4" onSubmit={handleSubmit}>
                <h2 className=" title-font text-2xl font-medium text-indigo-900 border-b border-indigo-200 py-2 my-5">Join Classroom</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="text-sm leading-7 text-gray-600">Classroom ID</label>
                    <input onChange={(e) => setClassIDValue(e.target.value)} type="text" id="text" className="w-full rounded-lg border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200" name='class_id' placeholder='enter classroom id' />
                    {idError.length > 0 && <small className='text-xs text-red-600'>{idError}</small>}
                </div>
                <div className="mb-4">
                    <RadioGroupDemo datas={roles} setValue={setRoleValue} value={roleValue} />
                    {roleError.length > 0 && <small className='text-xs text-red-600'>{roleError}</small>}
                </div>

                <div className="w-full flex items-center justify-end gap-3">
                    <button onClick={() => setOpen(false)} type='button' className="rounded border border-red-500  py-1 px-6 text-md text-red-600 hover:bg-red-100 focus:outline-none">Cancel</button>
                    <button disabled={loading} onClick={handleSubmit} type='submit' className="rounded border-0 bg-indigo-500 py-1 px-6 w-44 text-md text-white hover:bg-indigo-600 focus:outline-none">
                        {loading ? (
                            <>
                                Joining <ClipLoader color='white' size={15} />
                            </>
                        ) : (
                            "Join Classroom"
                        )}
                    </button>
                </div>
            </form>

        </div>
    )
}

export default JoinClassroomForm


import { Label } from "@/components/ui/label"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from '../ui/use-toast'

export function RadioGroupDemo({ datas, value, setValue }: any) {
    return (<>
        <span className='text-sm leading-7 text-gray-600 mb-4'>Role</span>
        <RadioGroup className='flex items-center my-2' defaultValue={datas[0].value} onChange={(e: any) => setValue(e.target.value)}>
            {datas?.map((data: any, index: number) =>
                <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={data.value} id={`r${index + 1}`} />
                    <Label htmlFor="r1">{data.label}</Label>
                </div>
            )}

        </RadioGroup>
    </>
    )
}
