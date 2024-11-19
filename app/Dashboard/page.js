'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const styles = {
    container: "min-h-screen bg-teal-50 flex flex-col items-center justify-center",
    wrapper: "max-w-4xl w-full px-4",
    heading: "text-3xl font-bold text-teal-800 text-center mb-12",
    buttonContainer: "flex flex-col sm:flex-row gap-6 justify-center items-center",
    button: "w-full sm:w-64 px-6 py-4 text-lg font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors duration-200 shadow-md hover:shadow-lg"
};

export default function Dashboard() {
    const router = useRouter();

    const handleNewPatient = () => {
        router.push('/Patient1');
    };

    const handleDailyUpdates = () => {
        router.push('/Daily');
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.heading}>Healthcare Dashboard</h1>
                
                <div className={styles.buttonContainer}>
                    <button 
                        onClick={handleNewPatient}
                        className={styles.button}
                    >
                        New Patient Registration
                    </button>
                    <button 
                        onClick={handleDailyUpdates}
                        className={styles.button}
                    >
                        Daily Updates
                    </button>
                </div>
            </div>
        </div>
    );
}