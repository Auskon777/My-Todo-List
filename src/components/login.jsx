import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../appStore/userSlice";
import {TextField, Button, Box, Paper} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {status, error} = useSelector((state) => state.user);

  const handleLogin = () => {
    dispatch(loginUser({email, password})).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/");
        setEmail("");
        setPassword("");
      }
    });
  };

  return (
    <div>
      <h2 style={{textAlign: "center", color: "#d6dbdf"}}>Login</h2>
      <Paper
        elevation={10}
        sx={{
          "&.MuiPaper-root": {backgroundColor: "#2c2c2c"},
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "600px",
          padding: "10px",
        }}
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {m: 1},
            display: "flex",
            justifyContent: "center",
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
          <Button
            variant="outlined"
            sx={{
              "&.MuiButton-root": {
                color: "#d6dbdf",
                borderColor: "#e64a19",
                // backgroundColor: "#e64a19",
                "&:hover": {
                  backgroundColor: "#d84315",
                },
              },
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
          {status === "failed" && <p>{error}</p>}
        </Box>
      </Paper>
    </div>
  );
};

export default Login;
