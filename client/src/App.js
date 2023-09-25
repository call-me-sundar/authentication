import './App.css';
import Home from './Projects/Home/Home';
import HomeContent from './Projects/Home/HomeContent';
import AdminDetails from './Projects/Home/AdminDetails';
import Login from './Projects/auth/Login';
import TableData from './Projects/Home/TableData';
import './login.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Projects/auth/Signup';


function App() {


  return (
    <div className="App bg-dark" style={{height:"100vh", overflowY:"auto"}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/home' element={<Home />}>
            <Route path='' element={<HomeContent/>}/>
            <Route path='admindetails' element={<AdminDetails/>}/>
            <Route path='tabledata' element={<TableData/>}/>
          </Route>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
