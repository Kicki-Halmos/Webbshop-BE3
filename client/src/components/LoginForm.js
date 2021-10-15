import React, { useState } from 'react';
import { userApis } from '../api/api'
import { useHistory } from 'react-router-dom';

export default function LoginForm() {

    const {login} = userApis;
    const history = useHistory();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleOnChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleOnSubmit =  (e) => {
        e.preventDefault();
        login(formData.email, formData.password)
        .then((res) => {
            localStorage.setItem('jwt', res.data.token);
            history.push('/products');
        })
        .catch((err) => {
            alert(err.response.data.data.message);
        })
    }

    return ( 
        <div>
            <h1>Login</h1>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="loginEmail" className="htmlF-label">Email address</label>
                    <input name="email" value={formData.email} onChange={handleOnChange} type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">Password</label>
                    <input name="password" value={formData.password} onChange={handleOnChange} type="password" className="form-control" id="loginPassword"></input>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>  
        </div> 
    )
}
