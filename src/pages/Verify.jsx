import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { account } from '../appwrite/config';

function Verify() {
  const [params] = useSearchParams();
  const secret = params.get('secret');
  const id = params.get('userId');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const updateVerification = async () => {
      try {
        setLoading(true);
        const verification = await account.updateVerification(id, secret);
        setMessage('User is verified successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Redirect after 2 seconds
      } catch (error) {
        setMessage('Error occurred during verification.');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (secret && id) {
      updateVerification();
    } else {
      setMessage('Invalid verification link.');
      setLoading(false);
    }
  }, [secret, id, navigate]);

  return (
    <div>
      <h2>Verification</h2>
      {loading ? (
        <p>Verifying...</p>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}

export default Verify;
