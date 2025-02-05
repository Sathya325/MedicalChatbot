import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from "react";
export default function About() {
  return (
    <div>
        <h4 className="mt-5">Key Features:</h4>
          <ul>
            <li>AI-Powered Diagnosis: Leveraging advanced algorithms for precise
            diagnostic results. Real-Time Results: Get instant analysis and
            feedback on medical conditions. </li>
            <li>User-Friendly Interface:
            Easy-to-navigate platform designed for everyone.</li>
            <li>Data Security and
            Privacy: Your data is protected with top-tier security
            measures.</li>
            <li> Reminder Alerts: Reminders helps users not to forget taking medicines or appointments on time.</li>
          </ul>
        <h4>Benifits:</h4>
            <ul>
            <li>Faster, more accurate measures and suggestions from the comfort of your home using a chatbot.</li>
              <li>Easy availability of variety of doctors according to their problem</li>
            </ul>
    </div>
  );
}
