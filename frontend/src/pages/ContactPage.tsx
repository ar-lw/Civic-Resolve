
import React from 'react';

const ContactPage: React.FC = () => {
    return (
        <div className="bg-white max-w-3xl mx-auto p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-4">Contact Us</h1>
            <p className="text-gray-600 mb-8">
                Have questions or need assistance? Reach out to the City Municipality through the following channels. We are here to help.
            </p>
            <div className="space-y-6">
                <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                        <p className="text-gray-600">For general inquiries and support.</p>
                        <a href="mailto:support@cityportal.gov" className="text-primary-600 hover:underline">support@cityportal.gov</a>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                        <p className="text-gray-600">Our helpline is available from 9 AM to 5 PM, Mon-Fri.</p>
                        <a href="tel:+919876543210" className="text-primary-600 hover:underline">+91 98765 43210</a>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                        <p className="text-gray-600">Visit us at our main office for in-person assistance.</p>
                        <p className="text-gray-800">City Municipality Office, 123 Civic Center, Chennai, India</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
