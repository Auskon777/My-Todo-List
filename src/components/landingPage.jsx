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
                margin: "50px 0px 20px 20px",
                width: "200px",
              }}
            >
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
                  navigate("/signUp");
                }}
              >
                get started
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
            <Box sx={{maxWidth: "600px", marginTop: "20px"}}>
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
                  margin: "50px 0px 0px 20px",
                  width: "200px",
                }}
              >
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
                    navigate("/signUp");
                  }}
                >
                  get started
                </Button>
              </Box>
            </Box>
            <Box>
              <Card>
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
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
