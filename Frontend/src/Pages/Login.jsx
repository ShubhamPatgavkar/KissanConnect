import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            // Make a POST request to your backend login endpoint
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            // Handle successful login
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Logged in successfully',
                showConfirmButton: true,
                timer: 1500,
            });

            // Save the token or user data in localStorage/sessionStorage (optional)
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);


            // Redirect to the home page
            navigate('/');
        } catch (error) {
            setErr(true);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response?.data?.message || 'Email or password is incorrect!',
            });
        }
    };

    return (
        <div className="loginPage"> {/* Add class to scope styles */}
            <div className='formWrapper'>
                <span className="logo">KisanConnect</span>
                <span className="title">Login Yourself</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder='Password' />
                    <button>Sign in</button>
                    {err && <span>Something went wrong!</span>}
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link> </p>
            </div>
        </div>
    );
};

export default Login;
