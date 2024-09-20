import {sendPasswordResetEmail} from "firebase/auth";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {auth} from "../config/fireBase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (error) {
      setMessage(error.message);
    }
    setEmail("");
  };

  return (
    <div>
      <Paper
        elevation={10}
        sx={{
          "&.MuiPaper-root": {backgroundColor: "#2c2c2c"},
          maxWidth: "500px",
          margin: "40px auto 0px auto",
          padding: "10px",
          marginTop: "150px",
        }}
      >
        <Box>
          <Typography variant="h5" color={"#d6dbdf"}>
            {" "}
            Reset Password{" "}
          </Typography>
          <Box sx={{marginTop: "30px"}}>
            <Typography variant="body2" color={"#aeb6bf"}>
              Please enter the email address associated with your account, and
              we’ll send you instructions to reset your password.
            </Typography>
          </Box>
        </Box>
        <Box
          component="form"
          sx={{
            m: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <TextField
            variant="outlined"
            label="Email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            InputLabelProps={{
              style: {color: "#aeb6bf"},
            }}
            sx={{
              input: {color: "#aeb6bf"},
              width: "100%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#aeb6bf",
                },
                "&:hover fieldset": {
                  borderColor: "#e64a19",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#aeb6bf",
                },
              },
            }}
          />
        </Box>
        <Box
          sx={{display: "flex", margin: "20px 0px", justifyContent: "center"}}
        >
          {message && <Typography color={"green"}>{message}</Typography>}
        </Box>
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <Button
            variant="contained"
            sx={{
              "&.MuiButton-root": {
                color: "#e64a19",
                width: "10rem",
                backgroundColor: "#333333",
                border: "1px solid #e64a19",
                "&:hover": {
                  backgroundColor: "#d84315",
                  color: "#d6dbdf",
                },
              },
            }}
            onClick={handleResetPassword}
          >
            send email
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
