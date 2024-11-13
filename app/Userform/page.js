'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

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
        role: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
                router.push("/Patient1");
            } else {
                const errorData = await response.json();
                console.error('Error details:', errorData);
                alert(errorData.Error || 'Registration failed');
            }
            
        } catch (error) {
            console.log('Network or other error during login:', error);
            alert('An error occurred while logging in. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">User Form</h2>
            {/* Name */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            {/* Email */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            {/* Password */}
            <div className="mb-4 relative">
                <label className="block text-gray-700 font-medium mb-2">Password:</label>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 pr-10 border border-gray-300 rounded-md"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                >
                    {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 mt-8" />
                    ) : (
                        <EyeIcon className="h-5 w-5 mt-8" />
                    )}
                </button>
            </div>
            {/* Age */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Age:</label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            {/* Gender Dropdown */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Gender:</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            {/* Date of Birth */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Date of Birth:</label>
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            {/* Address */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Address:</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            {/* Phone */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Phone:</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            {/* Role Dropdown */}
            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Role:</label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="">Select Role</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Patient">Patient</option>
                </select>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">
                Submit
            </button>
        </form>
    );
};

export default UserForm;
