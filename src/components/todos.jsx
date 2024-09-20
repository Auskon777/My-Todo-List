import dayjs from "dayjs";
import "dayjs/locale/en";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import {
  fetchTodos,
  deleteTodo,
  updateCompletedTodo,
  updateTodo,
  addTodo,
} from "../Features/todoSlice";
import {loginUser, logoutUser} from "../Features/userSlice";
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
  CardMedia,
  Card,
} from "@mui/material";
import TodoForm from "./todoForm";
import ActiveTodoStyle from "./activeTodoStyle";
import CompletedTodoStyle from "./completedTodoStyle";
import Header from "./header";
import LandingPage from "./landingPage";
import {useNavigate} from "react-router-dom";

const TodoList = () => {
  dayjs.locale("en");
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
    const fetch = () => {
      if (status === "idle") {
        dispatch(fetchTodos());
      }
    };
    return () => fetch();
  }, [status, dispatch]);

  // console.log(todos);
  console.log(completedTodos);

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
    const dateString = dayjs(formData.date).format("LL");
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
              variant="contained"
              sx={{
                "&.MuiButton-root": {
                  marginRight: "5px",
                  // borderColor: "#e64a19",
                  color: "#e64a19",
                  backgroundColor: "#333333",
                  "&:hover": {
                    backgroundColor: "#d84315",
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
              variant="contained"
              sx={{
                "&.MuiButton-root": {
                  color: "#e64a19",
                  //borderColor: "#e64a19",
                  backgroundColor: "#333333",
                  "&:hover": {
                    backgroundColor: "#d84315",
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
              margin: "10px",
              padding: "10px",
              width: "100%",
              backgroundColor: "#333333",
            }}
          >
            {isCompleted ? (
              <Typography color={"#d6dbdf"}>COMPLETED TODOS</Typography>
            ) : (
              <Typography color={"#d6dbdf"}>ACTIVE TODOS</Typography>
            )}
          </Box>
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
          <Box>
            {isCompleted === true &&
              completedTodos.map((todo) => (
                <CompletedTodoStyle
                  key={todo.id}
                  todo={todo}
                  handleDeleteTodo={handleDeleteTodo}
                  handleToggle={handleToggle}
                />
              ))}
          </Box>
        </Box>
      ) : (
        <LandingPage />
      )}

      <Dialog
        sx={{"& .MuiPaper-root": {backgroundColor: "#2c2c2c", width: "100%"}}}
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
