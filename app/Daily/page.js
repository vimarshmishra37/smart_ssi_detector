'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function YesNoForm() {
  const [formData, setFormData] = useState({
    procedure_date: '',
    procedure_name: '',
    symptoms: {},
  });
  const [patients, setPatients] = useState([]);
  const [patientsData, setPatientsData] = useState({});
  const [selectedPatient, setSelectedPatient] = useState(null);

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
    "Any other",
  ];

  const days = Array.from({ length: 90 }, (_, i) => i + 1);

  useEffect(() => {
    // Load patient data from backend
    axios.get('http://localhost:3000/user')
      .then(response => {
        const data = response.data.patients;
        setPatients(data);
      })
      .catch(error => {
        console.error('Error fetching patient data:', error);
      });

    // Load saved patientsData from localStorage
    const savedData = localStorage.getItem('patientsData');
    if (savedData) {
      setPatientsData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      // Save current formData before switching
      if (formData.procedure_name) {
        setPatientsData((prevData) => {
          const updatedData = {
            ...prevData,
            [formData.procedure_name]: formData.symptoms,
          };
          localStorage.setItem('patientsData', JSON.stringify(updatedData)); // Persist to localStorage
          return updatedData;
        });
      }

      // Load selected patient's data from `patientsData`
      setFormData((prevFormData) => ({
        ...prevFormData,
        procedure_name: selectedPatient,
        symptoms: patientsData[selectedPatient] || initializeEmptySymptoms(),
      }));
    }
  }, [selectedPatient]);

  const initializeEmptySymptoms = () => {
    const symptoms = {};
    symptomNames.forEach(symptom => {
      symptoms[symptom] = {};
    });
    return symptoms;
  };

  const toggleTickCross = (symptom, day) => {
    if (formData.procedure_date && formData.procedure_name) {
      setFormData((prevData) => {
        const updatedDayValue =
          prevData.symptoms[symptom]?.[day] === 'tick' ? 'cross' : 'tick';

        return {
          ...prevData,
          symptoms: {
            ...prevData.symptoms,
            [symptom]: {
              ...prevData.symptoms[symptom],
              [day]: updatedDayValue,
            },
          },
        };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.procedure_name || !formData.procedure_date) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/user/symptoms/${formData.procedure_name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      if (response.ok) {
        alert('Form submission successful!');
      } else {
        alert('Form submission failed.');
      }
    } catch (error) {
      console.error('Network error during form submission:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div className='bg-teal-100 relative'>
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
              Patient ID:
              <select
                name="procedure_name"
                value={selectedPatient || ''}
                onChange={(e) => setSelectedPatient(e.target.value)}
                required
                style={styles.input}
              >
                <option value="" disabled>Select Patient</option>
                {patients.map((patient) => (
                  <option key={patient.patient_id} value={patient.patient_id}>
                    {`${patient.name} (ID: ${patient.patient_id})`}
                  </option>
                ))}
              </select>
            </label>
          </div>

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
                          style={{
                            ...styles.toggleButton,
                            backgroundColor: formData.symptoms[symptom]?.[day] === 'tick' ? '#28a745' : '#dc3545',
                            color: 'white',
                          }}
                        >
                          {formData.symptoms[symptom]?.[day] === 'tick' ? '✔️' : '❌'}
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
    overflowX: 'auto',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    minWidth: '1200px',
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
    width: '200px',
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
