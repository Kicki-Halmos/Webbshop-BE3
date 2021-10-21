/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import UserContext from '../contexts/user-context';
import ErrorMessage from './ErrorMessage';

export default function RegisterForm() {
  const userCtx = useContext(UserContext);
  const message = userCtx.errorMessage;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    userCtx.registerUser(
      formData.fullName,
      formData.email,
      formData.password,
      formData.phoneNumber,
      formData.address,
    );
  };

  return (
    <div>
      <h1>Register</h1>
      {message !== '' && <ErrorMessage message={message} />}
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="registerFullName" className="htmlF-label">Full name</label>
          <input name="fullName" value={formData.fullName} onChange={handleOnChange} type="text" className="form-control" id="registerFullName" />
        </div>
        <div className="mb-3">
          <label htmlFor="registerEmail" className="htmlF-label">Email address</label>
          <input name="email" value={formData.email} onChange={handleOnChange} type="email" className="form-control" id="registerEmail" />
        </div>
        <div className="mb-3">
          <label htmlFor="registerPassword" className="form-label">Password</label>
          <input name="password" value={formData.password} onChange={handleOnChange} type="password" className="form-control" id="registerPassword" />
        </div>
        <div className="mb-3">
          <label htmlFor="registerPhone" className="form-label">Phone number</label>
          <input name="phoneNumber" value={formData.phoneNumber} onChange={handleOnChange} type="text" className="form-control" id="registerPhone" />
        </div>
        <div className="mb-3">
          <label htmlFor="registerAddress" className="form-label">Address</label>
          <input name="address" value={formData.address} onChange={handleOnChange} type="text" className="form-control" id="registerAddress" />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}
