import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { account } from '../appwrite/config';

function Verify() {
  const [params] = useSearchParams();
  const secret = params.get('secret');
  const id = params.get('userId');
  const navigate = useNavigate();

  // Function to handle the verification process
  async function updateVerify() {
    try {
      // Call Appwrite's updateVerification method with userId and secret
      const verify = await account.updateVerification(id, secret);
      alert('User is verified');
      // Navigate to the login page after successful verification
      navigate('/login');
    } catch (error) {
      console.error('Verification failed:', error);
    }
  }

  // useEffect to run the verification function when the component mounts
  useEffect(() => {
    updateVerify();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return <div>Verifying...</div>;
}

export default Verify;