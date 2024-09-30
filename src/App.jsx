import TodoList from "./components/todos";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp from "./components/signUp";
import Login from "./components/login";
import ForgotPassword from "./components/forgotPassword";
import LandingPage from "./components/landingPage";
import Footer from "./components/footer";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<TodoList />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
