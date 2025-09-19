import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page since we have a dedicated home page now
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
};

export default Index;
