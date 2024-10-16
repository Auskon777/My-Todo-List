import TodoList from "./pages/todos";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import LandingPage from "./pages/landingPage";
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
