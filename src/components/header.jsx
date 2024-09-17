import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import {logoutUser} from "../Features/userSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {useState} from "react";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.user.user); // Assuming user is stored in Redux

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <AppBar
        sx={{
          marginBottom: 5,
          "&.MuiPaper-root": {
            backgroundColor: "#2c2c2c",
          },
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box>
              <Typography color={"#e64a19"}>Quick-Do</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
              }}
            >
              <IconButton
                sx={{
                  color: "#e64a19",
                  m: 2,
                  margin: "2px",
                  backgroundColor: "#333333",
                  width: "2.5rem",
                }}
                variant="outlined"
                onClick={handleMenuOpen}
              >
                <AccountCircleOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: "#333333",
            color: "white",
          },
        }}
      >
        {user ? (
          <Box>
            <MenuItem disabled>{user.email}</MenuItem>
            <MenuItem sx={{color: "#e64a19"}} onClick={handleLogout}>
              Logout
            </MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem
              sx={{color: "#e64a19"}}
              onClick={() => navigate("/login")}
            >
              Login
            </MenuItem>
            <MenuItem
              sx={{color: "#e64a19"}}
              onClick={() => navigate("/signUp")}
            >
              Sign Up
            </MenuItem>
          </Box>
        )}
      </Menu>
    </div>
  );
}
