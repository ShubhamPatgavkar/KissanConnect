import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import '../styles/Register.css';
import axios from 'axios';

const Register = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const phoneNumber = e.target[3].value;

        // Validation for required fields
        if (!displayName || !email || !password || !phoneNumber) {
            setErr(true);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'All fields are required!',
            });
            return;
        }

        setLoading(true);
        
        try {
            // Simulate registration logic (replace with actual backend API call)
            // You can replace this with an actual API call to your backend for user registration
            const formData = {
                displayName,
                email,
                password,
                phoneNumber,
            };
            
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);

            // Simulate sending the data to your backend API
            // Example: await axios.post('/api/register', formData);
            
            // After successful registration (you can handle response accordingly)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Registered successfully',
                showConfirmButton: true,
                timer: 1500
            });
            navigate("/login");

        } catch (err) {
            setErr(true);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registerPage"> {/* Add this class to apply styles */}
            <div className='formWrapper'>
                <span className="logo">KisanConnect</span>
                <span className="title">Register Yourself</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Name' />
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder='Password' />
                    <input type="text" placeholder='Phone Number' />
                    <button disabled={loading}>Sign up</button>
                    {loading && "Please wait..."}
                    {err && <span>Something went wrong!</span>}
                </form>
                <p>You already have an account? <Link to="/login">Login</Link> </p>
            </div>
        </div >
    );
};

export default Register;
