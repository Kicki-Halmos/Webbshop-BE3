/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/user-context';
import AlertMessage from './AlertMessage';

export default function EditUserForm({ user }) {
  const userCtx = useContext(UserContext);
  const message = userCtx.alertMessage;
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    setFormData({
      fullName: user.fullName, email: user.email, phoneNumber: user.phoneNumber, address: user.address,
    });
  }, []);

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    userCtx.updateUser(user._id, formData.fullName, formData.email, formData.phoneNumber, formData.address);
  };
  return (
    <div>
      <h1>Account</h1>
      {message && message !== '' && <AlertMessage message={message} />}
      {formData && (
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="editFullName" className="htmlF-label">Full name</label>
            <input name="fullName" value={formData.fullName} onChange={handleOnChange} type="text" className="form-control" id="editFullName" />
          </div>
          <div className="mb-3">
            <label htmlFor="editEmail" className="htmlF-label">Email address</label>
            <input name="email" value={formData.email} onChange={handleOnChange} type="email" className="form-control" id="editEmail" />
          </div>
          <div className="mb-3">
            <label htmlFor="editPhone" className="form-label">Phone number</label>
            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleOnChange} type="text" className="form-control" id="editPhone" />
          </div>
          <div className="mb-3">
            <label htmlFor="editAddress" className="form-label">Address</label>
            <input name="address" value={formData.address} onChange={handleOnChange} type="text" className="form-control" id="editAddress" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      )}
    </div>
  );
}
