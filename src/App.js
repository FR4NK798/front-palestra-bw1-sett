// import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import FetchComponent from "./components/FetchComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "./redux/actions";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import TopNav from "./components/TopNav";
import Home from "./components/Home";
import GuestRoutes from "./components/GuestRoutes";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import FacultyPage from "./components/FacultyPage";
import Transcript from "./components/Transcript";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios("/api/user")
      .then((res) =>
        dispatch({
          type: LOGIN,
          payload: res.data,
        })
      )
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <BrowserRouter>
        <TopNav />
        <div className="container">
          <Routes>
            {/* rotte accessibili da tutti */}
            <Route path="/" element={<Home />} />
            {/* rotte accessibili solo se sei loggato */}
            <Route element={<ProtectedRoutes />}>
              {/* <Route path="/faculties/:id" element={<FacultyPage />} /> */}
              {/* <Route path="/faculty" element={<Transcript />} /> */}

              <Route path="/courses/:id" element={<FacultyPage />} />
            </Route>

            {/* rotte accessibili solo se NON sei loggato */}
            <Route element={<GuestRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  );
}

export default App;
