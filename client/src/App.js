import './App.css';
import './login.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import AdminDetails from './AdminDetails';
import TableData from './TableData';
import HomeContent from './HomeContent';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
