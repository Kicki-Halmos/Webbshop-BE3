import React, {useState, useEffect} from 'react';
import { userApis } from '../api/api';
const { updateUser } = userApis;


export default function EditUserForm({user}) {

    useEffect(() => {
        setFormData({fullName: user.fullName, email: user.email, phoneNumber: user.phoneNumber, address: user.address})
	}, []);

    const [formData, setFormData] = useState(null);

    const handleOnChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        updateUser(user._id, formData.fullName, formData.email, formData.phoneNumber, formData.address);
    }
    return (
        <div>
            <h1>Account</h1>
            {formData && (
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="editFullName" className="htmlF-label">Full name</label>
                    <input name="fullName" value={formData.fullName} onChange={handleOnChange} type="text" className="form-control" id="editFullName"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="editEmail" className="htmlF-label">Email address</label>
                    <input name="email" value={formData.email} onChange={handleOnChange} type="email" className="form-control" id="editEmail"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="editPhone" className="form-label">Phone number</label>
                    <input name="phoneNumber" value={formData.phoneNumber} onChange={handleOnChange} type="text" className="form-control" id="editPhone"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="editAddress" className="form-label">Address</label>
                    <input name="address" value={formData.address} onChange={handleOnChange} type="text" className="form-control" id="editAddress"></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form> 
            )}
        </div> 
    )
}
