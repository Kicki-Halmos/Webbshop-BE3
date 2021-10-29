import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      history.push('/');
    }
  }, [history]);

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Register;
