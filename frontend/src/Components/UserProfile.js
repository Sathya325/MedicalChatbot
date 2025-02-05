import React from "react";
import { Link } from 'react-router-dom';


export default function UserProfile() {
    // Dummy data for hospitals and doctors
    const hospitalData = [
        {
            name: "Yashoda",
            location: "Downtown, Hyderabad",
            specialties: "Cardiology, Dentist",
            contact: "123-456-7890",
            doctor: "Dr. Arun"
        },
        {
            name: "City Health Hospital",
            location: "Downtown, Hyderabad",
            specialties: "Cardiology, Neurology, Pediatrics",
            contact: "123-456-7890",
            doctor: "Dr. Harish"
        },
        {
            name: "CareWell Clinic",
            location: "East Side, Hyderabad",
            specialties: "Dermatology, ENT, Orthopedics",
            contact: "987-654-3210",
            doctor: "Dr. Harsha"
        },
        {
            name: "MedLife Hospital",
            location: "West End, Hyderabad",
            specialties: "General Surgery, Oncology, Gynecology",
            contact: "555-555-5555",
            doctor: "Dr. Sophia Williams"
        }
    ];

    return (
        <div>
            <div className="border border-shadow mx-5 mt-5 bg-light">
                <h2 className="p-4">Want to have a conversation about your health?</h2>
                <Link className="nav-link text-info mb-3" to="/Chatbot">
                    <center><h1>Chatbot</h1></center>
                </Link>
            </div>

            <div className="mx-5 mt-5">
                <h2>Get more information about the hospitals/doctors</h2>

                <div className="row mt-4">
                    {hospitalData.map((hospital, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                {/* Always show the hospital name */}
                                <div className="card-header">
                                    <h5>{hospital.name}</h5>
                                </div>

                                {/* Card body with the hospital details */}
                                <div className="card-body">
                                    <p><strong>Location:</strong> {hospital.location}</p>
                                    <p><strong>Specialties:</strong> {hospital.specialties}</p>
                                    <p><strong>Contact:</strong> {hospital.contact}</p>
                                    <p><strong>Doctor in charge:</strong> {hospital.doctor}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
