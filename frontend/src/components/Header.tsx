import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const Logo: React.FC = () => (
    <Link to="/" className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
        </svg>
        <span className="text-2xl font-bold text-gray-800">CityFix</span>
    </Link>
);

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Hook to programmatically navigate

    const isAdminSection = location.pathname.startsWith('/admin');
    const isUserLoggedIn = !isAdminSection && (location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/complaint') || location.pathname.startsWith('/new-complaint'));
    const isAdminLoggedIn = isAdminSection && !location.pathname.endsWith('/login');

    const baseStyle = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
    const inactiveStyle = "text-gray-600 hover:bg-gray-200 hover:text-gray-900";
    const activeStyle = "bg-primary-500 text-white";

    const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`;

    const handleLogout = () => {
        // 1. Remove the token from the browser's memory
        localStorage.removeItem('token');
        // 2. Redirect the user to the home page
        navigate('/');
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Logo />
                    <nav className="hidden md:flex items-center space-x-4">
                        {isAdminSection ? (
                            <>
                                {isAdminLoggedIn ? (
                                    <>
                                        <NavLink to="/admin/dashboard" className={getNavLinkClass}>Dashboard</NavLink>
                                        <button onClick={handleLogout} className={`${baseStyle} ${inactiveStyle}`}>Logout</button>
                                    </>
                                ) : (
                                    <span className="text-gray-700 font-semibold">Admin Portal</span>
                                )}
                            </>
                        ) : (
                            <>
                                <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
                                <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
                                <NavLink to="/contact" className={getNavLinkClass}>Contact</NavLink>
                                {isUserLoggedIn ? (
                                    <>
                                        <NavLink to="/dashboard" className={getNavLinkClass}>Dashboard</NavLink>
                                        <button onClick={handleLogout} className={`${baseStyle} ${inactiveStyle}`}>Logout</button>
                                    </>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Link to="/login" className="px-4 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-md hover:bg-primary-50 transition-colors">
                                            Login
                                        </Link>
                                        <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors">
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;