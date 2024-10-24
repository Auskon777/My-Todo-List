import dayjs from "dayjs";
import "dayjs/locale/en";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
  fetchTodos,
  deleteTodo,
  updateCompletedTodo,
  updateTodo,
  addTodo,
  clearTodos,
} from "../Features/todoSlice";
import {login, logout} from "../Features/userSlice";
import {auth} from "../config/fireBase";
import {onAuthStateChanged} from "firebase/auth";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
  useMediaQuery,
  Paper,
} from "@mui/material";
import TodoForm from "../components/todoForm";
import ActiveTodoStyle from "../components/activeTodoStyle";
import CompletedTodoStyle from "../components/completedTodoStyle";
import Header from "../components/navBar";
import {useNavigate} from "react-router-dom";
import LoadingSkeleton from "../components/loadingSkeleton";

const TodoList = () => {
  dayjs.locale("en");
  const todos = useSelector((state) => state.todo.items);
  const {status, initialLoading} = useSelector((state) => state.todo);
  const completedTodos = useSelector((state) => state.todo.completed);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editTodo, setEditTodo] = useState("");
  const [open, setOpen] = useState(false);
  const [isCompleted, isSetCompleted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: null,
  });
  const isMobile = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({uid: user.uid, email: user.email, isAuthenticated: true})
        );
        // Only fetch todos if the status is 'idle' to avoid re-fetching
        if (status === "idle") {
          dispatch(fetchTodos(user.uid));
        }
      } else {
        // User is not logged in, redirect to the login page
        dispatch(clearTodos());
        dispatch(logout());
        navigate("/login");
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [dispatch, navigate, status]);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData((preData) => ({
      ...preData,
      [name]: value,
    }));
  };

  //handle submit fuction
  const handleSubmit = (e) => {
    e.preventDefault();

    // checking if user is login
    const user = auth.currentUser;
    // Convert date to dayjs locale method
    const dateString = dayjs(formData.date).format("ll");
    const time = Date.now();

    const dataToSubmit = {
      ...formData,
      date: dateString, // Replace the date with the string representation
      completed: formData.completed || false,
      userId: user.uid,
      createdAt: time,
    };

    if (user) {
      if (formData.title && formData.description && formData.date) {
        if (editTodo) {
          dispatch(
            updateTodo({
              id: editTodo.id,
              ...dataToSubmit,
            })
          ).then(() => {
            toast.success("Event updated successfully!", {
              position: "top-right",
              autoClose: 3000,
            });
          });
          setOpen(false);
        } else {
          dispatch(addTodo(dataToSubmit)).then(() => {
            dispatch(fetchTodos(user.uid));
            toast.success("Event created successfully!", {
              position: "top-right",
              autoClose: 3000,
            });
          });
        }
      }
      setFormData({
        title: "",
        description: "",
        date: null,
      });
    } else {
      console.log("user not logged in");
    }
  };
  // handle delete function
  const handleDeleteTodo = (todo) => {
    dispatch(deleteTodo(todo)).then(() => {
      toast.success("Event deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    });
  };

  const handleToggle = (id, completed) => {
    if (completed) {
      // Update Firebase with the new completed status
      dispatch(updateCompletedTodo({id, completed})).then(() => {
        toast.success("Event marked as completed!", {
          position: "top-right",
          autoClose: 3000,
        });
      });
    }
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setFormData({
      title: todo.title,
      description: todo.description,
      date: todo.date ? dayjs(todo.date) : null,
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setFormData({
      title: "",
      description: "",
      date: null,
    });
  };

  return (
    <div>
      <Header />
      <ToastContainer style={{zIndex: 9999}} />
      <Paper
        elevation={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#2c2c2c",
          maxWidth: "700px",
          padding: "20px 10px",
          marginTop: "200px",
          marginLeft: isMobile ? "15px" : "auto",
          marginRight: isMobile ? "15px" : "auto",
          position: "relative",
        }}
      >
        <Box sx={{position: "absolute", top: "-40px", left: "-0px"}}>
          <Typography variant="h5" color={"#d6dbdf"}>
            Create event
          </Typography>
        </Box>
        <Box sx={{marginLeft: "0px"}}>
          <TodoForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Paper>
      <Paper
        elevation={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#2c2c2c",
          maxWidth: "700px",
          padding: isMobile ? "20px 10px" : "20px 20px",
          marginBottom: "100px",
          marginTop: "100px",
          marginLeft: isMobile ? "15px" : "auto",
          marginRight: isMobile ? "15px" : "auto",
          position: "relative",
        }}
      >
        <Box sx={{position: "absolute", top: "-40px", left: "-0px"}}>
          <Typography variant="h5" color={"#d6dbdf"}>
            Events
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            margin: "20px 0px",
            width: "fit-content",
            backgroundColor: "#333333",
          }}
        >
          <Button
            variant={isCompleted === false ? "contained" : "outlined"}
            sx={{
              "&.MuiButton-root": {
                color: "#e64a19",
                backgroundColor: "#333333",
                borderColor: "#333333",
                borderBottom:
                  isCompleted === false ? "1px solid #e64a19" : "#333333",

                "&:hover": {
                  color: "#d6dbdf",
                },
              },
            }}
            onClick={() => {
              isSetCompleted(false);
            }}
          >
            Active
          </Button>

          <Button
            variant={isCompleted === true ? "contained" : "outlined"}
            sx={{
              "&.MuiButton-root": {
                backgroundColor: "#333333",
                color: "#e64a19",
                borderColor: "#333333",
                borderBottom:
                  isCompleted === true ? "1px solid #e64a19" : "#333333",

                "&:hover": {
                  // backgroundColor: "#d84315",
                  color: "#d6dbdf",
                },
              },
            }}
            onClick={() => {
              isSetCompleted(true);
            }}
          >
            Completed
          </Button>
        </Box>
        <Box
          sx={{
            margin: "5px",
          }}
        >
          {isCompleted ? (
            <Typography variant="h5" color={"#e64a19"}>
              Completed
            </Typography>
          ) : (
            <Typography variant="h5" color={"#e64a19"}>
              Active
            </Typography>
          )}
        </Box>
        <Box>
          {initialLoading && status === "loading" ? (
            <Box>
              <LoadingSkeleton />
              <LoadingSkeleton />
            </Box>
          ) : todos.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
              }}
            >
              <Typography variant="h5" color="#d6dbdf">
                You have no events
              </Typography>
            </Box>
          ) : (
            <Box>
              {isCompleted === false &&
                todos.map((todo) => (
                  <ActiveTodoStyle
                    key={todo.id}
                    todo={todo}
                    handleDeleteTodo={handleDeleteTodo}
                    handleToggle={handleToggle}
                    handleEdit={handleEdit}
                  />
                ))}

              {(completedTodos.length === 0) & (isCompleted === true) ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                  }}
                >
                  <Typography variant="h5" color="#d6dbdf">
                    You have no completed events
                  </Typography>
                </Box>
              ) : (
                isCompleted === true &&
                completedTodos.map((todo) => (
                  <CompletedTodoStyle
                    key={todo.id}
                    todo={todo}
                    handleDeleteTodo={handleDeleteTodo}
                    handleToggle={handleToggle}
                  />
                ))
              )}
              {status === "failed" && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                  }}
                >
                  <Typography color="error">Failed to load todos.</Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Paper>
      <Dialog
        sx={{
          "& .MuiPaper-root": {backgroundColor: "#2c2c2c", width: "100%"},
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography color={"#d6dbdf"}>Edit Todo</Typography>
        </DialogTitle>
        <DialogContent>
          <TodoForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{
              "&.MuiButton-root": {
                color: "#e64a19",
                width: "6rem",
                backgroundColor: "#333333",
                "&:hover": {
                  backgroundColor: "#d84315",
                  color: "#d6dbdf",
                },
              },
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoList;
