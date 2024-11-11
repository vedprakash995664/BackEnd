import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../App.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 
  const handleSignup = async (e) => {
    e.preventDefault();
    
    const apiEndpoint = 'http://localhost:3000/api/signup';
    const signupData = {
      name,
      email,
      password
    };

    try {
      const response = await axios.post(apiEndpoint, signupData);
      console.log('Signup Successful', response.data);
      Swal.fire({
        title: 'Signup Successful!',
        text: 'You have successfully signed up.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Navigate to login after closing the alert
        navigate('/login');
      });
    } catch (error) {
      if (error.response) {
        console.error('Signup failed', error.response.data);
        setMessage('Signup failed');
      } else if (error.request) {
        console.error('No response from server', error.request);
        setMessage('No response from server');
      } else {
        console.error('Error during signup', error.message);
        Swal.fire({
            title: 'Error!',
            text: 'Signup failed. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
      }
    }
  };

  return (
    <div>
      <h1>Signup Form</h1>
      <form className="signup-form" onSubmit={handleSignup}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;
