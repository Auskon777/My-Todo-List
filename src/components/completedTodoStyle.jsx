import {motion} from "framer-motion";
import {Box, IconButton, Checkbox, Typography, Paper} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CompletedStyles({
  todo,
  handleToggle,
  handleDeleteTodo,
}) {
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
            <motion.div
              initial={{scale: 1}}
              animate={{scale: todo.completed ? 1.5 : 1}}
              transition={{type: "spring", stiffness: 500}}
            >
              <Checkbox
                checked={todo.completed}
                onChange={(e) => handleToggle(todo.id, e.target.checked)}
                disabled={todo.completed}
                sx={{
                  color: "#e64a19",
                  "&.Mui-checked": {
                    color: "#e64a19",
                  },
                  "& .MuiSvgIcon-root": {fontSize: 20},
                }}
              />
            </motion.div>
          </Box>
          <Box sx={{display: "block", width: "100%"}}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                overflow: "hidden",
                textDecoration: "line-through",
                textDecorationColor: "#2c2c2c",
              }}
            >
              <Typography variant="1.5rem" color={"#d6dbdf"}>
                {todo.title}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                overflow: "hidden",
                textDecoration: "line-through",
                textDecorationColor: "#2c2c2c",
              }}
            >
              <Typography fontSize={"0.8rem"} color={"#aeb6bf"}>
                {todo.description}
              </Typography>
            </Box>

            <Box
              sx={{
                width: "fit-content",
              }}
            >
              <Typography fontSize={"0.7rem"} color={"#aeb6bf"}>
                {todo.date}
              </Typography>
            </Box>
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
            <IconButton
              variant="contained"
              sx={{
                color: "#e64a19",
                m: 2,
                margin: 0,
                backgroundColor: "#333333",
                width: "2.5rem",
              }}
              onClick={() => handleDeleteTodo(todo.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
