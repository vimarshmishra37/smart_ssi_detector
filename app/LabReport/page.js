import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    ageSex: '',
    mrn: '',
    visitType: '',
    sampleNumber: '',
    department: '',
    consultingDoctor: '',
    collectedOn: '',
    receivedOn: '',
    completedOn: '',
    testName: 'AEROBIC C & S',
    incubationPeriod: '36-48 hrs',
    remarks: 'Escherichia coli grown in culture. Sample type: Pus swab from Abdomen',
    antibiotics: [
      { name: 'Cefuroxime', mic: '>=64', interpretation: 'Resistant' },
      { name: 'Ceftriaxone', mic: '>=64', interpretation: 'Resistant' },
      { name: 'Ceftazidime', mic: '', interpretation: 'Resistant' },
      { name: 'Cefepime', mic: '8', interpretation: 'Susceptibility Dose Dependent' },
      { name: 'Amoxicillin/Clavulanic acid', mic: '>=32', interpretation: 'Resistant' },
      { name: 'Piperacillin/Tazobactam', mic: '>=128', interpretation: 'Resistant' },
      { name: 'Cefoperazone/Sulbactam', mic: '32', interpretation: 'Intermediate' },
      { name: 'Gentamicin', mic: '<=1', interpretation: 'Sensitive' },
      { name: 'Amikacin', mic: '4', interpretation: 'Sensitive' },
      { name: 'Netilmicin', mic: '', interpretation: 'Sensitive' },
      { name: 'Ciprofloxacin', mic: '>=4', interpretation: 'Resistant' },
      { name: 'Levofloxacin', mic: '', interpretation: 'Resistant' },
      { name: 'Trimethoprim/Sulfamethoxazole', mic: '<=20', interpretation: 'Sensitive' },
    ],
    comments: 'The identification of the reported isolate and antibiotic susceptibility for reported antimicrobials has been performed by VITEK® 2 Compact automated system except for Netilmicin, Ceftazidime and Levofloxacin, for which it has been performed by disc diffusion method.'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAntibioticChange = (index, field, value) => {
    const updatedAntibiotics = [...formData.antibiotics];
    updatedAntibiotics[index][field] = value;
    setFormData({
      ...formData,
      antibiotics: updatedAntibiotics,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace this with actual submission logic
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h2>Patient Information</h2>
      <input name="patientName" placeholder="Patient Name" value={formData.patientName} onChange={handleChange} />
      <input name="ageSex" placeholder="Age / Sex" value={formData.ageSex} onChange={handleChange} />
      <input name="mrn" placeholder="MRN" value={formData.mrn} onChange={handleChange} />
      <input name="visitType" placeholder="Visit Type" value={formData.visitType} onChange={handleChange} />
      <input name="sampleNumber" placeholder="Sample Number" value={formData.sampleNumber} onChange={handleChange} />

      <h2>Doctor & Department Information</h2>
      <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
      <input name="consultingDoctor" placeholder="Consulting Doctor" value={formData.consultingDoctor} onChange={handleChange} />
      <input name="collectedOn" placeholder="Collected On" type="datetime-local" value={formData.collectedOn} onChange={handleChange} />
      <input name="receivedOn" placeholder="Received On" type="datetime-local" value={formData.receivedOn} onChange={handleChange} />
      <input name="completedOn" placeholder="Completed On" type="datetime-local" value={formData.completedOn} onChange={handleChange} />

      <h2>Test Information</h2>
      <input name="testName" placeholder="Test Name" value={formData.testName} onChange={handleChange} readOnly />
      <input name="incubationPeriod" placeholder="Incubation Period" value={formData.incubationPeriod} onChange={handleChange} />
      <textarea name="remarks" placeholder="Remarks" value={formData.remarks} onChange={handleChange} />

      <h2>Antibiotic Susceptibilities</h2>
      {formData.antibiotics.map((antibiotic, index) => (
        <div key={index} className="space-y-2">
          <input placeholder="Antibiotic" value={antibiotic.name} readOnly />
          <input
            placeholder="MIC"
            value={antibiotic.mic}
            onChange={(e) => handleAntibioticChange(index, 'mic', e.target.value)}
          />
          <input
            placeholder="Interpretation"
            value={antibiotic.interpretation}
            onChange={(e) => handleAntibioticChange(index, 'interpretation', e.target.value)}
          />
        </div>
      ))}

      <h2>Comments</h2>
      <textarea name="comments" placeholder="Comments" value={formData.comments} onChange={handleChange} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
