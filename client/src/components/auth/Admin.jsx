import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';

function AdminPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('User:', user);

    
    if (!user) {
        console.log('User is not authenticated');
        navigate('/');
        return;
    }
  

    if (user.roles.indexOf('ROLE_ADMIN') === -1) {

      console.log('User is not an admin');
      setError('You are not authorized to access this page.');
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  }, []);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Welcome to the Admin Panel</h1>
      <Logout />
      {/* Add admin panel content here */}
    </div>
  );
}

export default AdminPanel;