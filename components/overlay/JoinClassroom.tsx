import React from 'react'
import { FaPencilAlt, FaPlus } from 'react-icons/fa'

const JoinClassroom = ({
    setOpen
}: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <button onClick={() => setOpen(true)}
            className="cursor-pointer flex items-center fixed bottom-16 right-5 px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none z-50"

        >
            <span className='text-sm'>Join Classroom</span>
            <span className='ml-2'><FaPencilAlt />
            </span>
        </button>
    )
}

export default JoinClassroom