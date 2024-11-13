'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
export default function Page() {
  const searchParams = useSearchParams();
  const patientId = searchParams.get('patientID'); // Retrieve patientID from URL

  const router = useRouter();

  const [formData, setFormData] = useState({
    organism1: '',
    organism2: '',
    isolate1: [{ sensitive: '', resistant: '', intermediate: '' }],
    isolate2: [{ sensitive: '', resistant: '', intermediate: '' }],
    patientId: patientId || '', // Initialize patientId in formData
  });

  // Update formData when patientId is available
  useEffect(() => {
    if (patientId) {
      setFormData((prevData) => ({ ...prevData, patientId }));
    }
  }, [patientId]);

  // The rest of your component code follows...
  const microorganisms = [
    "E.COLI", "KLEBSIELLA PNEUMONIAE", "ENTEROCOCCUS FAECIUM",
    "ENTEROCOCCUS FAECALIS", "STAPHYLOCOCCUS HAEMOLYTICUS",
    "SKIN COMMENSAL FLORA", "PSEUDOMONAS AERUGINOSA", "STAPHYLOCOCCUS AUREUS (MRSA)",
    "STAPHYLOCOCCUS AUREUS (MSSA)", "CONS", "ACINETOBACTER BAUMANII", "CITROBACTER KOSERI",
    "CITROBACTER FREUNDII", "ENTEROBACTER CLOACAE", "ENTEROBACTER AEROGENES", "PROTEUS MIRABILIS",
    "MORGANELLA MORGANII", "Others"
  ];

  const antibiotics = [
    "Amoxicillin-clavulanic acid", "Amikacin", "Aztreonam", "Cefepime", "Ceftazidime",
    "Ceftriaxone", "Netilmicin", "Meropenem", "Imipenem", "Levofloxacin", "Norfloxacin",
    "Ciprofloxacin", "Cefoperazone/Sulbactum", "Ticarcillin/Clavulanic acid", "Piperacillin-tazobactum",
    "Ceftazidime/Avibactam", "Penicillin", "Oxacillin", "Gentamicin", "Tetracycline", "Clindamycin",
    "Vancomycin E STRIP", "Linezolid", "Teicoplanin", "Nitrofurantoin", "Erythromycin", "Cefoxitin",
    "Co-trimoxazole", "Ertapenem", "Chloramphenicol", "Fosfomycin", "Colistin E STRIP"
];


  const handleChange = (e, index, isolate) => {
    const { name, value } = e.target;
    const newIsolate = [...formData[isolate]];
    newIsolate[index][name] = value;
    setFormData({
      ...formData,
      [isolate]: newIsolate,
    });
  };

  const addRow = (isolate) => {
    setFormData({
      ...formData,
      [isolate]: [...formData[isolate], { sensitive: '', resistant: '', intermediate: '' }],
    });
  };

  const removeRow = (isolate, index) => {
    console.log('Patient_id', patientId);
    const newIsolate = formData[isolate].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [isolate]: newIsolate,
    });
  };

  /*const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/antibiotic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Form data submitted successfully');
        router.push("/Patient3"); // Redirect after successful submission
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    router.push("/Patient3"); 
  };
  

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="w-3/4 mx-auto bg-gray-100 p-6 rounded-lg shadow-md">

      <h1 className="text-2xl font-bold mb-4">Antibiotic Susceptibility Form</h1>

      <form onSubmit={handleSubmit}>
        {/* Micro-organisms Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Micro-organisms:</h2>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="organism1" className="block text-gray-700 mb-2">Organism 1</label>
              <select
                id="organism1"
                name="organism1"
                value={formData.organism1}
                onChange={(e) => setFormData({ ...formData, organism1: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select an organism</option>
                {microorganisms.map((microorganism, index) => (
                  <option key={index} value={microorganism}>
                    {microorganism}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="organism2" className="block text-gray-700 mb-2">Organism 2</label>
              <select
                id="organism2"
                name="organism2"
                value={formData.organism2}
                onChange={(e) => setFormData({ ...formData, organism2: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select an organism</option>
                {microorganisms.map((microorganism, index) => (
                  <option key={index} value={microorganism}>
                    {microorganism}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Antibiotic Susceptibility Table for Isolate 1 */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Isolate 1 (Antibiotic Susceptibility Pattern)</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Sensitive</th>
                <th className="border border-gray-300 p-2">Resistant</th>
                <th className="border border-gray-300 p-2">Intermediate</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.isolate1.map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    <select
                      name="sensitive"
                      value={row.sensitive}
                      onChange={(e) => handleChange(e, index, 'isolate1')}
                      className="w-full border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Select Antibiotic</option>
                      {antibiotics.map((antibiotic) => (
                        <option key={antibiotic} value={antibiotic}>
                          {antibiotic}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select
                      name="resistant"
                      value={row.resistant}
                      onChange={(e) => handleChange(e, index, 'isolate1')}
                      className="w-full border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Select Antibiotic</option>
                      {antibiotics.map((antibiotic) => (
                        <option key={antibiotic} value={antibiotic}>
                          {antibiotic}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select
                      name="intermediate"
                      value={row.intermediate}
                      onChange={(e) => handleChange(e, index, 'isolate1')}
                      className="w-full border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Select Antibiotic</option>
                      {antibiotics.map((antibiotic) => (
                        <option key={antibiotic} value={antibiotic}>
                          {antibiotic}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => removeRow('isolate1', index)}
                      type="button"
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => addRow('isolate1')}
            type="button"
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add Row for Isolate 1
          </button>
        </div>

        {/* Antibiotic Susceptibility Table for Isolate 2 */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Isolate 2 (Antibiotic Susceptibility Pattern)</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Sensitive</th>
                <th className="border border-gray-300 p-2">Resistant</th>
                <th className="border border-gray-300 p-2">Intermediate</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.isolate2.map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    <select
                      name="sensitive"
                      value={row.sensitive}
                      onChange={(e) => handleChange(e, index, 'isolate2')}
                      className="w-full border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Select Antibiotic</option>
                      {antibiotics.map((antibiotic) => (
                        <option key={antibiotic} value={antibiotic}>
                          {antibiotic}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select
                      name="resistant"
                      value={row.resistant}
                      onChange={(e) => handleChange(e, index, 'isolate2')}
                      className="w-full border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Select Antibiotic</option>
                      {antibiotics.map((antibiotic) => (
                        <option key={antibiotic} value={antibiotic}>
                          {antibiotic}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select
                      name="intermediate"
                      value={row.intermediate}
                      onChange={(e) => handleChange(e, index, 'isolate2')}
                      className="w-full border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Select Antibiotic</option>
                      {antibiotics.map((antibiotic) => (
                        <option key={antibiotic} value={antibiotic}>
                          {antibiotic}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => removeRow('isolate2', index)}
                      type="button"
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => addRow('isolate2')}
            type="button"
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add Row for Isolate  2
          </button>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">Next</button>
        </div>
      </form>
    </div>
    </Suspense>
  );
}
