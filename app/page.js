'use client';
import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
    });

    const router = useRouter(); // Initialize the router

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/login', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.userId,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                router.push("/Dashboard"); // Redirect on success
            } else {
                console.log('Login failed');
                const errorData = await response.json();
                console.error('Login failed:', errorData);
                alert(errorData.Error || 'Login failed');
            }
        } catch (error) {
            console.log('Network or other error during login:', error);
            alert('An error occurred while logging in. Please try again.');
        }
    };

    return (
        <div className="bg-gradient-to-t from-cyan-600 via-cyan-500 to-teal-400 text-teal-800 flex justify-center items-center" style={{ height: '100vh', width: '100vw' }}>
            <div className="bg-teal-100 flex items-center overflow-hidden px-10 py-10 relative shadow-2xl rounded-md" style={{ height: '80vh', width: '70vw' }}>

                <div style={styles.container} className="w-1/2 z-30">
                    <form method="POST" action="https://localhost:3000/login" onSubmit={handleSubmit} style={styles.form}>
                        <h2 style={styles.title}>Login</h2>
                        <div style={styles.inputGroup}>
                            <label style={styles.label} htmlFor="userId">User ID or Gmail</label>
                            <input
                                type="text"
                                id="userId"
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label} htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        <div className="flex flex-col gap-5">
                            <button type="submit" style={styles.button}>Login</button>
                            <Link href="/Userform">
                                <span className="underline text-blue-700 cursor-pointer">New User? Sign Up</span>
                            </Link>
                        </div>
                    </form>
                    <br />
                </div>
                <div>
                    <div className="w-100 z-10 fixed top-40">
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small_2x/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg" alt="doc" style={{ clipPath: 'polygon(50% 0%, 80% 25%, 80% 75%, 50% 100%, 20% 75%, 20% 25%)' }} />
                        <div className="w-52 h-16 bg-white rounded-lg flex items-center p-1 fixed bottom-52 cursor-pointer">
                            <div className="rounded-full bg-teal-600 p-2.5 w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-camera-video-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2z" />
                                </svg>
                            </div>
                            <div className="flex flex-col ml-2">
                                <a href="URL_TO_CONNECT_WITH_DOCTOR" className="text-black text-sm">Connect with a Doctor</a>
                                <span className="text-xs">Redirects to a contact</span>
                            </div>

                        </div>
                    </div>
                    <div className="bg-gradient-to-l from-teal-200 to-teal-100 w-1/2 -rotate-45 absolute left-0" style={{ height: '55vh', width: '75vw' }}></div>
                    <div className="bg-gradient-to-l from-teal-300 to-teal-200 w-1/2 -rotate-45 absolute left-12" style={{ height: '55vh', width: '75vw' }}></div>
                    <div className="bg-gradient-to-l from-teal-400 to-teal-300 w-1/2 -rotate-45 absolute left-24" style={{ height: '55vh', width: '75vw' }}></div>
                    <div className="bg-gradient-to-l from-teal-500 to-teal-400 w-1/2 -rotate-45 absolute left-36" style={{ height: '55vh', width: '75vw' }}></div>
                    <div className="bg-gradient-to-l from-teal-600 to-teal-500 w-1/2 -rotate-45 absolute left-48" style={{ height: '55vh', width: '75vw' }}></div>
                    <div className="bg-teal-600 w-1/2 -rotate-45 absolute left-60" style={{ height: '55vh', width: '75vw' }}></div>
                    <div className="bg-teal-600 w-1/2 -rotate-45 absolute left-72" style={{ height: '55vh', width: '75vw' }}></div>
                    <div className="bg-teal-600 w-1/2 -rotate-45 absolute left-80" style={{ height: '55vh', width: '75vw' }}></div>
                </div>
            </div>
        </div>
    );
}
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    form: {
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 6px 12px rgba(0, 128, 128, 0.2)',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        marginBottom: '25px',
        fontSize: '26px',
        color: '#004d40',
        textAlign: 'center',
        fontWeight: 'bold',
        borderBottom: '2px solid #004d40',
        paddingBottom: '10px',
    },
    inputGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '16px',
        color: '#00796b',
    },
    input: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #00796b',
        backgroundColor: '#e0f2f1',
    },
    button: {
        width: '100%',
        padding: '12px',
        fontSize: '18px',
        color: 'white',
        backgroundColor: '#00796b',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    },
};

styles.button[':hover'] = {
    backgroundColor: '#004d40',
};