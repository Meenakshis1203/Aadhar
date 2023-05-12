import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardMedia from '@mui/material/CardMedia';
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function AadharView({ email }) {
  const [aadhar, setAadhar] = useState();
  const [errorLoading, setErrorLoading] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/aadhar/${email}`
        );
        setAadhar(response.data);
      } catch (error) {
        if (error?.response?.data?.message) {
          setErrorLoading(error?.response?.data?.message);
          return;
        }
        setErrorLoading(error?.message || error);
      }
    })();
  }, [email]);

  if (errorLoading) {
    return <div>Error while loading aadhar: {errorLoading}</div>;
  }

  if (!aadhar) {
    return <div>Loading...!</div>;
  }

  const { firstName, lastName, homeAddress, phoneNumber, aadharNumber } =
    aadhar;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography sx={{ mb: 1.5, mt: 5 }} variant="h3" component="div">
          Aadhar card
        </Typography>
      </Grid>
      <Card sx={{ minWidth: 275 }}>
        <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        <CardContent>
          <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
            {aadharNumber}
          </Typography>
          <Typography color="text.secondary">
            Name: {firstName} {lastName}
          </Typography>
          <Typography color="text.secondary">Email: {email}</Typography>
          <Typography color="text.secondary">Phone: {phoneNumber}</Typography>
          <Typography color="text.secondary">
            Home Address: {homeAddress}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
