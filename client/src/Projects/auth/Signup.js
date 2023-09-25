import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SVG from './SVG';

export default function Signup() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [mail, setMail] = useState('');
    const [showPassword1, setshowPassword1] = useState(false);
    const [showPassword2, setshowPassword2] = useState(false);
    const [otp, setOtp] = useState();
    const [givenOtp, setGivenOtp] = useState();

    let nav = useNavigate('');

    const createUser = async () => {
        try {
            const res = await axios.post('http://localhost:5000/checkuser', {
                username,
                confirmPassword,
                mail
            });
    
            if(password === confirmPassword){
                if (res.status === 200) {
                    alert('User already exists');
                } else if (res.status === 201) {
                    alert('User not found');
                    const modalButton = document.getElementById('myModalButton');
                    modalButton.click();
                    let newRes = await axios.post('http://localhost:5000/otp', {
                        mail
                    });
                    setOtp(newRes.data);
                    console.log(newRes.data);
        
                    // Reset the 'otp' state to an empty string after 30 seconds
                    setTimeout(() => {
                        setOtp('');
                    }, 30000); // 30 seconds
                } else {
                    alert('User not created');
                }
            }else{
                alert("password does not match");
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while creating the user');
        }
    }
    



    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username, mail, confirmPassword);
        createUser();
    };

    // password visibilty
    const togglePasswordVisibility1 = () => {
        setshowPassword1(!showPassword1);
        console.log(showPassword1);
    };

    const togglePasswordVisibility2 = () => {
        setshowPassword2(!showPassword2);
        console.log(showPassword2);
    };

    const checkAndUpdate = ()=>{
        console.log(otp == givenOtp);
    }

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
                        type="email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        required
                        id='mail'
                    />
                </div>
                <div className='mb-3'>
                    <label for="password" className="form-label">Password</label>
                    <div className=' position-relative'>
                        <input
                            className='w-100 m-0 form-control shadow-none px-3 py-2_5'
                            type={`${showPassword1 ? 'text' : 'password'}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            id='password'
                        />
                        <a onClick={togglePasswordVisibility1}
                            className='text-white position-absolute top-50 end-0 translate-middle-y d-flex h-100 justify-content-center align-items-center p-3 pointer'>
                            <i className={`bi bi-eye-slash ${showPassword1 ? 'd-none' : 'd-block'}`}></i>
                            <i className={`bi bi-eye ${showPassword1 ? 'd-block' : 'd-none'}`}></i>
                        </a>
                    </div>
                </div>
                <div className='mb-3'>
                    <label for="confirmpassword" className="form-label">Confirm Password</label>
                    <div className=' position-relative'>
                        <input
                            className='w-100 m-0 form-control shadow-none px-3 py-2_5'
                            type={`${showPassword2 ? 'text' : 'password'}`}
                            value={confirmPassword}
                            onChange={(e) => setconfirmPassword(e.target.value)}
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
                <input type='submit' className='btn btn-primary d-block w-100 py-2_5 mb-3' value={`Register`} />
            </form>
            <SVG />
            <>
                {/* Button trigger modal */}
                <button
                    type="button"
                    className="btn btn-primary d-none z-0"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    id='myModalButton'
                >
                    Launch demo modal
                </button>
                {/* Modal */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Confirmation
                                </h1>
                                <a
                                    type="button"
                                    className=" text-danger"
                                    data-bs-dismiss="modal"
                                    aria-label="Close">
                                    <i className="bi bi-x-lg border border-0 shadow-none"></i>
                                </a>

                            </div>
                            <div className="modal-body">
                                <p className='text-white fw-light'>
                                    You have successfully registered. Please check your email for the OTP (One-Time Password) and enter it into the designated box.
                                </p>
                                <div className='mb-2'>
                                    <label for="otp" className="form-label">Please Given The Valid OTP</label>
                                    <input
                                        className='w-100 m-0 form-control shadow-none px-3 py-2_5'
                                        type="number"
                                        value={givenOtp}
                                        onChange={(e) => setGivenOtp(e.target.value)}
                                        required
                                        id='otp'
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button type="button" onClick={checkAndUpdate} className="btn btn-primary">
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </div>
    );
}
