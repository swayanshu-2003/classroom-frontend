"use client"

import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const CreateClassButton = ({
    setOpen
}: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {



    return (



        <button onClick={() => setOpen(true)}
            className="cursor-pointer flex items-center fixed bottom-5 right-5 px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none z-50"

        >
            <span className='text-sm'>Create Classroom</span>
            <span className='ml-2'><FaPlus /></span>
        </button>

    );
};

export default CreateClassButton;
