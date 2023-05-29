import React, { Component, useContext} from 'react';
import AuthContext from '../context/AuthContext';

const Login = () => {
  let {loginUser}= useContext(AuthContext)


      return (
          <div className="auth-wrapper">
          <div className="auth-inner">
          <form onSubmit={loginUser}>
          <h3>Log In</h3>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="alimoses_@gmail.com"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="********"
            />
          </div>
          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me?
              </label>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </form>
          </div>
        </div>

      )
      

    
  }
export default Login
