import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import { isAuth } from './components/auth/token/Token';
import { UserProvider } from './components/context/user/UserContext';
import { VehicleProvider } from './components/context/vehicle/VehicleContext';
import Plus from './components/base/plus/Plus';
import Edit from './components/base/edit/Edit';
import VehicleForm from './components/base/vehicle-form/VehicleForm';

ReactDOM.render(
  <React.StrictMode>
    <VehicleProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivateOutlet />}>
              <Route path="/app" element={<App />} />
              <Route path="/plus" element={<Plus />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/form" element={<VehicleForm />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </VehicleProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

export function PrivateOutlet() {
  const auth = isAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}
