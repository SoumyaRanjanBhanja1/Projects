import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate=useNavigate();



  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:15000/api/signup', { email, password });
      console.log('Signup successful:', response.data);
      navigate("/Login");
    } catch (error) {
      console.error("Signup failed:", error);
      alert(error.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <h2>Signup</h2>
      <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleSignup} disabled={loading}>
      {loading ? "Signing up..." : "Signup"}
      </Button>
    </Container>
  );
};

export default Signup;
