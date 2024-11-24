'use client';
import React, { useState, useEffect, Suspense } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';


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
    const newIsolate = formData[isolate].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [isolate]: newIsolate,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/antibiotic', {
        method: 'POST', // or 'PUT' if updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data submitted successfully:", data);
        router.push(`/Patient3?patientID=${patientId}`);
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const styles = {
    container: 'my-8 max-w-4xl mx-auto bg-white p-8 rounded-md shadow-2xl border border-teal-400/50',
    header: 'text-2xl font-bold text-center text-[#2C7A7B] mb-8 uppercase tracking-wide',
    formSection: 'mb-6',
    label: 'block text-sm font-semibold text-teal-400 mb-2 tracking-wider',
    select: 'w-full px-4 py-2 border border-teal-400/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C7A7B]',
    table: 'min-w-full border-translate rounded-lg overflow-hidden',
    tableHeader: ' text-teal-700 px-4 py-2 text-left font-semibold',
    tableCell: 'p-2',
    addButton: 'mt-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-300',
    deleteButton: 'bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition duration-300',
    submitButton: 'w-full bg-[#2C7A7B] text-white font-semibold py-3 rounded-lg hover:bg-[#276e6f] transition duration-300'
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className={styles.container}>

      <h1 className={styles.header}>Antibiotic Susceptibility Form</h1>

      <form onSubmit={handleSubmit} method='POST' action='http://localhost:3001/antibiotic' >
        {/* Micro-organisms Section */}
        <div className={styles.formSection}>
          <h2 className={styles.label}>Micro-organisms:</h2>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="organism1" className={styles.label}>Organism 1</label>
              <select
                id="organism1"
                name="organism1"
                value={formData.organism1}
                onChange={(e) => setFormData({ ...formData, organism1: e.target.value })}
                className={styles.select}
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
              <label htmlFor="organism2" className={styles.label}>Organism 2</label>
              <select
                id="organism2"
                name="organism2"
                value={formData.organism2}
                onChange={(e) => setFormData({ ...formData, organism2: e.target.value })}
                className={styles.select}
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
          <h2 className={styles.label}>Isolate 1 (Antibiotic Susceptibility Pattern)</h2>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th className={styles.tableCell}>Sensitive</th>
                <th className={styles.tableCell}>Resistant</th>
                <th className={styles.tableCell}>Intermediate</th>
                <th className={styles.tableCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.isolate1.map((row, index) => (
                <tr key={index}>
                  <td className={styles.tableCell}>
                    <select
                      name="sensitive"
                      value={row.sensitive}
                      onChange={(e) => handleChange(e, index, 'isolate1')}
                      className={styles.select}
                    >
                      <option value="">Select Antibiotic</option>
                      {antibiotics.map((antibiotic) => (
                        <option key={antibiotic} value={antibiotic}>
                          {antibiotic}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className={styles.tableCell}>
                    <select
                      name="resistant"
                      value={row.resistant}
                      onChange={(e) => handleChange(e, index, 'isolate1')}
                      className={styles.select}
                    >
                      <option value="">Select Antibiotic</option>
                      {antibiotics.map((antibiotic) => (
                        <option key={antibiotic} value={antibiotic}>
                          {antibiotic}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className={styles.tableCell}>
                    <select
                      name="intermediate"
                      value={row.intermediate}
                      onChange={(e) => handleChange(e, index, 'isolate1')}
                      className={styles.select}
                    >
                      <option value="">Select Antibiotic</option>
                      {antibiotics.map((antibiotic) => (
                        <option key={antibiotic} value={antibiotic}>
                          {antibiotic}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className={styles.tableCell}>
                    <button
                      onClick={() => removeRow('isolate1', index)}
                      type="button"
                      className={styles.deleteButton}
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
            className={styles.addButton}
          >
            Add Row for Isolate 1
          </button>
        </div>

        {/* Antibiotic Susceptibility Table for Isolate 2 */}
        <div className="mt-6">
          <h2 className={styles.label}>Isolate 2 (Antibiotic Susceptibility Pattern)</h2>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th className={styles.tableCell}>Sensitive</th>
                <th className={styles.tableCell}>Resistant</th>
                <th className={styles.tableCell}>Intermediate</th>
                <th className={styles.tableCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.isolate2.map((row, index) => (
                <tr key={index}>
                  <td className={styles.tableCell}>
                    <select
                      name="sensitive"
                      value={row.sensitive}
                      onChange={(e) => handleChange(e, index, 'isolate2')}
                      className={styles.select}
                    >
                      <option value="">Select Antibiotic</option>
                      {antibiotics.map((antibiotic) => (
                        <option key={antibiotic} value={antibiotic}>
                          {antibiotic}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className={styles.tableCell}>
                    <select
                      name="resistant"
                      value={row.resistant}
                      onChange={(e) => handleChange(e, index, 'isolate2')}
                      className={styles.select}
                    >
                      <option value="">Select Antibiotic</option>
                      {antibiotics.map((antibiotic) => (
                        <option key={antibiotic} value={antibiotic}>
                          {antibiotic}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className={styles.tableCell}>
                    <select
                      name="intermediate"
                      value={row.intermediate}
                      onChange={(e) => handleChange(e, index, 'isolate2')}
                      className={styles.select}
                    >
                      <option value="">Select Antibiotic</option>
                      {antibiotics.map((antibiotic) => (
                        <option key={antibiotic} value={antibiotic}>
                          {antibiotic}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className={styles.tableCell}>
                    <button
                      onClick={() => removeRow('isolate2', index)}
                      type="button"
                      className={styles.deleteButton}
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
            className={styles.addButton}
          >
            Add Row for Isolate  2
          </button>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button type="submit" className={styles.submitButton}>Next</button>
        </div>
      </form>
    </div>
    </Suspense>
  );
}
