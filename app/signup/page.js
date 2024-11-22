'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const styles = {
    container: "min-h-screen bg-teal-50 py-8",
    formWrapper: "max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg border border-teal-200",
    heading: "text-2xl font-bold mb-8 text-teal-800 text-center",
    inputGroup: "mb-6",
    label: "block text-teal-700 font-medium mb-2",
    input: "w-full p-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent",
    select: "w-full p-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white",
    button: "w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition duration-200 font-medium",
    otpButton: "mt-2 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition duration-200",
    otpMessage: "text-sm mt-2",
    otpSuccessMessage: "text-green-600",
    otpErrorMessage: "text-red-600",
    passwordWrapper: "relative",
    eyeIcon: "absolute right-3 top-[65%] transform -translate-y-1/2 text-teal-600 cursor-pointer"
};

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        gender: '',
        dob: '',
        address: '',
        phone: '',
        role: '',
    });

    const [otpSent, setOtpSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [otpMessage, setOtpMessage] = useState('');
    const [otp, setOtp] = useState('');
    const [sentOtp, setSentOtp] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const sendOtp = async () => {
        if (!formData.email) {
            setOtpMessage('Please enter an email to receive OTP.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
            });

            if (response.ok) {
                const data = await response.json();
                setOtpSent(true);
                setOtpMessage('OTP sent successfully. Please check your email.');
                setSentOtp(data.otp);
                console.log('OTP sent successfully:', data);
            } else {
                const errorData = await response.json();
                setOtpMessage(errorData.Error || 'Failed to send OTP.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            setOtpMessage('An error occurred while sending the OTP.');
        }
    };

    const validateForm = () => {
        const { name, email, password, age, gender, dob, address, phone, role } = formData;
        if (!name) return 'Name is required';
        if (!email) return 'Email is required';
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) return 'Email is invalid';
        if (!password) return 'Password is required';
        if (password.length < 6) return 'Password must be at least 6 characters';
        if (!age) return 'Age is required';
        if (isNaN(age) || age <= 0) return 'Age must be a positive number';
        if (!gender) return 'Gender is required';
        if (!dob) return 'Date of birth is required';
        if (!address) return 'Address is required';
        if (!phone) return 'Phone number is required';
        if (!/^\d{10}$/.test(phone)) return 'Phone number must be 10 digits';
        if (!role) return 'Role is required';
        if (parseInt(otp) !== parseInt(sentOtp)) return 'OTP does not match';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            alert(validationError);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                router.push('/Patient1');
            } else {
                const errorData = await response.json();
                console.error('Error details:', errorData);
                alert(errorData.Error || 'Registration failed');
            }
        } catch (error) {
            console.error('Network or other error during registration:', error);
            alert('An error occurred while registering. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.formWrapper}>
                <h2 className={styles.heading}>Healthcare Registration</h2>
                
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    <button
                        type="button"
                        onClick={sendOtp}
                        className={styles.otpButton}
                    >
                        Get OTP
                    </button>
                    {otpMessage && (
                        <p className={`${styles.otpMessage} ${otpSent ? styles.otpSuccessMessage : styles.otpErrorMessage}`}>
                            {otpMessage}
                        </p>
                    )}
                </div>

                {otpSent && (
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Enter OTP:</label>
                        <input
                            type="text"
                            name="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                )}

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Password:</label>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.eyeIcon}
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Gender:</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Date of Birth:</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Role:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="">Select Role</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Nurse">Nurse</option>
                    </select>
                </div>

                <button type="submit" className={styles.button}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default UserForm;