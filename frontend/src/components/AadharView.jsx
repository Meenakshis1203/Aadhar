import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import aadharTop from "../assets/aadhar.png";
import aadharQr from "../assets/qr.png";
import aadharProfile from "../assets/profile.png";

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
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          Aadhar Card
        </Typography>
        <Paper
          style={{
            width:"650px",
            borderRadius: "10px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
            <img
              alt="Aadhar Card banner"
              style={{
                height: "130px",
                width: "100%",
                objectFit: "contain",
              }}
              src={aadharTop} 
            />
            <div style={{
              display: "flex",
              justifyContent: "space-evenly"
            }}>
              <img alt="profile" src={aadharProfile} style={{margin: "5px 0"}} />
              <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <div>
                  <Typography variant="body1" style={{ marginTop: "20px" }}>
                    Name: {firstName} {lastName}
                  </Typography>
                  <Typography variant="body1">Email: {email}</Typography>
                  <Typography variant="body1">Phone: {phoneNumber}</Typography>
                  <Typography variant="body1">Address: {homeAddress}</Typography>
                </div>
                <Typography variant="h4" style={{fontWeight: 800}}>{aadharNumber.replace(/(.{4})/g, "$1 ")}</Typography>
              </div>
              <img alt="qr" src={aadharQr} style={{height: "100px", width: "100px", alignSelf: "flex-end"}} />
            </div>
            <div style={{fontSize: "24px", fontWeight: 800, borderTop: "2px solid #FF0000", marginTop: "15px", padding: "10px 0", textAlign: "center"}}>
              <span style={{color: "#FF0000"}}>आधार</span> - आम आदमी का अधिकार
            </div>
        </Paper>
      </Grid>
    </Grid>
  );
}