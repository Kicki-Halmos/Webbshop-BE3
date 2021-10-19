import React, { useEffect, useContext } from 'react';
import EditUserForm from '../components/EditUserForm';
import UserContext from '../contexts/user-context';

const Account = () => {
  const userCtx = useContext(UserContext);
  const { user } = userCtx;

  useEffect(() => {
    userCtx.getUser();
  }, []);

  return (
    <div>
      {!user.fullName ? <div>Loading</div> : <EditUserForm user={user} /> }
    </div>
  );
};

export default Account;
