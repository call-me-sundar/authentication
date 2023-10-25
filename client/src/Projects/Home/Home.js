import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/UseAuth';


export default function Home() {
  const navigate = useNavigate();
  const{verify, setVerify}= useAuth();

  const handleLogout = () => {
    setVerify(false);
    console.log({verify:verify});
    localStorage.removeItem('logindash');
    localStorage.removeItem('username');
    navigate('/');
  };

  useEffect(() => {
    // const logindash = verify;
    const logindash = localStorage.getItem('logindash');

    if (logindash === 'false' || logindash === null || logindash === false || logindash === ' ' || logindash === undefined) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <div className='w-100 po p-0 position-fixed top-0'>
        <ul className="nav justify-content-between p-3 px-4 bg-primary align-items-center" >
          <Link to={`/home`} className="navbar-brand text-white fs-4 fst-italic">
            <img src='https://cdn-icons-png.flaticon.com/128/7211/7211037.png' height={'30px'}></img>
          </Link>
          <ul className="nav">
            <li className="nav-item">
              <Link className='nav-link text-white p-0' to={`/home`}><i className="bi bi-house text-white px-2"></i><span className='d-none'>Home</span></Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link text-white p-0' to={`tabledata`}><i className="bi bi-table text-white px-2"></i></Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link text-white p-0' to={`admindetails`}><i className="bi bi-clipboard2-data text-white px-2"></i></Link>
            </li>
          </ul>
          <div className="dropdown">
            <button className="btn border-0 shadow-none text-white p-0" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {/* <i className="bi bi-person-circle fs-4 lh-1"></i> */}
              <img src='https://cdn-icons-png.flaticon.com/128/8484/8484965.png?ga=GA1.1.1226172865.1686724363' className='p-2' height={'45px'}></img>
              <span className='text-white m-0 lh-1 fs-6'>{localStorage.getItem('username')}</span>
            </button>
            <ul className="dropdown-menu p-0" data-bs-theme="dark">
              <li><p className="m-0 text-center text-uppercase" disabled='disabled'>{localStorage.getItem('username')}</p></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link to={`tabledata`} className="dropdown-item">Details</Link></li>
              <li><Link to={'/'} className="dropdown-item" onClick={handleLogout}>Logout</Link></li>
            </ul>
          </div>
        </ul>
      </div>
      <div className='text-white container' style={{"minHeight":"100vh","display":"flex","justifyContent":"center","alignItems":"center"}}>
        <Outlet />
      </div>
    </div>
  );
}
