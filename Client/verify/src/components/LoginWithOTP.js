import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginWithOTP = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');


  const navigate=useNavigate();

  const sendOtp = async () => {
    try {
        const response = await axios.post('http://localhost:15000/api/send-otp', { email });
        console.log(response.data);
        setOtpSent(true);
      } catch (err) {
        console.error('Send OTP failed:', err.response?.data || err.message);
        alert(err.response?.data?.message || 'Failed to send OTP');
      }
  };

  const verifyOtp = async () => {
    try{
      const response = await axios.post('http://localhost:15000/api/verify-otp', { email, otp });
      axios.defaults.headers.common['Authoriztion']=`Bearer${response.data.token}`
      localStorage.setItem('token', response.data.token);
      console.log(response.data.token,'Login successful');
      navigate("/");
    }catch(error){
      console.log(error,'Invalid OTP');
    }
  };

  return (
    <Container>
      <h2>Login with OTP</h2>
      <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
      {!otpSent ? (
        <Button variant="contained"  onClick={sendOtp}>Send OTP</Button>
      ) : (
        <>
          <TextField label="OTP" fullWidth margin="normal" value={otp} onChange={e => setOtp(e.target.value)} />
          <Button variant="contained" onClick={verifyOtp}>Verify OTP</Button>
        </>
      )}
    </Container>
  );
};

export default LoginWithOTP;
