import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import EditUserForm from '../components/EditUserForm';
import UserContext from '../contexts/user-context';

const Account = () => {
  const userCtx = useContext(UserContext);
  const { user } = userCtx;
  const history = useHistory();

  useEffect(() => {
    userCtx.getUser();
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
    }
  }, []);

  return (
    <div>
      {!user.fullName ? <div>Loading</div> : <EditUserForm user={user} /> }
    </div>
  );
};

export default Account;
