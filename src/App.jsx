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

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path='/user' element={<Layout />} >
                <Route path=":username" element={<UserProfile />} />
                <Route path=":id" element={<UserProfile />} />
                <Route path="license/:username" element={<UserLicense />} />
                <Route path="edit/:username" element={<EditProfile />} />
                <Route path="drivinghours/:id" element={<DrivingHours/>} />
                <Route path="drivinghours/newentry" element={<AddDrivingHours/>}/>
              </Route>              
            </Route>
        </Routes>      
    </BrowserRouter>
    </div>
  );
}

export default App;