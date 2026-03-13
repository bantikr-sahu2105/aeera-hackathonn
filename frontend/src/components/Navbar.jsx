import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Listen to see if someone is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // The actual logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Kick them back to the landing page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-100 px-6 py-4 flex justify-between items-center fixed top-0 z-50">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-2">
        <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
        <span className="text-2xl font-bold tracking-tighter text-gray-900">AERA</span>
      </Link>

      {/* Dynamic Auth Buttons */}
      <div className="flex gap-4">
        {user ? (
          /* If User IS logged in, show Logout */
          <button 
            onClick={handleLogout}
            className="px-5 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-full hover:bg-red-50 transition-colors"
          >
            Log out
          </button>
        ) : (
          /* If User is NOT logged in, show Login/Signup */
          <>
            <Link to="/login" className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">
              Log in
            </Link>
            <Link to="/register" className="px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors shadow-md">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}