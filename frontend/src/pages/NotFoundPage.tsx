
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="text-center py-20">
            <h1 className="text-6xl font-extrabold text-primary-600">404</h1>
            <h2 className="text-3xl font-bold text-gray-800 mt-4">Page Not Found</h2>
            <p className="text-gray-600 mt-4">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link 
                to="/" 
                className="mt-8 inline-block bg-primary-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-primary-700 transition-colors"
            >
                Go Back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
