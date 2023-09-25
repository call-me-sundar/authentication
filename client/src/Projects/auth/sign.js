import React, { useState } from 'react';
import axios from 'axios';

export default function Signup() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [error, setError] = useState('');

    const createUser = async () => {
        try {
            const response = await axios.post('http://localhost:5000/create', {
                username,
                confirmPassword,
                mail: email, // Ensure you use the correct field name
            });

            if (response.status === 200) {
                alert('New user created');
            } else if (response.status === 201) {
                alert('User already exists');
            } else {
                alert('User not created');
            }
        } catch (error) {
            setError('An error occurred while creating the user');
            console.error(error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Add your form validation logic here before creating the user

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Call createUser() if validation passes
        createUser();
    };

    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };

    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    return (
        <div className='login text-secondary'>
            <Link to={'/'} className='m-0 fs-5 fw-semibold d-flex align-items-center justify-content-center position-absolute top-0 end-0 m-3 pointer'>Login<i className="bi bi-arrow-right px-2 mt-1"></i></Link>
            <form className='text-start z-3' onSubmit={handleSubmit}>
                <h1 className='text-primary mb-0 fs-3'>Here you can Signup</h1>
                <p className='text-secondary fw-semibold'>Let's join us :)</p>
                <div className='mb-2'>
                    <label for="username" className="form-label">User Name</label>
                    <input
                        className='w-100 m-0 form-control shadow-none px-3 py-2_5'
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        id='username'
                    />
                </div>

                <div className='mb-2'>
                    <label for="mail" className="form-label">Email</label>
                    <input
                        className='w-100 m-0 form-control shadow-none px-3 py-2_5'
                        type="mail"
                        value={mail}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        id='mail'
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                    <div className=' position-relative'>
                        <input
                            className='w-100 m-0 form-control shadow-none px-3 py-2_5'
                            type={`${showPassword2 ? 'text' : 'password'}`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            id='confirmpassword'
                        />
                        <a onClick={togglePasswordVisibility2}
                            className='text-white position-absolute top-50 end-0 translate-middle-y d-flex h-100 justify-content-center align-items-center p-3 pointer'>
                            <i className={`bi bi-eye-slash ${showPassword2 ? 'd-none' : 'd-block'}`}></i>
                            <i className={`bi bi-eye ${showPassword2 ? 'd-block' : 'd-none'}`}></i>
                        </a>
                    </div>
                </div>
                {error && <div className="text-danger">{error}</div>}
                <input type='submit' className='btn btn-primary d-block w-100 py-2_5 mb-3' value={`Submit`} />
            </form>
            <SVG />
        </div>
    );
}
