import React, { useState } from "react";
import '../App.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 
    const handleLogin = async (e) => {
        e.preventDefault();
        
        const apiEndpoint = 'http://localhost:3000/api/login';
        const LoginData = {
          email,
          password
        };
    
        try {
          const response = await axios.post(apiEndpoint, LoginData);
          console.log('Loign Successful', response.data);
          Swal.fire({
            title: 'Login Successful!',
            text: 'You have successfully signed up.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Navigate to login after closing the alert
           navigate('/dashboard');
          });
        } catch (error) {
          if (error.response) {
            console.error('Login failed', error.response.data);
            setMessage('Login failed');
          } else if (error.request) {
            console.error('No response from server', error.request);
            setMessage('No response from server');
          } else {
            console.error('Error during Login', error.message);
            Swal.fire({
                title: 'Error!',
                text: 'Login failed. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
              });
          }
        }
      };
    

    return(
        <div>
        <h1>Login Form</h1>
        <form className="signup-form" onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
     
      </div>
    );
};
export default Login;