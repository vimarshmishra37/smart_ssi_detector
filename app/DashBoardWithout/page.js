'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();

    const handleNewPatient = () => {
        router.push('/Patient1');
    };

    const handleDailyUpdates = () => {
        router.push('/Daily');
    };

    // Navbar navigation functions
    const navigateToHome = () => {
        router.push('/');
    };

    const handleMakeAppointment = () => {
        router.push('/appointment'); // Replace '/appointment' with the desired route
    };

    const handleAboutUs = () => {
        router.push('/about'); // Replace '/about' with the desired route
    };

    return (
        <div className='relative  w-screen h-screen' style={{ overflow: 'hidden' }}>
            <nav className="px-16 py-5">
                <div className="flex justify-between items-center">
                    <div onClick={navigateToHome} className="text-xl font-bold cursor-pointer">Logo</div>
                    <div className="flex">
                        <div onClick={navigateToHome} className="px-4 py-2 cursor-pointer hover:text-white hover:bg-teal-500 rounded-3xl">Home</div>
                        <div onClick={handleNewPatient} className="px-4 py-2 cursor-pointer hover:text-white hover:bg-teal-500 rounded-3xl">New Patient</div>
                        <div onClick={handleDailyUpdates} className="px-4 py-2 cursor-pointer hover:text-white hover:bg-teal-500 rounded-3xl">Daily Updates</div>
                    </div>
                </div>
            </nav>


            <div className='flex justify-center items-center bg-cyan-600' style={{ height: '77%' }}>
                <div style={{ height: '100%', width: '65%', overflow: 'hidden' }}>
                    <video width="100%" height="100%" muted autoPlay loop className='opacity-35 '>
                        <source src="docvideo.mp4" type="video/mp4" />
                    </video>
                </div>

                <div className='bg-cyan-800 flex' style={{ height: '100%', width: '35%' }}>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='text-white text-5xl font-bold h-28 flex flex-col cursor-pointer'>
                            <div className='flex justify-end'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-hospital" viewBox="0 0 16 16">
                                    <path d="M8.5 5.034v1.1l.953-.55.5.867L9 7l.953.55-.5.866-.953-.55v1.1h-1v-1.1l-.953.55-.5-.866L7 7l-.953-.55.5-.866.953.55v-1.1zM13.25 9a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25zM13 11.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm.25 1.75a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25zm-11-4a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 3 9.75v-.5A.25.25 0 0 0 2.75 9zm0 2a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25zM2 13.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25z" />
                                    <path d="M5 1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1 1 1v4h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3V3a1 1 0 0 1 1-1zm2 14h2v-3H7zm3 0h1V3H5v12h1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1zm0-14H6v1h4zm2 7v7h3V8zm-8 7V8H1v7z" />
                                </svg>&nbsp;We Make
                            </div>
                            <div className='flex'>
                                <div>Quality&nbsp;</div>
                                <div className='text-teal-500'>Healthcare</div>
                            </div>
                        </div>
                        <div className='flex justify-end w-full cursor-pointer'>
                            <span className='text-white text-opacity-65 cursor-pointer'>Same Day Emergency Appointments!</span>
                        </div>
                        <div className="text-white flex justify-end w-full gap-4 py-7">
                            <div onClick={handleMakeAppointment} className="border w-40 h-8 text-xs flex items-center justify-center cursor-pointer transform transition-transform duration-200 hover:scale-110">MAKE AN APPOINTMENT</div>
                            <div onClick={handleAboutUs} className="bg-teal-500 flex items-center justify-center w-40 h-8 text-xs cursor-pointer transform transition-transform duration-200 hover:scale-110">ABOUT US</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center w-full relative " style={{ height: '23%' }}>
                <div className=" flex items-end shadow-2xl text-teal-800" style={{ width: '60%', boxShadow: '0 4px 6px rgb(20 184 166)' }}>
                    <div className="bg-teal-100 border border-teal-500 h-52 w-1/5 group hover:w-[25%] hover:h-56 transition-all duration-300 cursor-pointer">
                        <div className='flex justify-center mt-5 mb-5'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-lungs-fill text-teal-500" viewBox="0 0 16 16">
                                <path d="M8 1a.5.5 0 0 1 .5.5v5.243L9 7.1V4.72C9 3.77 9.77 3 10.72 3c.524 0 1.023.27 1.443.592.431.332.847.773 1.216 1.229.736.908 1.347 1.946 1.58 2.48.176.405.393 1.16.556 2.011.165.857.283 1.857.24 2.759-.04.867-.232 1.79-.837 2.33-.67.6-1.622.556-2.741-.004l-1.795-.897A2.5 2.5 0 0 1 9 11.264V8.329l-1-.715-1 .715V7.214c-.1 0-.202.03-.29.093l-2.5 1.786a.5.5 0 1 0 .58.814L7 8.329v2.935A2.5 2.5 0 0 1 5.618 13.5l-1.795.897c-1.12.56-2.07.603-2.741.004-.605-.54-.798-1.463-.838-2.33-.042-.902.076-1.902.24-2.759.164-.852.38-1.606.558-2.012.232-.533.843-1.571 1.579-2.479.37-.456.785-.897 1.216-1.229C4.257 3.27 4.756 3 5.28 3 6.23 3 7 3.77 7 4.72V7.1l.5-.357V1.5A.5.5 0 0 1 8 1m3.21 8.907a.5.5 0 1 0 .58-.814l-2.5-1.786A.5.5 0 0 0 9 7.214V8.33z" />
                            </svg>
                        </div>
                        <div className='flex justify-center text-lg text-bold'>Surgery</div>
                    </div>
                    <div className="bg-teal-100 border border-teal-500 h-52 w-1/5 group hover:w-[25%] hover:h-56 transition-all duration-300 cursor-pointer">
                        <div className='flex justify-center mt-5 mb-5'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-prescription2 text-teal-500" viewBox="0 0 16 16">
                                <path d="M7 6h2v2h2v2H9v2H7v-2H5V8h2z" />
                                <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v10.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 14.5V4a1 1 0 0 1-1-1zm2 3v10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V4zM3 3h10V1H3z" />
                            </svg>
                        </div>
                        <div className='flex justify-center text-lg text-bold'>Pharmacy</div>
                    </div>
                    <div className="bg-teal-100 border border-teal-500 h-52 w-1/5 group hover:w-[25%] hover:h-56 transition-all duration-300 cursor-pointer">
                        <div className='flex justify-center mt-5 mb-5'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-person-badge-fill text-teal-500" viewBox="0 0 16 16">
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6m5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1z" />
                            </svg>
                        </div>
                        <div className='flex justify-center text-lg text-bold'>Patient</div>
                    </div>
                    <div className="bg-teal-100 border border-teal-500 h-52 w-1/5 group hover:w-[25%] hover:h-56 transition-all duration-300 cursor-pointer">
                        <div className='flex justify-center mt-5 mb-5'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-capsule text-teal-500" viewBox="0 0 16 16">
                                <path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429z" />
                            </svg>
                        </div>
                        <div className='flex justify-center text-lg text-bold'>Labs</div>
                    </div>
                    <div className="bg-teal-100 border border-teal-500 h-52 w-1/5 group hover:w-[25%] hover:h-56 transition-all duration-300 cursor-pointer">
                        <div className='flex justify-center mt-5 mb-5'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-minecart text-teal-500" viewBox="0 0 16 16">
                                <path d="M4 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2m0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4m8-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2m0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4M.115 3.18A.5.5 0 0 1 .5 3h15a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 14 12H2a.5.5 0 0 1-.491-.408l-1.5-8a.5.5 0 0 1 .106-.411zm.987.82 1.313 7h11.17l1.313-7z" />
                            </svg>
                        </div>
                        <div className='flex justify-center text-lg text-bold'>Ambulance</div>
                    </div>
                </div>
            </div>

        </div>
    );
}
