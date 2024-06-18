import React, { useContext } from 'react';
import airlogo from './assets/NEWLOGO.png';
import userIcon from './assets/user-heart-line.svg'; // Import user icon
import './App.css';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  
 
  const handleLogout = () => {
    console.log('Logging out...');
    setUser(null);
    console.log('User state after logout:', user);
  };
  

  return (
    <header>
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link to="/">
              <div className='flex text-purple-600 text-center justify-center '><img src={airlogo} alt="Airbnb" className="h-16 flex items-center " /><span className='px-2 py-4 font-semibold'>STAY SAVVY</span></div>
              
            </Link>
            <div className="flex items-center gap-5 justify-between   px-4 py-2 ">
              <Link to={'/'}><div className="nav-item text-primary">HOMES</div></Link>
              <div className="text-gray-800 hover:text-red-600 mr-4">|</div>
              <Link to={'/about'}><div className="nav-item text-primary">ABOUT</div></Link>
              <div className="text-gray-800 hover:text-red-600 mr-4">|</div>
              <Link to={'/'}><div className="nav-item text-primary">PLACES</div></Link>
              
            </div>
            <div className="flex items-center">
              {!!user && (
                <div className="flex items-center   ">
                  
                  <Link to={user?'/account':'/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
        </div>
        {!!user && (
          <div>
            {user.name}
          </div>
        )}
      </Link>
                  <button onClick={handleLogout} className="ml-3  px-4  hover:text-gray-900 bg-primary rounded-full py-3 text-white mr-4">
                    Logout
                  </button>
                </div>
              )}
              {!user && ( // Conditional rendering for login/signup when not logged in
                <>
                  <div className="text-gray-800 hover:text-gray-900 mr-4">Become a Host</div>
                  <button className="py-2 px-4 bg-primary text-white rounded-md mr-4">Sign Up</button>
                  <Link to="/login" className="text-gray-800 hover:text-gray-900">
                    Log in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
