import './App.css';
import './login.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import AdminDetails from './AdminDetails';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/admindetails' element={<AdminDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
