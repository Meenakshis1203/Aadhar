import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const AadharCreate = ({ setLoggedEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [formError, setFormError] = useState('');
  const [formMessage, setFormMessage] = useState('');
 
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setFormError('');
      setFormMessage('');
      await axios.post('http://localhost:8000/aadhar', { email, password, firstName, lastName, phoneNumber, homeAddress });
      setFormMessage(`Aadhar created for user: ${firstName} ${lastName}`);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setHomeAddress("");
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
        <Typography sx={{ mb: 1.5, mt: 5 }} variant="h3" component="div">Create aadhar</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          error={!!formError}
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          error={!!formError}
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          error={!!formError}
          label="Email"
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
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
      <Grid item xs={12} md={6}>
        <TextField
          error={!!formError}
          label="Phone Number"
          variant="outlined"
          type="text"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          error={!!formError}
          label="Home Address"
          variant="outlined"
          type="text"
          value={homeAddress}
          onChange={(event) => setHomeAddress(event.target.value)}
          fullWidth
        />
      </Grid>
      {
        (formError || formMessage) && (
          <Grid item xs={12}>
            {formError} {formMessage}
          </Grid>
        )
      }
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Create
        </Button>
      </Grid>
    </Grid>
  );
};

export default AadharCreate;