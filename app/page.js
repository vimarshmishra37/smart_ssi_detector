'use client';
import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';  // Import the router hook
import Patient from "./Patient/page";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('User ID/Gmail:', formData.userId);
    console.log('Password:', formData.password);

    // After successful login, redirect to UserForm
    router.push("/Patient");
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form} method="GET">
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
          <Link href="/UserForm">
            <span className="underline text-blue-700 cursor-pointer">New User? Sign Up</span>
          </Link>
        </div>
      </form>
      <br/>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  form: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
