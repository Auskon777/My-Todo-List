import {sendPasswordResetEmail} from "firebase/auth";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {auth} from "../config/fireBase";
import {useNavigate} from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
      setEmail("");
    } catch (error) {
      if (error.code == "auth/user-not-found") {
        setError("No account associated with this email");
      } else if (error.code == "auth/invalid-email") {
        setError("invalid email address");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      {emailSent ? (
        <Paper
          elevation={10}
          sx={{
            "&.MuiPaper-root": {backgroundColor: "#2c2c2c"},
            maxWidth: "500px",
            margin: "40px auto 0px auto",
            padding: "10px",
            marginTop: "150px",
            marginBottom: "100px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px 10px",
              marginTop: "20px",
            }}
          >
            <Box>
              <Typography variant="h6" color={"#d6dbdf"}>
                Email has been sent!
              </Typography>
            </Box>
            <Box sx={{marginTop: "15px", width: "90%"}}>
              <Typography variant="body2" color={"#aeb6bf"}>
                please check your inbox and click the received link to reset
                your password
              </Typography>
            </Box>
            <Box
              sx={{
                marginTop: "50px",
                display: "flex",
                marginLeft: "auto",
                marginRight: "auto",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "auto",
                backgroundColor: "#2c2c2c",
                color: "#e64a19",
                marginBottom: "50px",
              }}
            >
              <MarkEmailReadIcon sx={{fontSize: "100px"}} />
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
                onClick={() => {
                  navigate("/login");
                }}
              >
                login
              </Button>
            </Box>
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "25px",
              }}
            >
              <Box>
                <Typography variant="body2" color={"#d6dbdf"}>
                  Didn't receive the email?
                </Typography>
              </Box>

              <Button
                sx={{
                  "&.MuiButton-root": {
                    color: "#e64a19",
                    width: "5.5rem",
                    "&:hover": {
                      color: "#d6dbdf",
                    },
                  },
                }}
                onClick={() => {
                  navigate("/forgotPassword");
                }}
              >
                resend
              </Button>
            </Box> */}
          </Box>
        </Paper>
      ) : (
        <Paper
          elevation={10}
          sx={{
            "&.MuiPaper-root": {backgroundColor: "#2c2c2c"},
            maxWidth: "500px",
            margin: "40px auto 0px auto",
            padding: "10px",
            marginTop: "150px",
            marginBottom: "100px",
          }}
        >
          <Box>
            <Typography variant="h5" color={"#d6dbdf"}>
              Reset Password
            </Typography>
            <Box sx={{marginTop: "15px", width: "90%"}}>
              <Typography variant="body2" color={"#aeb6bf"}>
                Please enter the email address associated with your account, and
                we’ll send you instructions to reset your password.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "50px",
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "auto",
              backgroundColor: "#2c2c2c",
              color: "#e64a19",
            }}
          >
            <EmailIcon sx={{fontSize: "100px"}} />
          </Box>
          <Box
            component="form"
            sx={{
              m: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 20px",
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
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "fit-content",
              paddingRight: "50px",
              marginLeft: "auto",
              marginTop: "5px",
            }}
          >
            <Box>
              <Typography fontSize={"0.8rem"} color={"#aeb6bf"}>
                Remember password?
              </Typography>
            </Box>

            <Button
              sx={{
                "&.MuiButton-root": {
                  color: "#e64a19",
                  width: "5.5rem",
                  // backgroundColor: "#e64a19",
                  "&:hover": {
                    color: "#d6dbdf",
                  },
                },
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </Box>

          <Box
            sx={{display: "flex", margin: "20px 0px", justifyContent: "center"}}
          >
            {error && <Typography color={"red"}>{error}</Typography>}
          </Box>

          <Box
            sx={{display: "flex", justifyContent: "center", margin: "25px 0px"}}
          >
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
      )}
    </div>
  );
}
