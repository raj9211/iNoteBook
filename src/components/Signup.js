import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


const Signup = (props) => {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        //API CALL
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const jsonData = await response.json();
        if (jsonData.success) {
            localStorage.setItem('token', jsonData.authtoken);
            props.showAlert("Account created successfully", "success");
            navigate("/");
        }
        else {
            props.showAlert("Invalid details", "danger");
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <h2 className='my-3'>Create an account to use iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} name="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup