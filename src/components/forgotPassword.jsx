import {Box, Button, Paper, TextField} from "@mui/material";
import {useState} from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {};

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
            variant="outlined"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Box>
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <Button
            variant="contained"
            sx={{
              "&.MuiButton-root": {
                color: "#2c2c2c",
                width: "10rem",

                backgroundColor: "#e64a19",
                "&:hover": {
                  backgroundColor: "#d84315",
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
