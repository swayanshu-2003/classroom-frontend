import React from 'react';
import { MoonLoader } from 'react-spinners';

const Loader = ({ loading }: { loading: boolean }) => {
    return (

        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90 z-50">
            <div className="p-5 bg-transparent">
                < MoonLoader color="white" size={60} />
            </div>
        </div>

    );
};

export default Loader;
