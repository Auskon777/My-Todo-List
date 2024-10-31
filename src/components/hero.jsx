import {Card, CardMedia, CardContent, Typography, Box} from "@mui/material";
import heroImage from "../assets/calender.jpg";

export default function HeroSection() {
  return (
    <div>
      <Box sx={{marginTop: "66px"}}>
        <Card sx={{position: "relative", height: 400}}>
          {/* CardMedia for the background image */}
          <CardMedia
            component="img"
            height="100%"
            image={heroImage}
            alt="hero background"
          />

          {/* Color overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(230, 73, 25, 0.5)",
            }}
          />

          {/* Overlaying text on top of the background */}
          <CardContent
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: {xs: "2rem", sm: "2.5rem", md: "3.5rem"},
                fontWeight: "bold",
              }}
              component="div"
            >
              Create your events
            </Typography>
            <Typography
              sx={{
                fontSize: {xs: "0.95rem", sm: "1.25rem", md: "1.50rem"},
              }}
              component="div"
            >
              Stay organized and productive
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
