import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Complaint, ComplaintStatus, AdminReply } from '../types';

const getStatusColor = (status: ComplaintStatus) => {
    switch (status) {
        case ComplaintStatus.Pending: return 'bg-yellow-100 text-yellow-800';
        case ComplaintStatus.InProgress: return 'bg-blue-100 text-blue-800';
        case ComplaintStatus.Resolved: return 'bg-green-100 text-green-800';
        case ComplaintStatus.Rejected: return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const AdminComplaintDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [complaint, setComplaint] = useState<Complaint | null>(null);
    const [newStatus, setNewStatus] = useState<ComplaintStatus>(ComplaintStatus.Pending);
    const [replyMessage, setReplyMessage] = useState('');

    const fetchComplaint = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5000/api/admin/complaints/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch complaint details.');
            const data: Complaint = await response.json();
            setComplaint(data);
            setNewStatus(data.status);
        } catch (error: any) {
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchComplaint();
    }, [id]);

    const handleStatusUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5000/api/admin/complaints/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to update status.');
            }
            setComplaint(prev => prev ? ({ ...prev, status: newStatus }) : null);
            alert('Status updated successfully!');
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleAddReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyMessage.trim()) return alert('Reply message cannot be empty.');
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5000/api/admin/complaints/${id}/reply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ message: replyMessage })
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to add reply.');
            }
            alert('Reply added successfully!');
            setReplyMessage('');
            fetchComplaint(); // Re-fetch the complaint to show the new reply
        } catch (error: any) {
            alert(error.message);
        }
    };

    if (!complaint) {
        return <div className="text-center py-20">Loading complaint details...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Complaint Details */}
            <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg">
                <Link to="/admin/dashboard" className="text-primary-600 hover:text-primary-800 mb-6 inline-block">&larr; Back to Dashboard</Link>
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{complaint.title}</h1>
                        <p className="text-sm text-gray-500 mt-1">Submitted by: {complaint.userName} on {new Date(complaint.submittedDate).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                    </span>
                </div>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">Description</h3>
                        <p className="text-gray-600">{complaint.description}</p>
                    </div>
                    {complaint.imageUrl && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">Submitted Image</h3>
                            <img src={complaint.imageUrl} alt="Complaint" className="rounded-lg shadow-md w-full" />
                        </div>
                    )}
                </div>
            </div>

            {/* Admin Actions Panel */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Admin Actions</h2>
                    <form onSubmit={handleStatusUpdate} className="space-y-3 border-b pb-6 mb-6">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Change Complaint Status</label>
                        <div className="flex items-center space-x-3">
                            <select
                                id="status"
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value as ComplaintStatus)}
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            >
                                {Object.values(ComplaintStatus).map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            <button
                                type="submit"
                                className="flex-shrink-0 bg-primary-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                Update
                            </button>
                        </div>
                    </form>

                    <form onSubmit={handleAddReply} className="space-y-3">
                        <label htmlFor="reply" className="block text-sm font-medium text-gray-700">Add Reply / Comment</label>
                        <textarea
                            id="reply"
                            rows={4}
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="e.g., We have assigned an electrician."
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add Reply
                        </button>
                    </form>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Update History</h2>
                    {complaint.replies && complaint.replies.length > 0 ? (
                        <div className="flow-root">
                            <ul role="list" className="-mb-8">
                                {complaint.replies.map((reply, replyIdx) => (
                                    <li key={reply.id}>
                                        <div className="relative pb-8">
                                            {replyIdx !== complaint.replies.length - 1 ? (
                                                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                            ) : null}
                                            <div className="relative flex space-x-3">
                                                <div>
                                                    <span className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center ring-8 ring-white">
                                                        <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Reply from <span className="font-medium text-gray-900">{reply.author_name}</span>
                                                        </p>
                                                        <p className="mt-1 text-sm text-gray-700">{reply.message}</p>
                                                    </div>
                                                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                                        <time dateTime={reply.created_at}>{new Date(reply.created_at).toLocaleDateString()}</time>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No replies yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminComplaintDetailsPage;