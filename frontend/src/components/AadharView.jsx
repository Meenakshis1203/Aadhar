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
      <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card style={{ borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }}>
            <CardContent style={{ padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
          
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  Aadhar Card
                </Typography>
                <div style={{ width: "50px" }}></div>
              </div>
              <Typography variant="body1" style={{ marginTop: "20px" }}>
                Name: {firstName} {lastName}
              </Typography>
              <Typography variant="body1">
                Aadhar Number: {aadharNumber}
              </Typography>
              <Typography variant="body1">
                Email: {email}
              </Typography>
              <Typography variant="body1">
                Phone: {phoneNumber}
              </Typography>
              <Typography variant="body1">
                Address: {homeAddress}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
}
