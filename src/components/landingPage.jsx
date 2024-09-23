import {useNavigate} from "react-router-dom";
import {Button, Box, Typography, Paper, CardMedia, Card} from "@mui/material";
import todoIllustration from "../assets/todo-image.jfif";
import {useMediaQuery} from "@mui/material";
import Header from "./header";

export default function LandingPage() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div>
      {isMobile ? (
        <div>
          <Header />
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
                <Typography variant="h4" color={"#d6dbdf"}>
                  Hello!
                </Typography>
                <Typography variant="h5" color={"#d6dbdf"}>
                  Welcome to <span style={{color: "#e64a19"}}> Quick-Do</span>
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
                  Organize your tasks effortlessly, stay on top of your goals,
                  and boost your productivity. Add, update, and track your
                  to-dos with ease. Let’s get things done, one step at a time!
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  margin: "50px 0px 20px 20px",
                  width: "220px",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    "&.MuiButton-root": {
                      backgroundColor: "#333333",
                      border: "1px solid #e64a19 ",
                      color: "#e64a19",
                      "&:hover": {
                        backgroundColor: "#d84315",
                        color: "#d6dbdf",
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
                  variant="contained"
                  sx={{
                    "&.MuiButton-root": {
                      backgroundColor: "#333333",
                      color: "#e64a19",

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
            </Box>
          </Paper>
        </div>
      ) : (
        <div>
          <Header />
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
                <Typography variant="h4" color={"#d6dbdf"}>
                  Hello!
                </Typography>
                <Typography variant="h5" color={"#d6dbdf"}>
                  Welcome to <span style={{color: "#e64a19"}}> Quick-Do</span>
                </Typography>

                <Typography variant="body1" color={"#aeb6bf"}>
                  Organize your tasks effortlessly, stay on top of your goals,
                  and boost your productivity. Add, update, and track your
                  to-dos with ease. Let’s get things done, one step at a time!
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
                        backgroundColor: "#333333",
                        border: "1px solid #e64a19",
                        color: "#e64a19",
                        "&:hover": {
                          backgroundColor: "#d84315",
                          color: "#d6dbdf",
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
                    variant="contained"
                    sx={{
                      "&.MuiButton-root": {
                        backgroundColor: "#333333",
                        color: "#e64a19",
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
        </div>
      )}
    </div>
  );
}
