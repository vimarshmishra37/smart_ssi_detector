'use client'
import React, { useState } from 'react';

export default function SurgicalForm() {
  const [formData, setFormData] = useState({
    patientName: '',
    patientID: '',
    age: '',
    gender: '',
    dateOfAdmission: '',
    dateOfProcedure: '',
    admittingDepartment: '',
    departmentSurgeon: '',
    procedureName: '',
    diagnosis: '',
    surgeon: '',
    theatre: '',
    outpatientProcedure: '',
    scenarioProcedure: '',
    woundClass: '',
    papGiven: '',
    antibioticsGiven: '',
    durationOfPAP: '',
    ssiEventOccurred: '',
    eventDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td><label>Patient Name</label></td>
            <td><input type="text" name="patientName" value={formData.patientName} onChange={handleChange} /></td>
            <td><label>Patient ID</label></td>
            <td><input type="text" name="patientID" value={formData.patientID} onChange={handleChange} /></td>
            <td><label>Age</label></td>
            <td><input type="number" name="age" value={formData.age} onChange={handleChange} /></td>
            <td><label>Gender</label></td>
            <td><input type="text" name="gender" value={formData.gender} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td><label>Date of Admission</label></td>
            <td><input type="date" name="dateOfAdmission" value={formData.dateOfAdmission} onChange={handleChange} /></td>
            <td><label>Date of Operative Procedure</label></td>
            <td><input type="date" name="dateOfProcedure" value={formData.dateOfProcedure} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td><label>Admitting Department</label></td>
            <td><input type="text" name="admittingDepartment" value={formData.admittingDepartment} onChange={handleChange} /></td>
            <td><label>Department (Primary Surgeon)</label></td>
            <td><input type="text" name="departmentSurgeon" value={formData.departmentSurgeon} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td><label>Name of the Procedure</label></td>
            <td><input type="text" name="procedureName" value={formData.procedureName} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td><label>Diagnosis</label></td>
            <td colSpan="3"><input type="text" name="diagnosis" value={formData.diagnosis} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td><label>Procedure done by (Primary Surgeon)</label></td>
            <td><input type="text" name="surgeon" value={formData.surgeon} onChange={handleChange} /></td>
            <td><label>Operation Theatre where Procedure done</label></td>
            <td><input type="text" name="theatre" value={formData.theatre} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td><label>Outpatient Procedure</label></td>
            <td>
              <label>
                <input type="radio" name="outpatientProcedure" value="yes" onChange={handleChange} /> Yes
              </label>
              <label>
                <input type="radio" name="outpatientProcedure" value="no" onChange={handleChange} /> No
              </label>
            </td>
            <td><label>Scenario of Procedure</label></td>
            <td>
              <label>
                <input type="radio" name="scenarioProcedure" value="elective" onChange={handleChange} /> Elective
              </label>
              <label>
                <input type="radio" name="scenarioProcedure" value="emergency" onChange={handleChange} /> Emergency
              </label>
            </td>
          </tr>
          <tr>
            <td><label>Wound Class</label></td>
            <td>
              <label>
                <input type="radio" name="woundClass" value="clean" onChange={handleChange} /> Clean
              </label>
              <label>
                <input type="radio" name="woundClass" value="cleanContaminated" onChange={handleChange} /> Clean Contaminated
              </label>
              <label>
                <input type="radio" name="woundClass" value="contaminated" onChange={handleChange} /> Contaminated
              </label>
              <label>
                <input type="radio" name="woundClass" value="dirtyInfected" onChange={handleChange} /> Dirty/Infected
              </label>
            </td>
          </tr>
          <tr>
            <td><label>Pre/Peri-operative Antibiotic Prophylaxis (PAP) given</label></td>
            <td>
              <label>
                <input type="radio" name="papGiven" value="yes" onChange={handleChange} /> Yes
              </label>
              <label>
                <input type="radio" name="papGiven" value="no" onChange={handleChange} /> No
              </label>
            </td>
          </tr>
          <tr>
            <td><label>If Yes, Antibiotics given</label></td>
            <td><input type="text" name="antibioticsGiven" value={formData.antibioticsGiven} onChange={handleChange} /></td>
            <td><label>Duration of PAP</label></td>
            <td><input type="text" name="durationOfPAP" value={formData.durationOfPAP} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td><label>SSI Event Occurred</label></td>
            <td>
              <label>
                <input type="radio" name="ssiEventOccurred" value="yes" onChange={handleChange} /> Yes
              </label>
              <label>
                <input type="radio" name="ssiEventOccurred" value="no" onChange={handleChange} /> No
              </label>
            </td>
            <td><label>If Yes, Date of Event</label></td>
            <td><input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} /></td>
          </tr>
        </tbody>
      </table>
      <button type="submit">Submit</button>
    </form>
  );
}
