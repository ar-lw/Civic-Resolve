
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      {/* Hero Section */}
      <section className="bg-white rounded-lg shadow-xl py-20 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800">
          Fix your city, one complaint at a time <span role="img" aria-label="rocket">🚀</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Report social issues easily and help make your community better. From potholes to broken streetlights, your voice matters.
        </p>
        <Link 
          to="/register" 
          className="mt-10 inline-block bg-primary-600 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:bg-primary-700 transition-transform transform hover:scale-105"
        >
          Submit a Complaint Now
        </Link>
      </section>

      {/* About Section */}
      <section className="mt-16 py-12">
        <h2 className="text-3xl font-bold text-gray-800">What is CityFix?</h2>
        <div className="mt-6 max-w-4xl mx-auto text-gray-600 leading-relaxed">
          <p>
            This portal helps citizens report civic issues like broken street lights, damaged roads, and garbage problems directly to the municipality. It's a platform designed for citizens to directly connect with their local government, ensuring transparency and accountability.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-12 py-12 bg-gray-100 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 px-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-primary-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Register & Report</h3>
            <p className="text-gray-600">Quickly sign up and submit your complaint with details and photos.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-primary-500 mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5V4H4zm0 12h5v-5H4v5zm12 0h5v-5h-5v5zM16 4v5h5V4h-5z" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Track Status</h3>
            <p className="text-gray-600">Monitor the progress of your complaint in real-time from your dashboard.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-primary-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Get Resolution</h3>
            <p className="text-gray-600">Receive notifications and updates until your issue is resolved.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
