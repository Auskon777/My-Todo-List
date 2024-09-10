import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import {
  fetchTodos,
  deleteTodo,
  updateCompletedTodo,
  updateTodo,
  addTodo,
} from "../appStore/todoSlice";
import {loginUser, logoutUser} from "../appStore/userSlice";
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
  Paper,
} from "@mui/material";
import TodoForm from "./todoForm";
import TodoStyle from "./TodoStyle";
import Header from "./header";
import {useNavigate} from "react-router-dom";

const TodoList = () => {
  const todos = useSelector((state) => state.todo.items);
  const status = useSelector((state) => state.todo.status);
  const completedTodos = useSelector((state) => state.todo.completed);
  const user = useSelector((state) => state.user.user);

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
  /* useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, you can dispatch an action to update Redux state
        dispatch(
          loginUser({
            uid: user.uid,
            email: user.email,
          })
        );
      } else {
        // User is logged out, dispatch a logout action
        dispatch(logoutUser());
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);
*/
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  // console.log(todos);
  // console.log(completedTodos);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //handle submit fuction

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert the date to a string using the toString method
    const dateString = formData.date.toString();
    // checking if user is login
    const user = auth.currentUser;
    if (user) {
      const dataToSubmit = {
        ...formData,
        date: dateString, // Replace the date with the string representation
        completed: formData.completed || false,
        userId: user.uid,
      };
      if (editTodo) {
        dispatch(
          updateTodo({
            id: editTodo.id,
            ...dataToSubmit,
          })
        );
      } else {
        dispatch(addTodo(dataToSubmit));
      }
      setFormData({
        title: "",
        description: "",
        date: null,
      });
      setOpen(false);
    } else {
      console.error("user not logged in");
    }
  };
  // handle delete function
  const handleDeleteTodo = (todo) => {
    dispatch(deleteTodo(todo));
  };

  const handleToggle = (id, completed) => {
    if (completed) {
      // Update Firebase with the new completed status
      dispatch(updateCompletedTodo({id, completed}));
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
      {user ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#2c2c2c",
            width: "fit-content",
            padding: "20px 20px",
            marginTop: "150px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <TodoForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              margin: "20px 0px",
              width: "fit-content",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                "&.MuiButton-root": {
                  marginRight: "5px",
                  borderColor: "#e64a19",
                  color: "#d6dbdf",
                  // backgroundColor: "#e64a19",
                  "&:hover": {
                    backgroundColor: "#d84315",
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
              variant="outlined"
              sx={{
                "&.MuiButton-root": {
                  color: "#d6dbdf",
                  borderColor: "#e64a19",
                  // backgroundColor: "#e64a19",
                  "&:hover": {
                    backgroundColor: "#d84315",
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
              margin: "10px",
              padding: "10px",
              width: "fit-content",
              backgroundColor: "#333333",
            }}
          >
            {isCompleted ? (
              <Typography color={"#e64a19"}>COMPLETED TODOS</Typography>
            ) : (
              <Typography color={"#e64a19"}>ACTIVE TODOS</Typography>
            )}
          </Box>
          {isCompleted === false &&
            todos.map((todo) => (
              <TodoStyle
                key={todo.id}
                todo={todo}
                handleDeleteTodo={handleDeleteTodo}
                handleToggle={handleToggle}
                handleEdit={handleEdit}
              />
            ))}
          <Box>
            {isCompleted === true &&
              completedTodos.map((todo) => (
                <TodoStyle
                  key={todo.id}
                  todo={todo}
                  handleDeleteTodo={handleDeleteTodo}
                  handleToggle={handleToggle}
                  handleEdit={handleEdit}
                />
              ))}
          </Box>
        </Box>
      ) : (
        <Paper
          elevation={10}
          sx={{
            "&.MuiPaper-root": {backgroundColor: "#2c2c2c"},
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "250px",
            maxWidth: "600px",
            padding: "10px",
          }}
        >
          <Box sx={{}}>
            <Typography color={"white"}>Plan your day with Quick-Do</Typography>
            <Typography color={"white"}>Sign Up to get started</Typography>
            <Button
              Variant="outlined"
              onClick={() => {
                navigate("/signUp");
              }}
            >
              {" "}
              Sign Up
            </Button>
          </Box>
        </Paper>
      )}

      <Dialog
        sx={{"& .MuiPaper-root": {backgroundColor: "#2c2c2c"}}}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography color={"white"}>Edit Todo</Typography>
        </DialogTitle>
        <DialogContent>
          <TodoForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <Typography color={"white"}>Cancel</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoList;
