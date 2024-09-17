import TodoList from "./components/todos";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./config/fireBase";
import {loginUser, logoutUser} from "./Features/userSlice";
import SignUp from "./components/signUp";
import Login from "./components/login";
import ForgotPassword from "./components/forgotPassword";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
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

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
