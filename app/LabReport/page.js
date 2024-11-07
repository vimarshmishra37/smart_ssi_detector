'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { jsPDF } from 'jspdf';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function LabReportForm() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const router = useRouter(); // Initialize the router

    const onSubmit = (data) => {
        console.log(data);
        // Optionally, you can handle form data here or call a backend API
    };

    // Function to generate PDF
    const generatePDF = () => {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(18);
        doc.text('Department of Laboratory Medicine - Microbiology', 14, 20);

        // Patient Information
        doc.setFontSize(14);
        doc.text('Patient Information', 14, 30);
        doc.text(`Name: ${document.getElementById('name').value}`, 14, 40);
        doc.text(`Age/Sex: ${document.getElementById('ageSex').value}`, 14, 50);
        doc.text(`MRN: ${document.getElementById('mrn').value}`, 14, 60);
        doc.text(`Specimen Collected On: ${document.getElementById('collectedOn').value}`, 14, 70);
        doc.text(`Specimen Completed On: ${document.getElementById('completedOn').value}`, 14, 80);

        // Test and Sample Information
        doc.setFontSize(14);
        doc.text('Test and Sample Information', 14, 100);
        doc.text(`Test Name: ${document.getElementById('testName').value}`, 14, 110);
        doc.text(`Incubation Period: ${document.getElementById('incubPeriod').value}`, 14, 120);
        doc.text(`Remarks: ${document.getElementById('remarks').value}`, 14, 130);

        // Antibiotic Susceptibility
        doc.setFontSize(14);
        doc.text('Antibiotic Susceptibility', 14, 150);
        ['Cefuroxime', 'Ceftriaxone', 'Cefazidime', 'Cefepime', 'Amoxicillin/Clavulanic acid', 'Piperacillin/Tazobactam', 'Cefoperazone/Sulbactam', 'Gentamicin', 'Amikacin', 'Netilmicin', 'Ciprofloxacin', 'Levofloxacin', 'Trimethoprim/Sulfamethoxazole'].forEach((antibiotic, index) => {
            doc.text(`${antibiotic}:`, 14, 160 + (index * 10));
            doc.text(`MIC: ${document.getElementById(`mic_${antibiotic}`).value}`, 40, 160 + (index * 10));
            doc.text(`Interpretation: ${document.getElementById(`interpretation_${antibiotic}`).value}`, 100, 160 + (index * 10));
        });

        // Comments
        doc.setFontSize(14);
        doc.text('Comments', 14, 270);
        doc.text(`Comments: ${document.getElementById('comments').value}`, 14, 280);

        // Save PDF
        doc.save('LabReport.pdf');
    };

    // Function to handle submit and navigate to the dashboard
    const handleFormSubmit = () => {
        // Redirect to dashboard page after submission
        router.push('/Dashboard'); // Adjust the path if necessary
    };

    return (
        <div className="w-3/4 mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
            <h1 className='text-4xl font-extrabold text-center'>Department of Laboratory Medicine - Microbiology</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Patient Details Table */}
                <h2 className="text-xl font-semibold mt-4">Patient Information</h2>
                <table className="w-full mt-4 border border-gray-300">
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2"><span className="font-bold">Name:</span></td>
                            <td className="border px-4 py-2"><span id="name">John Doe</span></td>
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
                            <td className="border px-4 py-2"><span className="font-bold">Specimen Collected On:</span></td>
                            <td className="border px-4 py-2"><span id="collectedOn">2024-10-01</span></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2"><span className="font-bold">Visit Type:</span></td>
                            <td className="border px-4 py-2"><span id="visitType">IP</span></td>
                            <td className="border px-4 py-2"><span className="font-bold">Specimen Recieved On:</span></td>
                            <td className="border px-4 py-2"><span id="recievedOn">2024-10-03</span></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2"><span className="font-bold">Sample No:</span></td>
                            <td className="border px-4 py-2"><span id="sampleNo">32112</span></td>
                            <td className="border px-4 py-2"><span className="font-bold">Specimen Completed On:</span></td>
                            <td className="border px-4 py-2"><span id="completedOn">2024-10-05</span></td>
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
                            <td><span id="incubPeriod">36-48 hrs</span></td>
                        </tr>
                        <tr>
                            <td className="font-bold">Remarks:</td>
                            <td><span id="remarks">Escherichia coli grown in culture. Sample type: Pus swab from Abdomen.</span></td>
                        </tr>
                    </tbody>
                </table>

                {/* Identifications Table */}
                <h2 className="text-xl font-semibold mt-4">Identifications</h2>
                <table className="w-full mt-4 border-collapse border border-gray-300">
                    <thead className="bg-gray-400">
                        <tr>
                            <th className="text-left px-4 py-2 border">S No.</th>
                            <th className="text-left px-4 py-2 border">Organism Isolated</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="w-2/12 font-medium text-left px-4 py-2 border"><span>1</span></td>
                            <td className="text-left px-4 py-2 border"><span>Escherichia coli</span></td>
                        </tr>
                    </tbody>
                </table>

                {/* Antibiotic Susceptibility Table */}
                <h2 className="text-xl font-semibold mt-4">Antibiotic Susceptibility</h2>
                <table className="w-full mt-4 table-auto border-collapse border border-gray-300">
                    <thead className="bg-gray-400">
                        <tr>
                            <th className="text-left px-4 py-2 border">Antibiotic</th>
                            <th className="text-left px-4 py-2 border">MIC</th>
                            <th className="text-left px-4 py-2 border">Interpretation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {['Cefuroxime', 'Ceftriaxone', 'Cefazidime', 'Cefepime', 'Amoxicillin/Clavulanic acid', 'Piperacillin/Tazobactam', 'Cefoperazone/Sulbactam', 'Gentamicin', 'Amikacin', 'Netilmicin', 'Ciprofloxacin', 'Levofloxacin', 'Trimethoprim/Sulfamethoxazole'].map((antibiotic, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border">{antibiotic}</td>
                                <td className="px-4 py-2 border"><span id={`mic_${antibiotic}`}>0.5</span></td>
                                <td className="px-4 py-2 border"><span id={`interpretation_${antibiotic}`}>Susceptible</span></td>
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
    );
}
