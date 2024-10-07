'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Patient() {
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

  const procedures = [
    "Abdominal aortic aneurysm repair",
    "Limb amputation",
    "Appendix surgery",
    "Shunt for dialysis",
    "Bile duct, liver or pancreatic surgery",
    "Carotid endarterectomy",
    "Gallbladder surgery",
    "Colon surgery",
    "Cesarean section",
    "Gastric surgery",
    "Heart transplant",
    "Abdominal hysterectomy",
    "Kidney transplant",
    "Laminectomy",
    "Liver transplant",
    "Neck surgery",
    "Kidney surgery",
    "Ovarian surgery",
    "Prostate surgery",
    "Rectal surgery",
    "Small bowel surgery",
    "Spleen surgery",
    "Thoracic surgery",
    "Thyroid and/or parathyroid surgery",
    "Vaginal hysterectomy",
    "Exploratory laparotomy",
    "Breast surgery",
    "Cardiac surgery",
    "Coronary artery bypass graft with both chest and donor site incisions",
    "Coronary artery bypass graft with chest incision only",
    "Craniotomy",
    "Spinal fusion",
    "Open reduction of fracture",
    "Herniorrhaphy",
    "Hip prosthesis",
    "Knee prosthesis",
    "Pacemaker surgery",
    "Peripheral vascular bypass surgery",
    "Ventricular shunt"
  ];

  const operationTheatres = [
    "OT NO. 1",
    "OT NO. 2",
    "OT NO. 3",
    "OT NO. 4",
    "OT NO. 5",
    "OT NO. 6",
    "OT NO. 7",
    "OT NO. 8",
    "OT NO. 9",
    "OT NO. 10",
    "OT NO. 11",
    "OT NO. 12",
    "ROBOTIC OT",
    "C-SEC OT",
    "MINOR OT",
    "COSMETOLOGY OT",
    "Others"
  ];

  const departments = [
    "Cardiothoracic Surgery",
    "Internal Medicine",
    "Anesthesia",
    "Cardiology",
    "Hemato-Oncology & Bone Marrow Transplant",
    "Liver Transplant & Surgical Gastroenterology",
    "Oncology",
    "GI & Hepato-Pancreatico-Biliary Surgery",
    "Critical Care",
    "Pulmonary Medicine & Critical Care",
    "Radiodiagnosis & Imaging",
    "Nephrology",
    "Urology & Renal Transplant",
    "Plastic & Aesthetic Surgery",
    "Gastroenterology",
    "Orthopedics & Joint Replacement",
    "NeuroSciences",
    "Pediatric",
    "Laboratory Medicine",
    "Endocrinology",
    "General & Minimally Access Surgery",
    "Obstetrics & Gynaecology",
    "Dental Department",
    "Nuclear Medicine",
    "Dermatology",
    "Rheumatology",
    "IVF & Reproductive Medicine",
    "Orthopedic Spine",
    "Medical Services",
    "Ophthalmology",
    "ENT",
    "Behavioral Sciences",
    "Onco Surgery"
  ];

  const surgeons = [
    "Manoj Luthra", "Vinay Labroo", "Ramesh Gourishankar", "Biswajit Paul", "Brig (Dr.) Satyaranjan Das",
    "Karisangal Vasudevan Ramaswamy", "(Col) Sunil Sofat", "Ashish Goel", "Rajesh Kapoor", "Shalendra Goel",
    "Gyanendra Agrawal", "Chandra Prakash Singh Chauhan", "Anil Prasad Bhatt", "Amit Kumar Devra",
    "Ashish Rai", "Manik Sharma", "B. L. Agarwal", "Vijay Kumar Sinha", "Sumit Bhushan Sharma", "Rohan Sinha",
    "Dinesh Rattnani", "Ashu Sawhney", "Suryasnata Das", "(Col) Vimal Upreti", "Nidhi Malhotra", "Manish Gupta",
    "Abhishek Goyal", "Poonam Yadav", "Praveen Kumar", "Reenu Jain", "Abhishek Gulia", "Kishore Das", "Pooja Goel",
    "Suhas Singla", "Asfaq Khan", "Shalini Sharma", "Sharique Ahmed", "Deepak Singhal", "Smita Sharma",
    "Pankaj Kumar Goyal", "Sakshi Srivastava", "Suvrat Arya", "Soma Singh", "Devender Chhonker", "Pramod Saini",
    "Lok Prakash Choudhary", "Dhirendra Pratap Singh Yadav", "Ashish Kumar Govil", "Atul Sharma", "Mansoor Ahmed Siddiqui",
    "Krishnanu Dutta Choudhury", "Mrinmay Kumar Das", "Minal Singh", "Anshul Jain", "Swapnil Yashwant Gajway",
    "Ashish Soni", "Kapil Kumar", "Abhinav Kumar", "Hema Rattnani", "Vikash Nayak", "Naveen Prakash Verma",
    "Bhupender Singh", "Aditya Bhatla", "Shovna Veshnavi", "Purnima Sahni Sood", "(Col) Subodh Kumar", "Shweta Goswami",
    "Sunita Maheshwari", "Atul K Maheshwari", "Sharad Dev", "Vikram Singh Solanki", "Radha Agartaniya", "Mithee Bhanot",
    "Vibha Bansal", "Rashmi Vyas", "Richa Thukral", "Nischal Anand", "Abhishek", "Vikram Bhardwaj", "Devashish Sharma",
    "Aastha Gupta", "Dipali Taneja", "Priyadarshi Jitendra Kumar", "Priyanka Srivastava", "Manasi Mehra", "Anita Singla",
    "Abhishek Kumar", "Parul Singhal", "Prerna Sharma", "Shweta Gupta", "Kumari Madhulika", "Jyoti Jain", "Sanjay Sharma",
    "Sandeep Yadav", "Sonalika Singh Chauhan", "Meenakshi Maurya", "Manisha Ranjan", "Pankaj Kumar", "Rohit Kumar Pandey",
    "Deepshikha", "Meenakshi", "Arti Yadav", "Anjali Gupta", "Rajesh Prasad Gupta", "Abhay Kumar Singh", "Raman Mehta",
    "Abhishek Dave", "Preeti Deolwari", "Abhijeet Kotabagi", "Chandrika", "Parineeta Maria", "Soma Singh", "Rakhi Gupta"
  ];

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    router.push("/Patient2");
  };

  return (
    <form onSubmit={handleSubmit} className="w-3/4 mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-6">Surgical Site Infection Surveillance Form</h2>

      <div className="mb-4">
        <label htmlFor="patientName" className="block text-gray-700 font-semibold mb-2">Patient Name:</label>
        <input type="text" id="patientName" name="patientName" value={formData.patientName} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
      </div>

      <div className="flex justify-between mb-4">
        <div className="w-1/2 pr-2">
          <label htmlFor="patientID" className="block text-gray-700 font-semibold mb-2">Patient ID:</label>
          <input type="text" id="patientID" name="patientID" value={formData.patientID} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div className="w-1/2 pl-2">
          <label htmlFor="age" className="block text-gray-700 font-semibold mb-2">Age:</label>
          <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="gender" className="block text-gray-700 font-semibold mb-2">Gender:</label>
        <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2">
          <option value="">-- Select Gender --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex justify-between mb-4">
        <div className="w-1/2 pr-2">
          <label htmlFor="dateOfAdmission" className="block text-gray-700 font-semibold mb-2">Date of Admission:</label>
          <input type="date" id="dateOfAdmission" name="dateOfAdmission" value={formData.dateOfAdmission} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div className="w-1/2 pl-2">
          <label htmlFor="dateOfProcedure" className="block text-gray-700 font-semibold mb-2">Date of Procedure:</label>
          <input type="date" id="dateOfProcedure" name="dateOfProcedure" value={formData.dateOfProcedure} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="admittingDepartment" className="block text-gray-700 font-semibold mb-2">Admitting Department:</label>
        <select id="admittingDepartment" name="admittingDepartment" value={formData.admittingDepartment} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2">
          <option value="">-- Select Department --</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="procedureName" className="block text-gray-700 font-semibold mb-2">Procedure Name:</label>
        <select id="procedureName" name="procedureName" value={formData.procedureName} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2">
          <option value="">-- Select Procedure --</option>
          {procedures.map((procedure, index) => (
            <option key={index} value={procedure}>{procedure}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="surgeon" className="block text-gray-700 font-semibold mb-2">Procedure Done By (Primary Surgeon):</label>
        <select id="surgeon" name="surgeon" value={formData.surgeon} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2">
          <option value="">-- Select Surgeon --</option>
          {surgeons.map((surgeon, index) => (
            <option key={index} value={surgeon}>{surgeon}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="theatre" className="block text-gray-700 font-semibold mb-2">Operation Theatre:</label>
        <select id="theatre" name="theatre" value={formData.theatre} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2">
          <option value="">-- Select Theatre --</option>
          {operationTheatres.map((theatre, index) => (
            <option key={index} value={theatre}>{theatre}</option>
          ))}
        </select>
      </div>

            <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Wound Class:</label>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input type="radio" name="woundClass" value="clean" checked={formData.woundClass === "clean"} onChange={handleChange} className="form-radio text-indigo-600" />
            <span className="ml-2">Clean</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="woundClass" value="cleanContaminated" checked={formData.woundClass === "cleanContaminated"} onChange={handleChange} className="form-radio text-indigo-600" />
            <span className="ml-2">Clean Contaminated</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="woundClass" value="contaminated" checked={formData.woundClass === "contaminated"} onChange={handleChange} className="form-radio text-indigo-600" />
            <span className="ml-2">Contaminated</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="woundClass" value="dirtyInfected" checked={formData.woundClass === "dirtyInfected"} onChange={handleChange} className="form-radio text-indigo-600" />
            <span className="ml-2">Dirty/Infected</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">SSI Event Occurred:</label>
        <div className="flex items-center">
          <input
            type="radio"
            id="ssiYes"
            name="ssiEventOccurred"
            value="yes"
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="ssiYes" className="mr-4">Yes</label>
          <input
            type="radio"
            id="ssiNo"
            name="ssiEventOccurred"
            value="no"
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="ssiNo">No</label>
        </div>
      </div>

      {formData.ssiEventOccurred === 'yes' && (
        <div className="mb-4">
          <label htmlFor="eventDate" className="block text-gray-700 font-semibold mb-2">If Yes, Date of Event:</label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      )}


      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Pre/Peri-operative Antibiotic Prophylaxis (PAP) given:</label>
        <div className="flex items-center">
          <input type="radio" id="papYes" name="papGiven" value="yes" onChange={handleChange} className="mr-2" />
          <label htmlFor="papYes" className="mr-4">Yes</label>
          <input type="radio" id="papNo" name="papGiven" value="no" onChange={handleChange} className="mr-2" />
          <label htmlFor="papNo">No</label>
        </div>
      </div>

      {formData.papGiven === 'yes' && (
        <div className="mb-4">
          <div className="mb-2">
            <label htmlFor="antibioticsGiven" className="block text-gray-700 font-semibold mb-2">If Yes, Antibiotics Given:</label>
            <input type="text" id="antibioticsGiven" name="antibioticsGiven" value={formData.antibioticsGiven} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label htmlFor="durationOfPAP" className="block text-gray-700 font-semibold mb-2">Duration of PAP:</label>
            <input type="text" id="durationOfPAP" name="durationOfPAP" value={formData.durationOfPAP} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
          </div>
        </div>
      )}

      <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">Next</button>
    </form>
  );
}
