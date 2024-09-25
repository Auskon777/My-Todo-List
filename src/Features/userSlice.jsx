import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {auth, db} from "../config/fireBase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
// Async thunks for user actions

// Sign Up
export const signUpUser = createAsyncThunk(
  "user/signUp",
  async ({email, password}, {rejectWithValue}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Add user to Firestore user collection

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      return {uid: user.uid, email: user.email};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Log In
export const loginUser = createAsyncThunk(
  "user/login",
  async ({email, password}, {rejectWithValue}) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        email: user.email,
      };
      console.log("User logged in:", userData);
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Log Out
export const logoutUser = createAsyncThunk("user/logout", async () => {
  await signOut(auth);
});

// User slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
      });
  },
});

export default userSlice.reducer;
