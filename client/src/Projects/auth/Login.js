import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SVG from './SVG';

export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  let nav = useNavigate('');

  const getData = async () => {
    await axios.post('http://localhost:5000/login', {
      username,
      password
    })
      .then(res => {
        if (res.status === 200) {
          // alert('successful')
          localStorage.setItem('logindash', true);
          nav("/home");
          localStorage.setItem('username', (res.data[0].map((ans) => ans.username)));
        }
      })
      .catch(() => {
        alert('login failed');
        localStorage.setItem('logindash', false);
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password);
    getData();
  };

  const handleForget = () => {
    alert('Still Is Process')
  }

  // password visibilty
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    console.log(showPassword);
  };

  useEffect(() => {
    const logindash = localStorage.getItem('logindash');

    if (logindash === 'true') {
      nav('/home');
    }
  }, [nav]);


  return (
    <div className='login text-secondary'>
      <Link to={'/signup'} className='m-0 fs-5 fw-semibold d-flex align-items-center justify-content-center position-absolute top-0 end-0 m-3 pointer'>Signup<i class="bi bi-arrow-right px-2 mt-1"></i></Link>
      <form className='text-start z-3' onSubmit={handleSubmit}>
        {/* <h1 className='mb-0 fs-2 fst-italic text-white'>DashBoard</h1>
        <h1 className='mb-2 fs-5 fst-italic text-white'>Login</h1> */}
        <h1 className='text-primary mb-0 fs-3'>Here you can Login</h1>
        <p className='text-secondary fw-semibold'>Let's join us :)</p>
        <div className='mb-2'>
          <label for="username" className="form-label">User Name or Email</label>
          <input
            className='w-100 m-0 form-control shadow-none px-3 py-2_5'
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
            id='username'
          />
        </div>
        <div className='mb-3'>
          <label for="password" className="form-label">Password</label>
          <div className=' position-relative'>
            <input
              className='w-100 m-0 form-control shadow-none px-3 py-2_5'
              type= {`${showPassword? 'text':'password'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              id='password'
            />
            <a onClick={togglePasswordVisibility}
             className='text-white position-absolute top-50 end-0 translate-middle-y d-flex h-100 justify-content-center align-items-center p-3 pointer'>
              <i className = {`bi bi-eye-slash ${showPassword ? 'd-none':'d-block'}`}></i>
              <i className={`bi bi-eye ${showPassword ? 'd-block':'d-none'}`}></i>
            </a>
          </div>
        </div>
        <input type='submit' className='btn btn-primary d-block w-100 py-2_5 mb-3' value={`Submit`} />
        <p className='fs-6 text-center pointer' onClick={handleForget}>Forgot Your Password?</p>
      </form>
      <SVG />
    </div>
  );
}