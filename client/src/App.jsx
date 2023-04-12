import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './components/auth/Login';
import AdminPanel from './components/auth/Admin';
import UserPanel from './components/auth/User.jsx';
import RegisterForm from './components/auth/RegisterForm';
import CheckOut from './components/CheckOut';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route path="/user" element={<UserPanel />}/>
        <Route path="/checkout" element={<CheckOut />}/>

        <Route path="/admin" element={<AdminPanel />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
