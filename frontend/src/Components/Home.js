import React from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function Home() {
    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <h2>Revolutionizing Healthcare with AI-Powered Diagnoses</h2>
                    <p>We leverage cutting-edge artificial intelligence to provide accurate and rapid medical diagnoses. Our platform empowers healthcare professionals and patients with the tools they need for better health outcomes.</p>
                </div>
                <div className="col-md-6 mt-5 shadow">
                    <img src="https://www.iqvis.com/wp-content/uploads/2018/05/Healthcare-Diagnosis-with-AI.jpg" alt="Healthcare Diagnosis with AI" className="img-fluid" />
                </div>
            </div>
        </div>
    );
}
