import "./output.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, NavLink, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './components/Pages/Login';
import Signup from './components/Pages/Signup';
import { UserProvider } from './context/UserContext';
import Body from "./components/Body";

function App() {

  return (
    <UserProvider>
    <Router>
    <Header/>
      <Routes>
        <Route index element={<Body/>} />
        <Route path="home" element={<Body/>} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
 
      </Routes>
  
    </Router>
    </UserProvider>
  );
}

export default App;
