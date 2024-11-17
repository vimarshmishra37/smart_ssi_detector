'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function YesNoForm() {
  const [formData, setFormData] = useState({
    procedure_date: '',
    procedure_name: '',
    symptoms: {},  // Track symptoms data in the form state
  });
  const [patients, setPatients] = useState([]); // State to store fetched patient data
  const [selectedPatient, setSelectedPatient] = useState(null); // Track selected patient
  const [selectedPatientDetails, setSelectedPatientDetails] = useState(null); // To store details of selected patient

  // Effect to update selectedPatientDetails when selectedPatient changes
  useEffect(() => {
    console.log('Selected Patient:', selectedPatient); // Debugging the selected patient
    if (selectedPatient) {
      const patientDetails = patients.find(patient => patient.patient_id === selectedPatient);
      setSelectedPatientDetails(patientDetails);
    }
  }, [selectedPatient, patients]);
  
  useEffect(() => {
    // Fetch patient data from the database
    axios.get('http://localhost:3000/user')
      .then((response) => {
        const data = response.data.patients;
        setPatients(data); // Save patient data in the state
        console.log('Fetched patients:', data); // Debugging fetched patients
      })
      .catch((error) => {
        console.error('Error fetching patient data:', error);
      });
  }, []); // Run this only once on component mount

  const days = Array.from({ length: 90 }, (_, i) => i + 1);

  // Array of symptom names
  const symptomNames = [
    "Purulent discharge from incision/wound",
    "Localized pain and tenderness",
    "Localized swelling",
    "Fever",
    "Incision deliberately opened/drained",
    "Spontaneous dehiscence of wound",
    "Abscess",
    "Micro-organisms seen in Gram's staining",
    "Imaging evidence of infection/abscess",
    "Positive culture from discharge material",
    "Blood culture sent",
    "Physician institutes of diagnosis of SSI",
    "Any other"
  ];

  // Initialize symptoms in formData state
  symptomNames.forEach(symptom => {
    if (!formData.symptoms[symptom]) {
      formData.symptoms[symptom] = {};
    }
  });

  const toggleTickCross = (symptom, day) => {
    // Check if procedure date and name are filled before toggling
    if (formData.procedure_date && formData.procedure_name) {
      setFormData((prevData) => ({
        ...prevData,
        symptoms: {
          ...prevData.symptoms,
          [symptom]: {
            ...prevData.symptoms[symptom],
            [day]: prevData.symptoms[symptom][day] === 'tick' ? 'cross' : 'tick',
          }
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if ( !formData.procedure_name || !formData.procedure_date) {
      console.log('Form Data:', formData.procedure_name);
      console.log('Form Data:', formData.procedure_date);
      console.error("No patient selected or form data incomplete!");
      alert("Please select a patient and fill all required fields.");
      return;
    }
  
    console.log('Form data:', formData);
  
    try {
      const response = await fetch(`http://localhost:3000/user/symptoms/${formData}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });
    
      const responseText = await response.text(); // Get raw response text
      console.log('Response Text:', responseText);  // Log the raw response
      
      if (response.ok) {
        const data = JSON.parse(responseText);  // Parse the JSON if it's valid
        console.log('Form submission successful:', data);
      } else {
        console.error('Form submission failed:', responseText);  // Log the failed response
      }
    } catch (error) {
      console.error('Network error during form submission:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
    
  };
  useEffect(() => {
   console.log('Selected Patient:');
    if (selectedPatient) {
      axios.get(`http://localhost:3000/user/symptoms/${selectedPatient}`)
        .then((response) => {
          const patientData = response.data; // The patient's symptoms data
          console.log('Patient Symptoms Data:', patientData);
        })
        .catch((error) => {
          console.error('Error fetching patient symptoms data:', error);
        });
    }
  }, [selectedPatient]);
  
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Hospital Best Practice Check</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label>
            Date of Procedure:
            <input
              type="date"
              name="procedure_date"
              value={formData.procedure_date}
              onChange={(e) => setFormData({ ...formData, procedure_date: e.target.value })}
              required
              style={styles.input}
            />
          </label>
          <label>
            Procedure Name:
            <select
              name="procedure_name"
              value={formData.procedure_name}
              onChange={(e) => {
                setFormData({ ...formData, procedure_name: e.target.value });
                setSelectedPatient(e.target.value); // Update the selected patient
                console.log('Selected Patient ID:', e.target.value); // Debugging the selected ID
              }}
              required
              style={styles.input}
            >
              <option value="" disabled>Select Procedure Name</option>
              {patients.map((patient) => (
                <option key={patient.patient_id} value={patient.patient_id}>
                  {`${patient.name} (ID: ${patient.patient_id})`}
                </option>
              ))}
            </select>
          </label>
        </div>
        {selectedPatientDetails && (
          <div style={styles.selectedPatientInfo}>
            <p><strong>Selected Patient:</strong></p>
            <p>Name: {selectedPatientDetails.name}</p>
            <p>ID: {selectedPatientDetails.patient_id}</p>
          </div>
        )}

        {/* Scrollable Table Container */}
        <div style={styles.scrollContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.tableHeader, width: '300px' }}>Post-op Day</th>
                {days.map((day) => (
                  <th key={day} style={styles.tableHeader}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {symptomNames.map((symptom) => (
                <tr key={symptom}>
                  <td style={styles.symptomCell}>{symptom}</td>
                  {days.map((day) => (
                    <td key={day} style={styles.tableCell}>
                      <button
                        type="button"
                        onClick={() => toggleTickCross(symptom, day)}
                        disabled={!formData.procedure_date || !formData.procedure_name}
                        style={{
                          ...styles.toggleButton,
                          backgroundColor: formData.symptoms[symptom][day] === 'tick' ? '#28a745' : '#dc3545',
                          color: 'white',
                          opacity: !formData.procedure_date || !formData.procedure_name ? 0.5 : 1,
                          cursor: !formData.procedure_date || !formData.procedure_name ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {formData.symptoms[symptom][day] === 'tick' ? '✔️' : '❌'}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  formGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '200px',
  },
  scrollContainer: {
    overflowX: 'auto',  // Enable horizontal scrolling
    marginBottom: '20px',
  },
  table: {
    width: '100%',      // Make the table take the full width
    minWidth: '1200px', // Ensure the table is wide enough to require scrolling
    borderCollapse: 'collapse',
  },
  tableHeader: {
    padding: '10px',
    border: '1px solid #ddd',
    backgroundColor: '#007BFF',
    color: 'white',
    textAlign: 'center',
  },
  symptomCell: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
    width: '200px',  // Set width for symptom column
  },
  tableCell: {
    padding: '5px',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  toggleButton: {
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '15px',
    width: '30px',
    height: '30px',
  },
  submitButton: {
    display: 'block',
    width: '100%',
    padding: '12px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '8px',
  },
};