import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Singup = (props) => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const { name, email, password, cpassword } = credentials;
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json();
        if (json.status === true) {
            localStorage.setItem("token", json.authToken);
            navigate('/');
            props.showAlert('Account Created Successfully', 'success');
        } else {
            props.showAlert('Check Details', 'danger');
        }
    }
    return (
        <div className='mt-2'>
            <h2>Singup</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={credentials.name} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp" required />
                    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} value={credentials.cpassword} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Singup
