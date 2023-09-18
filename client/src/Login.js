import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

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
          localStorage.setItem('username', (res.data[0].map((ans)=> ans.username)));
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

  useEffect(() => {
    const logindash = localStorage.getItem('logindash');

    if (logindash === 'true') {
      nav('/home');
    }
  }, [nav]);


  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h1 className='mb-0 fs-2 fst-italic'>DashBoard</h1>
        <h1 className='mb-2 fs-5 fst-italic'>Login</h1>
        <div>
          <input
            type="text"
            value={username}
            placeholder="Enter a name"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            placeholder="Enter an password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <input type='submit' className='btn btn-outline-success' value={`submit`} />
      </form>
    </div>
  );
}
