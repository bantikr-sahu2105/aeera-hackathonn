import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center text-green-600 font-bold">Checking Auth...</div>;
  }

  // If no user is logged in, redirect to login page
  return user ? children : <Navigate to="/login" />;
}