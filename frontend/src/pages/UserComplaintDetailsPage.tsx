import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Complaint, ComplaintStatus, AdminReply } from '../types'; // Removed unused ComplaintCategory

const getStatusColor = (status: ComplaintStatus) => {
    // ... (This function remains the same as before)
};

const UserComplaintDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [complaint, setComplaint] = useState<Complaint | null>(null);

    useEffect(() => {
        const fetchComplaintDetails = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:5000/api/complaints/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Could not fetch complaint details.');
                }
                const data = await response.json();
                setComplaint(data);
            } catch (error: any) {
                alert(error.message);
            }
        };

        fetchComplaintDetails();
    }, [id]); // Re-run this effect if the ID in the URL changes

    if (!complaint) {
        return <div>Loading...</div>;
    }

    const statusColors = getStatusColor(complaint.status);

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <Link to="/dashboard" className="text-primary-600 hover:text-primary-800 mb-6 inline-block">&larr; Back to Dashboard</Link>
            
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{complaint.title}</h1>
                    <p className="text-sm text-gray-500 mt-1">Complaint ID: #{complaint.id} | Submitted on: {new Date(complaint.submittedDate).toLocaleDateString()}</p>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors.bg} ${statusColors.text}`}>
                    {complaint.status}
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">Description</h3>
                        <p className="text-gray-600 leading-relaxed">{complaint.description}</p>
                    </div>
                    {complaint.imageUrl && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">Submitted Image</h3>
                            <img src={complaint.imageUrl} alt="User submitted" className="rounded-lg shadow-md w-full" />
                        </div>
                    )}
                </div>
                <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <h4 className="font-semibold text-gray-700">Category</h4>
                        <p className="text-gray-600">{complaint.category}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <h4 className="font-semibold text-gray-700">Location</h4>
                        <p className="text-gray-600">{complaint.location}</p>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Admin Replies & Updates</h3>
                {complaint.replies && complaint.replies.length > 0 ? (
                    <div className="flow-root">
                        {/* ... (Your existing JSX for displaying replies remains the same) ... */}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No admin replies yet.</p>
                )}
            </div>
        </div>
    );
};

export default UserComplaintDetailsPage;