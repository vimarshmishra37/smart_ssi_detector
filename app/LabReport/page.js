'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { jsPDF } from 'jspdf';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function LabReportForm() {
    const searchParams = useSearchParams();
    const patientId = searchParams.get('patientID');
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [incubPeriod, setIncubPeriod] = useState('');
    useEffect(() => {
        if (patientId) {
            axios.get(`http://localhost:3000/user/${patientId}`)
                .then((response) => {
                    console.log(response);
                    const data = response.data.patient;
                    console.log(data);
                    if (data) {
                        document.getElementById('name').innerText = data.name || 'dds';
                        document.getElementById('ageSex').innerText = `${data.age}/${data.gender}` || '';
                        document.getElementById('mrn').innerText = data._id || '';
                        document.getElementById('collectedOn').innerText = new Date(data.admission_date).toISOString().split("T")[0];
                        document.getElementById('completedOn').innerText = new Date(data.discharge_date).toISOString().split("T")[0];
                        document.getElementById('dept').innerText = data.admittingDepartment || 'G1 & Hepato-Pancreatico-Biliary Surgery';
                        document.getElementById('docname').innerText = data.surgeon || 'Dr Smith Mathew';
                        document.getElementById('visitType').innerText = data.visitType || 'IP';
                        document.getElementById('sampleNo').innerText = data.patient_id || '';
                        document.getElementById('testName').innerText = data.procedure_name || '';
                        document.getElementById('comments').innerText = data.comments || '';
                        document.getElementById('diabietic').innerText = data.diabietic || '';
                        console.log(response.data.prediction);
                        document.getElementById('type').innerText = response.data.prediction.prediction;

                        if (data?.times?.induction && data?.times?.surgeryEnd) {
                            const inductionTime = data.times.induction.trim();
                            const surgeryEndTime = data.times.surgeryEnd.trim();

                            try {
                                const inductionDate = new Date(`1970-01-01T${inductionTime}:00`);
                                const surgeryEndDate = new Date(`1970-01-01T${surgeryEndTime}:00`);

                                if (isNaN(inductionDate) || isNaN(surgeryEndDate)) {
                                    console.error("Invalid date format:", inductionTime, surgeryEndTime);
                                    return;
                                }

                                const diffInMs = surgeryEndDate - inductionDate;
                                const adjustedDiffInMs = diffInMs >= 0 ? diffInMs : diffInMs + 24 * 60 * 60 * 1000;
                                const diffInHours = adjustedDiffInMs / (1000 * 60 * 60);

                                setIncubPeriod(`${Math.round(diffInHours)} hrs`);
                            } catch (error) {
                                console.error("Error in calculation:", error);
                            }
                        } else {
                            console.error("Missing or invalid times:", data?.times);
                        }

                    }
                })
                .catch((error) => {
                    console.error('Error fetching patient data:', error);
                });
        }
    }, [patientId, setValue]);



    const onSubmit = (data) => {
        console.log('Form submitted with:', data);
    };

    const generatePDF = () => {
        const doc = new jsPDF();

        // Generate the PDF content
        doc.setFontSize(18);
        doc.text('Department of Laboratory Medicine - Microbiology', 14, 20);

        doc.setFontSize(14);
        doc.text('Patient Information', 14, 30);
        doc.text(`Name: ${document.getElementById('name').innerText}`, 14, 40);
        doc.text(`Age/Sex: ${document.getElementById('ageSex').innerText}`, 14, 50);
        doc.text(`MRN: ${document.getElementById('mrn').innerText}`, 14, 60);

        // Add other PDF sections as required
        doc.save('LabReport.pdf');
    };

    const handleFormSubmit = () => {
        router.push('/Dashboard'); // Adjust route as necessary
    };

    return (
        <div className='bg-teal-100 text-teal-800'>
            <div className="w-3/4 mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
                <h1 className='text-4xl font-extrabold text-center'>Department of Laboratory Medicine - Microbiology</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Patient Details Table */}
                    <h2 className="text-xl font-semibold mt-4">Patient Information</h2>
                    <table className="w-full mt-4 border border-gray-300">
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2"><span className="font-bold">Name:</span></td>
                                <td className="border px-4 py-2"><span id="name"></span></td>
                                <td className="border px-4 py-2"><span className="font-bold">Department:</span></td>
                                <td className="border px-4 py-2"><span id="dept">G1 & Hepato-Pancreatico-Biliary Surgery</span></td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2"><span className="font-bold">Age/Sex:</span></td>
                                <td className="border px-4 py-2"><span id="ageSex">25/M</span></td>
                                <td className="border px-4 py-2"><span className="font-bold">Consulting Doctor:</span></td>
                                <td className="border px-4 py-2"><span id="docname">Dr Smith Mathew</span></td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2"><span className="font-bold">MRN:</span></td>
                                <td className="border px-4 py-2"><span id="mrn">123456789</span></td>
                                <td className="border px-4 py-2"><span className="font-bold">Diabetic:</span></td>
                                <td className="border px-4 py-2"><span id="diabietic">Yes</span></td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2"><span className="font-bold">Visit Type:</span></td>
                                <td className="border px-4 py-2"><span id="visitType">IP</span></td>
                                <td className="border px-4 py-2"><span className="font-bold">Specimen Collected On:</span></td>
                                <td className="border px-4 py-2"><span id="collectedOn">---</span></td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2"><span className="font-bold">Sample No:</span></td>
                                <td className="border px-4 py-2"><span id="sampleNo">32112</span></td>
                                <td className="border px-4 py-2"><span className="font-bold">Specimen Completed On:</span></td>
                                <td className="border px-4 py-2"><span id="completedOn">---</span></td>
                            </tr>
                        </tbody>
                    </table>


                    {/* Test and Sample Information Table */}
                    <h2 className="text-xl font-semibold mt-4">Test and Sample Information</h2>
                    <table className="w-full mt-4">
                        <tbody>
                            <tr>
                                <td className="font-bold">Test Name:</td>
                                <td><span id="testName">AEROBIC C & S</span></td>
                            </tr>
                            <tr>
                                <td className="font-bold">Incubation Period:</td>
                                <td><span id="incubPeriod">{incubPeriod || 'N/A'}</span></td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Identifications Table */}
                    <h2 className="text-xl font-semibold mt-4">Possible Identifications</h2>
                    <table className="w-full mt-4 border-collapse border border-gray-300">
                        <thead className="bg-gray-400">
                            <tr>
                                <th className="text-left px-4 py-2 border">S No.</th>
                                <th className="text-left px-4 py-2 border">Infection Details</th>
                                <th className="text-left px-4 py-2 border">Additional Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="w-2/12 font-medium text-left px-4 py-2 border">
                                    <span>1 (Random Forest)</span>
                                </td>
                                <td className="text-left px-4 py-2 border">
                                    <span>Surgical Site Infection</span>
                                </td>
                                <td className="text-left px-4 py-2 border">
                                    <span id='type'>---</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="w-2/12 font-medium text-left px-4 py-2 border">
                                    <span>2 (XGBoost)</span>
                                </td>
                                <td className="text-left px-4 py-2 border">
                                    <span>Surgical Site Infection</span>
                                </td>
                                <td className="text-left px-4 py-2 border">
                                    <span>---</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>



                    {/* Antibiotic Susceptibility Table */}
                    <h2 className="text-xl font-semibold mt-4">Antibiotic Susceptibility</h2>
                    <table className="w-full mt-4 table-auto border-collapse border border-gray-300">
                        <thead className="bg-gray-400">
                            <tr>
                                <th className="text-left px-4 py-2 border">Antibiotic</th>

                                <th className="text-left px-4 py-2 border">Interpretation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {['Gentamicin', 'Amikacin', 'Netilmicin', 'Ciprofloxacin', 'Levofloxacin', 'Trimethoprim/Sulfamethoxazole'].map((antibiotic, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border">{antibiotic}</td>
                                    <td className="px-4 py-2 border">
                                        <span id={`interpretation_${antibiotic}`}>
                                            {['Sensitive', 'Resistant', 'Intermediate', 'Sensitive', 'Resistant', 'Intermediate'][index]}
                                        </span>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                    {/* Comments Section */}
                    <h2 className="text-xl font-semibold mt-4">Comments</h2>
                    <textarea
                        id="comments"
                        rows="4"
                        className="w-full p-2 mt-2 border rounded-md"
                        placeholder="Enter comments here"
                    ></textarea>

                    {/* Buttons */}
                    <div className="mt-6">
                        <button
                            onClick={generatePDF}
                            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                        >
                            Generate PDF
                        </button>
                        <button
                            type="button"
                            onClick={handleFormSubmit}
                            className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}