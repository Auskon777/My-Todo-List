import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {db, auth} from "../config/fireBase";
import {
  collection,
  updateDoc,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  where,
  query,
} from "firebase/firestore";

// Async thunk to fetch todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const user = auth.currentUser;

  try {
    if (user) {
      const q = query(collection(db, "todo"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const todos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return todos;
    } else {
      throw new Error("user not logged in");
    }
  } catch (error) {
    console.log(error);
  }
});

// Async thunk to add a new todo
export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const docRef = await addDoc(collection(db, "todo"), todo);
  return {id: docRef.id, ...todo};
});

//  Async thunk to update todo
export const updateTodo = createAsyncThunk("todos/editTodo", async (todo) => {
  const {id, ...data} = todo;
  // const dateString = date.toString();
  await updateDoc(doc(db, "todo", id), data);

  return todo;
});
// Asyn thunk to handle completed todo

export const updateCompletedTodo = createAsyncThunk(
  "todos/toggleTodoCompletion",
  async ({id}) => {
    const todoRef = doc(db, "todo", id);
    await updateDoc(todoRef, {completed: true});
    return {id, completed: true};
  }
);
// Async thunk to delete a todo
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await deleteDoc(doc(db, "todo", id));
  return id;
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    items: [],
    completed: [],
    status: "idle",
    error: null,
  },
  reducers: {
    toggleTodoCompleted(state, action) {
      const todoIndex = state.items.findIndex(
        (todo) => todo.id === action.payload
      );
      if (todoIndex !== -1) {
        const [completedTodo] = state.items.splice(todoIndex, 1); // Remove the todo from items
        completedTodo.completed = true;
        state.completed.push(completedTodo); // Add the todo to the completed array
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.error = "failed";
    });

    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.items =
        action.payload
          .filter((todo) => !todo.completed)
          .sort((a, b) => b.createdAt - a.createdAt) || [];
      state.completed = action.payload.filter((todo) => todo.completed) || [];
      state.status = "succeeded";
    });
    // ADD TODO
    builder.addCase(addTodo.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.status = "succeeded";
    });

    builder.addCase(addTodo.rejected, (state) => {
      state.error = "failed";
    });

    // update todo
    builder.addCase(updateTodo.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const index = state.items.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      state.status = "succeeded";
    });

    builder.addCase(updateTodo.rejected, (state) => {
      state.error = "failed";
    });

    // delete todo
    builder.addCase(deleteTodo.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
      state.completed = state.completed.filter(
        (todo) => todo.id !== action.payload
      );
      state.status = "succeeded";
    });

    builder.addCase(deleteTodo.rejected, (state) => {
      state.error = "failed";
    });

    //updating completed todos
    builder.addCase(updateCompletedTodo.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(updateCompletedTodo.fulfilled, (state, action) => {
      const {id, completed} = action.payload;
      const todoIndex = state.items.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        const todo = state.items[todoIndex];
        todo.completed = completed;

        if (completed) {
          state.items.splice(todoIndex, 1); // Remove from items
          state.completed.push(todo); // Add to completed
        }
      }
      state.status = "succeeded";
    });

    builder.addCase(updateCompletedTodo.rejected, (state) => {
      state.error = "failed";
    });
  },
});
export const {toggleTodo} = todoSlice.actions;
export default todoSlice.reducer;
