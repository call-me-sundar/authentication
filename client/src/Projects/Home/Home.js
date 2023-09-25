import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('logindash');
    localStorage.removeItem('username');
    navigate('/');
  };

  useEffect(() => {
    const logindash = localStorage.getItem('logindash');

    if (logindash === 'false' || logindash === null) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <div className='w-100 po p-0 position-sticky top-0'>
        <ul className="nav justify-content-between p-3 px-4 bg-primary align-items-center" >
          <Link to={`/home`} className="navbar-brand text-white fs-4 fst-italic">Navbar</Link>
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
          <div class="dropdown">
            <a class="btn border-0 shadow-none text-white p-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-person-circle fs-4 lh-1"></i>
              <p className='text-white m-0 lh-1 fs-6'>{localStorage.getItem('username')}</p>
            </a>
            <ul class="dropdown-menu p-0" data-bs-theme="dark">
              <li><p class="m-0 text-center text-uppercase" disabled='disabled'>{localStorage.getItem('username')}</p></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link to={`tabledata`} className="dropdown-item">Details</Link></li>
              <li><Link to={'/'} className="dropdown-item" onClick={handleLogout}>Logout</Link></li>
            </ul>
          </div>
        </ul>
      </div>
      <div className='text-white container'>
        <Outlet />
      </div>
    </div>
  );
}
