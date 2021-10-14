import React, { useState } from 'react';

export default function RegisterForm() {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    })

    const handleOnChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleOnSubmit =  (e) => {
        e.preventDefault();
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
                    <label htmlFor="registerPhone" className="form-label">Phone</label>
                    <input name="phone" value={formData.phone} onChange={handleOnChange} type="text" className="form-control" id="registerPhone"></input>
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
