/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../contexts/user-context';
import AlertMessage from './AlertMessage';

export default function LoginForm() {
  const userCtx = useContext(UserContext);
  const message = userCtx.alertMessage;
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await userCtx.loginUser(formData.email, formData.password);
    const token = localStorage.getItem('token');
    if (token) {
      history.goBack();
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {message.content && <AlertMessage message={message} />}
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="loginEmail" className="htmlF-label">Email address</label>
          <input name="email" value={formData.email} onChange={handleOnChange} type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label">Password</label>
          <input name="password" value={formData.password} onChange={handleOnChange} type="password" className="form-control" id="loginPassword" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
