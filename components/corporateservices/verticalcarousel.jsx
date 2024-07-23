// VerticalImagePage.jsx
import React from 'react';

const VerticalImagePage = () => {
    const images = [
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h1 className='text-4xl font-bold text-yellow-500 mb-10'>All Corporate Services</h1>
            <div className="w-full max-w-6xl space-y-10">
                {images.map((img, index) => (
                    <div key={index} className="relative w-full h-[500px]">
                        <img src={img} alt={`Image ${index}`} className="w-full h-full object-cover opacity-70" />

                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black bg-opacity-30">
                            <div className="absolute top-0 right-0 bg-red-500 text-center text-white px-4 py-2 m-2 w-1/6 rounded-md z-10 font-semibold">
                                10% off
                            </div>
                            <div className="relative w-full max-w-xl p-6 bg-opacity-50 bg-white rounded-lg shadow-lg">
                                <form className="flex flex-col gap-4 opacity-100">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="p-2 border border-gray-300 rounded"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        className="p-2 border border-gray-300 rounded"
                                    />
                                    <textarea
                                        placeholder="Details"
                                        className="p-2 border border-gray-300 rounded"
                                        rows="4"
                                    />
                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            className="w-1/2 p-2 bg-black hover:bg-yellow-500 transition-all text-white rounded"
                                        >
                                            Submit
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerticalImagePage;
