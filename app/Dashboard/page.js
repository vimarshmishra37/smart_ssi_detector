'use client';
import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

export default function Dashboard() {
  const router = useRouter();

  const handleNewPatient = () => {
    // Navigate to the new patient form/page (you can change the route as needed)
    router.push('/Patient1');
  };

  const handleDailyUpdates = () => {
    // Navigate to the daily updates page (you can change the route as needed)
    router.push('/Daily');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Dashboard</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleNewPatient}>
          New Patient
        </button>
        <button style={styles.button} onClick={handleDailyUpdates}>
          Daily Updates
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px', // Space between buttons
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: 'white',
    transition: 'background-color 0.3s',
  },
};

// Add a hover effect for better UX
const buttonHoverStyle = {
  backgroundColor: '#0056b3', // Darker shade for hover
};

// Style the button for hover effect
const styleWithHover = {
  ...styles.button,
  ':hover': buttonHoverStyle,
};
