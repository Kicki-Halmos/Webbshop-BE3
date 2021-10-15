import React, { useState } from 'react';
import { userApis } from '../api/api';
import { useHistory } from 'react-router-dom';


export default function RegisterForm() {

    const {register} = userApis;
    const history = useHistory();


    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: ''
    })

    const handleOnChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        register(formData.fullName, formData.email, formData.password, formData.phoneNumber, formData.address)
        .then(() => {
                history.push('/login');
        })
        .catch((err) => {
            alert(err.response.data.data.message);
        })
    }

    return ( 
        <div>
            <h1>Register</h1>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="registerFullName" className="htmlF-label">Full name</label>
                    <input name="fullName" value={formData.fullName} onChange={handleOnChange} type="text" className="form-control" id="registerFullName"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="registerEmail" className="htmlF-label">Email address</label>
                    <input name="email" value={formData.email} onChange={handleOnChange} type="email" className="form-control" id="registerEmail"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label">Password</label>
                    <input name="password" value={formData.password} onChange={handleOnChange} type="password" className="form-control" id="registerPassword"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="registerPhone" className="form-label">Phone number</label>
                    <input name="phoneNumber" value={formData.phoneNumber} onChange={handleOnChange} type="text" className="form-control" id="registerPhone"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="registerAddress" className="form-label">Address</label>
                    <input name="address" value={formData.address} onChange={handleOnChange} type="text" className="form-control" id="registerAddress"></input>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>  
        </div> 
    )
}
