import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Complaint, ComplaintStatus } from '../types'; // Removed unused ComplaintCategory

const getStatusColor = (status: ComplaintStatus) => {
    switch (status) {
        case ComplaintStatus.Pending: return 'bg-yellow-100 text-yellow-800';
        case ComplaintStatus.InProgress: return 'bg-blue-100 text-blue-800';
        case ComplaintStatus.Resolved: return 'bg-green-100 text-green-800';
        case ComplaintStatus.Rejected: return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const UserDashboardPage: React.FC = () => {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [userName, setUserName] = useState("User");

    // This code runs automatically when the page loads
    useEffect(() => {
        const fetchComplaints = async () => {
            // Get the "key" from the browser's memory
            const token = localStorage.getItem('token');

            try {
                // Ask the backend for the list of complaints
                const response = await fetch('http://localhost:5000/api/complaints', {
                    headers: {
                        // We show our "key" to prove we are logged in
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error('Could not fetch complaints.');
                
                const data = await response.json();
                setComplaints(data); // Save the complaints to display them
                if (data.length > 0) {
                  setUserName(data[0].userName);
                }
            } catch (error: any) {
                alert(error.message);
            }
        };

        fetchComplaints();
    }, []); // The empty [] means this runs only once when the page first loads

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Hello, {userName} 👋</h1>
                <p className="text-gray-600 mt-1">Welcome to your dashboard. Here's what's happening.</p>
            </div>
            
            <Link to="/new-complaint" className="bg-primary-600 text-white p-6 rounded-lg shadow-md hover:bg-primary-700 transition-colors flex items-center space-x-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 <div>
                     <h2 className="text-xl font-semibold">New Complaint</h2>
                     <p className="text-primary-100">File a new report about a civic issue.</p>
                 </div>
            </Link>

            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Complaints</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            {/* Table headers */}
                             <tr>
                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaint ID</th>
                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                 <th scope="col" className="relative px-6 py-3"><span className="sr-only">View</span></th>
                             </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {complaints.map((complaint) => (
                                <tr key={complaint.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{complaint.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{complaint.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(complaint.status)}`}>
                                            {complaint.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(complaint.submittedDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link to={`/complaint/${complaint.id}`} className="text-primary-600 hover:text-primary-900">View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserDashboardPage;