import {useNavigate} from "react-router-dom";
import {Button, Box, Typography, Paper, CardMedia, Card} from "@mui/material";
import todoIllustration from "../assets/todo-image.jfif";
import {useMediaQuery} from "@mui/material";

export default function LandingPage() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div>
      {isMobile ? (
        <Paper
          elevation={5}
          sx={{
            "&.MuiPaper-root": {backgroundColor: "#2c2c2c"},
            margin: "150px 5px 100px 5px",
            width: "fit-content",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{margin: "20px 0px", padding: "5px"}}>
              <Typography variant="h3" color={"#d6dbdf"}>
                Hello!
              </Typography>
              <Typography variant="h4" color={"#d6dbdf"}>
                Welcome to Quick-Do
              </Typography>
            </Box>

            <Box sx={{display: "flex", width: "100%"}}>
              <Card>
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    height: "auto",
                  }}
                  image={todoIllustration}
                />
              </Card>
            </Box>
            <Box sx={{display: "flex", marginTop: "20px", padding: "5px"}}>
              <Typography variant="body1" color={"#aeb6bf"}>
                Organize your tasks effortlessly, stay on top of your goals, and
                boost your productivity. Add, update, and track your to-dos with
                ease. Let’s get things done, one step at a time!
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                margin: "50px 0px 0px 20px",
                width: "fit-content",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  "&.MuiButton-root": {
                    backgroundColor: "#e64a19",
                    color: "#2c2c2c",
                    // backgroundColor: "#e64a19",
                    "&:hover": {
                      backgroundColor: "#d84315",
                    },
                  },
                }}
                onClick={() => {
                  navigate("/signUp");
                }}
              >
                get started
              </Button>
              <Button
                variant="outlined"
                sx={{
                  "&.MuiButton-root": {
                    borderColor: "#e64a19",
                    color: "#d6dbdf",
                    // backgroundColor: "#e64a19",
                    "&:hover": {
                      backgroundColor: "#d84315",
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
          </Box>
        </Paper>
      ) : (
        <Paper
          elevation={5}
          sx={{
            "&.MuiPaper-root": {backgroundColor: "#2c2c2c"},
            margin: "200px 20px 100px 20px",
            width: "100%",
            padding: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",

              justifyContent: "space-between",
            }}
          >
            <Box sx={{marginTop: "20px", marginRight: "20px", width: "40%"}}>
              <Typography variant="h3" color={"#d6dbdf"}>
                Hello!
              </Typography>
              <Typography variant="h4" color={"#d6dbdf"}>
                Welcome to Quick-Do
              </Typography>

              <Typography variant="h6" color={"#aeb6bf"}>
                Organize your tasks effortlessly, stay on top of your goals, and
                boost your productivity. Add, update, and track your to-dos with
                ease. Let’s get things done, one step at a time!
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  margin: "50px 0px 0px 20px",
                  width: "220px",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    "&.MuiButton-root": {
                      backgroundColor: "#e64a19",
                      color: "#2c2c2c",
                      // backgroundColor: "#e64a19",
                      "&:hover": {
                        backgroundColor: "#e33333",
                      },
                    },
                  }}
                  onClick={() => {
                    navigate("/signUp");
                  }}
                >
                  get started
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    "&.MuiButton-root": {
                      borderColor: "#e64a19",
                      color: "#d6dbdf",
                      // backgroundColor: "#e64a19",
                      "&:hover": {
                        backgroundColor: "#e33333",
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
            </Box>
            <Box sx={{marginRight: "50px"}}>
              <Card>
                <CardMedia
                  component="img"
                  sx={{
                    width: "500px",
                    minHeight: "350px",
                    maxHeight: "450px",
                  }}
                  image={todoIllustration}
                />
              </Card>
            </Box>
          </Box>
        </Paper>
      )}
    </div>
  );
}
