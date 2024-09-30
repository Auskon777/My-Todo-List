import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useMediaQuery} from "@mui/material";

import {
  TextField,
  Button,
  Box,
  Stack,
  Alert,
  IconButton,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const TodoForm = ({handleSubmit, handleChange, formData}) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <div>
      {isMobile ? (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root": {m: 1, width: "90%"},
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            paddingBottom: "10px",
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
            label="Add note"
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
              disablePast={true}
              onChange={(newDate) =>
                handleChange({target: {name: "date", value: newDate}})
              }
              slotProps={{
                layout: {
                  sx: {
                    color: "#d6dbdf",
                    border: "1px solid #aeb6bf",
                    backgroundColor: "rgba(0, 0, 0,0.8)",
                    ".MuiPickersDay-root": {
                      color: "#d6dbdf", // Days text color
                    },
                    ".MuiPickersDay-root.Mui-selected": {
                      backgroundColor: "#e64a19", // Selected date circle color
                    },
                    ".MuiIconButton-root": {
                      color: "#e64a19", // Arrows for month and year picker color
                    },
                    ".MuiPickersArrowSwitcher-root .MuiIconButton-root": {
                      color: "#e64a19", // Specific arrow buttons for switching months and years
                    },
                    ".MuiDayCalendar-weekDayLabel": {
                      color: "white", // Correct selector for week labels
                    },
                  },
                },
              }}
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
                          color: "#e64a19",
                        },
                      },
                    }}
                  />
                ),
              }}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "10rem",
              marginTop: "20px",
              backgroundColor: "#333333",
              border: "1px solid #e64a19 ",
              color: "#e64a19",
              "&:hover": {
                backgroundColor: "#d84315",
                color: "#aeb6bf",
              },
            }}
          >
            <Typography>Add </Typography> <SendIcon />
          </Button>
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root": {m: 1, width: "10rem"},
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: "10px",
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
            label="Add note"
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
              disablePast={true}
              value={formData.date}
              onChange={(newDate) =>
                handleChange({target: {name: "date", value: newDate}})
              }
              slotProps={{
                layout: {
                  sx: {
                    color: "#d6dbdf",
                    border: "1px solid #aeb6bf",
                    backgroundColor: "rgba(0, 0, 0,0.8)",
                    ".MuiPickersDay-root": {
                      color: "#d6dbdf", // Days text color
                    },
                    ".MuiPickersDay-root.Mui-selected": {
                      backgroundColor: "#e64a19", // Selected date circle color
                    },
                    ".MuiIconButton-root": {
                      color: "#e64a19", // Arrows for month and year picker color
                    },
                    ".MuiPickersArrowSwitcher-root .MuiIconButton-root": {
                      color: "#e64a19", // Specific arrow buttons for switching months and years
                    },
                    ".MuiDayCalendar-weekDayLabel": {
                      color: "white", // Correct selector for week labels
                    },
                  },
                },
              }}
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
                          color: "#e64a19",
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
              m: 2,
              width: "3rem",
              backgroundColor: "#333333",
              border: "1px solid #e64a19 ",
              color: "#e64a19",
              "&:hover": {
                backgroundColor: "#d84315",
                color: "#d6dbdf",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      )}
    </div>
  );
};

export default TodoForm;
