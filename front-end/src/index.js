import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Adminlogin from './pages/adminlogin';
import AdminDashboard from './pages/AdminDashboard'; 
import Navbar from './pages/navbar';
import Students from './pages/students';
import View from './pages/view';
import CheckStudent from './pages/testStudent';
import ChickStudent1 from './pages/chickStudent';
import Addstudent from './pages/addstudent';
import Success from './pages/success';
import Editstudent from './pages/editstudent';

const root = ReactDOM.createRoot(document.getElementById('root'));

const isAuthenticated = localStorage.getItem('userRole') === 'admin';

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<CheckStudent />} />
        <Route
          path="/adminDashboard"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <AdminDashboard />
              </>
            ) : (
              <Navigate to="/adminlogin" />
            )
          }
        />
        <Route
          path="/adminlogin"
          element={
            isAuthenticated ? (
              <Navigate to="/adminDashboard" />
            ) : (
              <Adminlogin />
            )
          }
        />
        <Route
          path="/students"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <Students />
              </>
            ) : (
              <Navigate to="/adminlogin" />
            )
          }
        />
        <Route
          path="/view"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <View />
              </>
            ) : (
              <Navigate to="/adminlogin" />
            )
          }
        />
        <Route
          path="/ChickStudent1"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <ChickStudent1 />
              </>
            ) : (
              <Navigate to="/adminlogin" />
            )
          }
        />
        <Route
          path="/addstudent"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <Addstudent />
              </>
            ) : (
              <Navigate to="/adminlogin" />
            )
          }
        />
        <Route
          path="/success"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <Success />
              </>
            ) : (
              <Navigate to="/adminlogin" />
            )
          }
        />
        <Route
          path="/edstudents"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <Editstudent />
              </>
            ) : (
              <Navigate to="/adminlogin" />
            )
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();
