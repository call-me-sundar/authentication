import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('logindash');
    navigate('/');
  };

  useEffect(() => {
    const logindash = localStorage.getItem('logindash');

    if (logindash === 'false' || logindash === null) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <p>sara</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
