import SendIcon from "@mui/icons-material/Send";
import {
  TextField,
  Box,
  InputAdornment,
  Stack,
  Alert,
  Paper,
  IconButton,
} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
//import dayjs from "dayjs";

const TodoForm = ({handleSubmit, handleChange, formData}) => {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        "& .MuiTextField-root": {m: 1, width: "10rem"},
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "20px",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        label="Title"
        name="title"
        variant="outlined"
        value={formData.title}
        onChange={handleChange}
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
      />
      <TextField
        label="Description"
        name="description"
        variant="outlined"
        required
        rows={1}
        value={formData.description}
        onChange={handleChange}
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
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select Date"
          value={formData.date}
          onChange={(newDate) =>
            handleChange({target: {name: "date", value: newDate}})
          }
          slots={{
            textField: (props) => (
              <TextField
                {...props}
                fullWidth
                variant="outlined"
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
                    "& .MuiSvgIcon-root": {
                      color: "#aeb6bf",
                    },
                  },
                }}
              />
            ),
          }}
        />
      </LocalizationProvider>
      <IconButton
        variant="contained"
        type="submit"
        sx={{
          m: 1,
          width: "3rem",
          backgroundColor: "#333333",
          color: "#e64a19",
          "&:hover": {
            backgroundColor: "#ff9800",
          },
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default TodoForm;
