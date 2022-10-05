import React from 'react';
import { BrowserRouter ,Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import './App.css';
import Register from './views/Register';
import UserProfile from './views/UserProfile';
import Layout from './views/Layout';
import EditProfile from './views/EditProfile';
import UserLicense from './views/UserLicense';
import DrivingHours from './views/DrivingHours';
import AddDrivingHours from './views/AddDrivingHours';
import { useLocalStorage } from './hooks';

export const TokenContext = React.createContext()

function App() {
  const [token, setToken] = useLocalStorage('token', localStorage.getItem('token'))
  return (
    <div className="App">
    <TokenContext.Provider value={[token, setToken]}>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route path='/user' element={<Layout />} >
                  <Route path="profile" element={<UserProfile />} />
                  <Route path="license" element={<UserLicense />} />
                  <Route path="edit" element={<EditProfile />} />
                  <Route path="drivinghours" element={<DrivingHours/>} />
                  <Route path="drivinghours/newentry" element={<AddDrivingHours />}/>
                </Route>              
              </Route>
          </Routes>      
      </BrowserRouter>
    </TokenContext.Provider>  
    </div>
  );
}

export default App;