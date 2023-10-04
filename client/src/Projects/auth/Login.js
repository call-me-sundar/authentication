import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SVG from './SVG';
import Timer from './Timer';
import { useAuth } from './UseAuth';
import Loader from '../Loader/Loader';

export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState();
  const [givenOtptp, setGivenOtp] = useState();
  const [time, setTime] = useState(false);
  const [details, setDetails] = useState();
  const [loader, setLoader] = useState(false);
  const { verify, setVerify } = useAuth();


  let nav = useNavigate('');

  let close = document.getElementById('modalClose');
  const modalButton = document.getElementById('myModalButton');

  const checkUser = async () => {
    await axios.post('http://localhost:5000/login', {
      username,
      password
    })
      .then(async res => {
        setLoader(true)
        setDetails(res.data[0][0].username);
        if (res.status === 200) {
          modalButton.click();
          let newRes = await axios.post('http://localhost:5000/otp', {
            username
          });
          setOtp(newRes.data);
          console.log(newRes.data);
          // Reset the 'otp' state to an empty string after 30 seconds
          setTimeout(() => {
            setOtp('');
          }, 30000);
          setTime(true);
          localStorage.setItem('username', details);
        } else {
          setTime(false);
        }
      })
      .catch(() => {
        setLoader(false)
        alert('login failed');
        localStorage.setItem('logindash', false);
      }).finally(() => {
        setLoader(false);
      })
  }

  const routeUser = async () => {
    try {
      if (otp === givenOtptp) {
        setLoader(true);
        console.log(true);
        setVerify(true);
        console.log({ verify: verify });
        alert('Login successful');
        close.click();
        setTime(false);
        localStorage.setItem('logindash', true);
        localStorage.setItem('username', details);
        nav("/home");
      } else {
        console.log(false);
        alert('invalid code');
        localStorage.clear('username');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password);
    checkUser();
  };

  const handleForget = () => {
    alert('Still Is Process')
  }

  // password visibilty
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // const logindash = verify;
    const logindash = localStorage.getItem('logindash');

    if (logindash === 'true' || logindash === true) {
      nav('/home');
    }
  }, [nav]);


  return (
    <div className='login text-secondary px-5 px-md-0'>
      {loader && <Loader />}
      <Link to={'/signup'} className='m-0 fs-5 fw-semibold d-flex align-items-center justify-content-center position-absolute top-0 end-0 m-3 pointer text-decoration-none'>Signup<i className="bi bi-arrow-right px-2 mt-1"></i></Link>
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
              type={`${showPassword ? 'text' : 'password'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              id='password'
            />
            <a onClick={togglePasswordVisibility}
              className='text-white position-absolute top-50 end-0 translate-middle-y d-flex h-100 justify-content-center align-items-center p-3 pointer'>
              <i className={`bi bi-eye-slash ${showPassword ? 'd-none' : 'd-block'}`}></i>
              <i className={`bi bi-eye ${showPassword ? 'd-block' : 'd-none'}`}></i>
            </a>
          </div>
        </div>
        <input type='submit' className='btn btn-primary d-block w-100 py-2_5 mb-3' value={`Submit`} />
        <p className='fs-6 text-center pointer' onClick={handleForget}>Forgot Your Password?</p>
      </form>
      <>
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          id='myModalButton'
        >

        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Confirmation {time && <Timer />}
                </h1>
                <a
                  type="button"
                  className=" text-danger"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setTime(false)}>
                  <i className="bi bi-x-lg border border-0 shadow-none"></i>
                </a>
              </div>
              <div className="modal-body">
                <p className='text-white fw-light'>
                  You have successfully Login But still still We need some confirmation. Please check your email for the OTP (One-Time Password) and enter it into the designated box.
                </p>
                <div className='mb-2'>
                  <label for="otp" className="form-label">Please Given The Valid OTP</label>
                  <input
                    className='w-100 m-0 form-control shadow-none px-3 py-2_5'
                    type="number"
                    required
                    id='otp'
                    value={givenOtptp}
                    onChange={(e) => setGivenOtp(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  id='modalClose'
                  onClick={() => setTime(false)}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={routeUser}>
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </>

      <SVG />
    </div>
  );
}
