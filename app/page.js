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
            const response = await fetch('http://localhost:3000/login',{
               
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
        <div style={styles.container}>
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
    );
}
const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#e0f7fa',
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
  
  // Hover effect for button
  styles.button[':hover'] = {
      backgroundColor: '#004d40',
  };