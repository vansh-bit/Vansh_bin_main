import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Decrease countdown every second
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        // Redirect to home page when countdown reaches 0
        navigate("/");
      }
    }, 1000); // 1000 milliseconds = 1 second

    return () => clearTimeout(timeoutId); // Cleanup function
  }, [countdown, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Logged out successfully!</h2>
      <p className="mb-4">Redirecting you back to the home page in {countdown}...</p>
    </div>
  );
};

export default Logout;
