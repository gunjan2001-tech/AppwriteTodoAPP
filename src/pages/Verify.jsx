import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { account } from '../appwrite/config';

function Verify() {
  const [params] = useSearchParams();
  const secret = params.get('secret');
  const navigate = useNavigate();

  // Function to handle the verification process
  async function updateVerify() {
    try {
      // Call Appwrite's updateVerification method with secret only
      await account.updateVerification(secret); // Appwrite requires only the secret
      alert('User is verified');
      // Navigate to the login page after successful verification
      navigate('/login');
    } catch (error) {
      console.error('Verification failed:', error);
      alert('Verification failed, please try again.');
    }
  }

  // useEffect to run the verification function when the component mounts
  useEffect(() => {
    if (secret) {
      updateVerify();
    } else {
      console.error('Verification secret is missing');
      alert('Invalid verification link.');
    }
  }, [secret]); // Depend on `secret` to ensure it's available before running the effect

  return <div>Verifying...</div>;
}

export default Verify;
