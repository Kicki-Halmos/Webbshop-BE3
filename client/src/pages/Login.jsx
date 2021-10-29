import React, { useEffect, useContext } from 'react';
import UserContext from '../contexts/user-context';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const userCtx = useContext(UserContext);

  useEffect(() => {
    userCtx.getUser();
  }, [userCtx]);
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
