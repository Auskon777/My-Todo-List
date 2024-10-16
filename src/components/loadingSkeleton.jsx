import {Box, Paper, Skeleton} from "@mui/material";

export default function LoadingSkeleton() {
  return (
    <div>
      <Paper
        elevation={10}
        sx={{
          margin: "0px 5px",
          backgroundColor: "rgba(87, 99, 117, 0)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "10px 5px",
            marginBottom: "20px",
          }}
        >
          <Box sx={{width: "40px"}}>
            <Skeleton variant="rectangle" width={"24px"} height={"24px"} />
          </Box>
          <Box sx={{display: "block", width: "100%"}}>
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="30%" height={10} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "fit-content",
              padding: "5px",
            }}
          >
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
