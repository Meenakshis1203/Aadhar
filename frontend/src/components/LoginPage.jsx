import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const LoginPage = ({ setLoggedEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/login', { email, password });
      setLoggedEmail(email);
    } catch (error) {
      if (error?.response?.data?.message) {
        setFormError(error?.response?.data?.message);
        return;
      }
      setFormError(error?.message || error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography sx={{ mb: 1.5, mt: 5 }} variant="h3" component="div">Login</Typography>
      </Grid>
      <Grid item xs={12} md={7}>
        <TextField
          error={!!formError}
          label="Email"
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={7}>
        <TextField
          error={!!formError}
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
        />
      </Grid>
      {
        formError && (
          <Grid item xs={12}>
            {formError}
          </Grid>
        )
      }
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginPage;