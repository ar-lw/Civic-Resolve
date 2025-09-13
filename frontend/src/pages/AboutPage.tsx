
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white max-w-4xl mx-auto p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-4">About CityFix</h1>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          This portal is managed by the <strong>City Municipality</strong> to provide faster grievance redressal for civic issues. Our goal is to bridge the gap between citizens and the administration, leveraging technology to create a more responsive and efficient system for public services.
        </p>
        <p>
          Citizens can register complaints online regarding a variety of issues including infrastructure, sanitation, public utilities, and more. Once a complaint is submitted, it is assigned to the relevant department, and users can track its status transparently through their personal dashboard.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 pt-4">Our Mission</h2>
        <p>
          Our mission is to empower citizens to become active participants in the development and maintenance of their city. We believe that a collaborative approach is key to building cleaner, safer, and more sustainable urban environments for everyone.
        </p>
         <h2 className="text-2xl font-semibold text-gray-800 pt-4">Key Features</h2>
        <ul className="list-disc list-inside space-y-2">
            <li>Easy-to-use complaint submission form.</li>
            <li>Real-time tracking of complaint status.</li>
            <li>Direct communication channel with municipal authorities.</li>
            <li>Ability to upload photographic evidence.</li>
            <li>Transparent and accountable resolution process.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
