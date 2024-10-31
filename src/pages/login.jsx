import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../Features/userSlice";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Typography,
  Button,
  Box,
  Paper,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {useMediaQuery} from "@mui/material";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {status, error} = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser({email, password}));
    if (loginUser.fulfilled.match(result)) {
      navigate("/home");
      setEmail("");
      setPassword("");
    }
    if (loginUser.rejected.match(result)) {
      toast.error(result.payload || "Login failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <h2 style={{textAlign: "center", color: "#d6dbdf"}}>Login</h2>
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
        elevation={8}
        sx={{
          "&.MuiPaper-root": {backgroundColor: "#2c2c2c"},
          maxWidth: "500px",
          margin: isMobile ? "40px 20px 0px 20px" : "40px auto 0px auto",
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
            label="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: {color: "#aeb6bf"},
            }}
            sx={{
              input: {color: "#aeb6bf"},
              width: "100%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#424949",
                },
                "&:hover fieldset": {
                  borderColor: "#e64a19",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#424949",
                },
              },
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{color: "#d6dbdf"}}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: {color: "#aeb6bf"},
            }}
            sx={{
              input: {color: "#aeb6bf"},
              width: "100%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#424949",
                },
                "&:hover fieldset": {
                  borderColor: "#e64a19",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#424949",
                },
              },
            }}
          />
          <Box sx={{display: "flex", alignItems: "center", marginLeft: "auto"}}>
            <Button
              sx={{
                "&.MuiButton-root": {
                  color: "#e64a19",
                  width: "12.5rem",
                  fontSize: "0.7rem",
                  "&:hover": {
                    color: "#d6dbdf",
                  },
                },
              }}
              onClick={() => {
                navigate("/forgotPassword");
              }}
            >
              forgot password?
            </Button>
          </Box>
          <Box sx={{marginTop: "20px"}}>
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
              onClick={handleLogin}
            >
              {status === "loading" ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </Box>
          <ToastContainer />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "25px",
            }}
          >
            <Box>
              <Typography variant="body2" color={"#d6dbdf"}>
                Don't have an account?
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
                navigate("/signUp");
              }}
            >
              Sign up
            </Button>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default Login;
