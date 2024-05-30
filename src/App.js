import logo from "./logo.svg";
import "./App.css";
import FetchComponent from "./components/FetchComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "./redux/actions";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   axios("/api/user")
  //     .then((res) =>
  //       dispatch({
  //         type: LOGIN,
  //         payload: res.data,
  //       })
  //     )
  //     .catch((err) => console.log(err))
  //     .finally(() => setLoaded(true));
  // }, [dispatch]);
  return (
    // loaded && (
    //   <BrowserRouter>
    //     <div className="container">
    //       <Routes>
    //         {/* rotte accessibili da tutti */}
    //         <Route path="/" element={<FetchComponent />} />
    //       </Routes>
    //     </div>

    //     {/* <Footer /> */}
    //   </BrowserRouter>
    // )
    <FetchComponent />
  );
}

export default App;
