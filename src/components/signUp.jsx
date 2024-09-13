import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signUpUser} from "../appStore/userSlice";
import {TextField, Button, Box, Paper, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {status, error} = useSelector((state) => state.user);

  const handleSignUp = () => {
    dispatch(signUpUser({email, password})).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setEmail("");
        setPassword("");
        navigate("/");
      }
    });
  };

  return (
    <div>
      <h2 style={{textAlign: "center", color: "#d6dbdf"}}>Sign Up</h2>
      <Box
        sx={{
          marginTop: "50px",
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: "center",
          alignItems: "center",
          width: "56px",
          height: "56px",
          backgroundColor: "#2c2c2c",
          borderRadius: "50%",
          color: "#e64a19",
        }}
      >
        <AccountCircleOutlinedIcon
          sx={{
            fontSize: "28px",
          }}
        />
      </Box>
      <Paper
        elevation={10}
        sx={{
          "&.MuiPaper-root": {backgroundColor: "#2c2c2c"},
          maxWidth: "500px",
          margin: "40px auto 0px auto",
          padding: "10px",
        }}
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {m: 2},
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            flexDirection: "column",
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
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={{marginTop: "20px"}}>
            <Button
              variant="outlined"
              sx={{
                "&.MuiButton-root": {
                  color: "#d6dbdf",
                  width: "10rem",
                  borderColor: "#e64a19",
                  // backgroundColor: "#e64a19",
                  "&:hover": {
                    backgroundColor: "#d84315",
                  },
                },
              }}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </Box>
          {status === "failed" && <p>{error}</p>}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Box>
              <Typography color={"#d6dbdf"}>
                Already have an account?
              </Typography>
            </Box>

            <Button
              sx={{
                "&.MuiButton-root": {
                  color: "#e64a19",
                  width: "5.5rem",
                  // backgroundColor: "#e64a19",
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
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default SignUp;
