import {Typography, Box} from "@mui/material";

const date = new Date().getFullYear();
export default function Footer() {
  return (
    <div>
      <Box
        sx={{
          display: "block",
          marginTop: "100px",
          borderTop: "1px solid #424949",
          width: "100%",
        }}
      >
        <Box
          sx={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "25px",
            width: "fit-content",
          }}
        >
          <Typography variant="body1" color={"#d6dbdf"}>
            Design by e-governance interns
          </Typography>
        </Box>
        <Box
          sx={{marginLeft: "auto", marginRight: "auto", width: "fit-content"}}
        >
          <Typography variant="body2" color={"#d6dbdf"}>
            &#169; Quick-do {date}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
