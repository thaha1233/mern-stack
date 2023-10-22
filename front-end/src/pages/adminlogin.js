import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminlogin.css';

function Adminlogin() {
  const [inputs, setInputs] = useState({});
  const [myres, setMyres] = useState({});
  const navigate = useNavigate();
  
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch('http://localhost:8080/admin/adminlogin', {
      method: 'POST',
      body: JSON.stringify(inputs),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      console.error('Error:', response.status, response.statusText);
      return;
    }
  
    const respwait = await response.json();
    setMyres(respwait);
  
    if (respwait.success) {
      localStorage.setItem('username', inputs.userName);
      localStorage.setItem('userRole', 'admin');
  
      console.log('User successfully logged in.');
      console.log('User role:', localStorage.getItem('userRole'));
  
      navigate('/adminDashboard');
    }
  };
  return (
    <div dir="rtl">
      <div className="d-lg-flex half">
        <div id="bgamin" className="bg order-1 order-md-2 flex-column-reverse" />
        <div className="contents order-2 order-md-1">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-7">
                <div className="mb-4">
                  <h3>
                    {' '}
                    כניסת <span>מנהל </span>
                  </h3>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-group first">
                    <input
                      value={inputs.userName || ''}
                      name="userName"
                      type="text"
                      required
                      className="form-control"
                      id="username"
                      onChange={handleChange}
                      placeholder="שם משתמש"
                    />
                  </div>
                  <div className="form-group last mb-3">
                    <input
                      value={inputs.password || ''}
                      name="password"
                      required
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="סיסמה"
                      onChange={handleChange}
                    />
                  </div>
                  {myres.success ? (
                    navigate('/AdminDashboard')
                  ) : (
                    <h6 id="err-login">{myres.msg}</h6>
                  )}

                  <input type="submit" className="btn btn-block" id="btn" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
