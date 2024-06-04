import axios from "axios";
import { useEffect, useState } from "react";
import { parsePath, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../redux/actions";

const Transcript = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const [refesh, setRefesh] = useState(false);

  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    // profile_img: '',
  });

  useEffect(() => {
    axios
      .get("/api/v1/transcript")
      .then((data) => {
        setCourse(data.data.data.courses);
        console.log("data", data.data.data);
      })
      .catch((err) => navigate("/"));

    console.log("course", course);
    console.log("id", user.id);
    // setUserId(user.id);
    // console.log("userId", userId);
  }, [refesh]);

  // const element = document.querySelector("#put-request .date-updated");
  // const article = { title: "Axios PUT Request Example" };
  // axios
  //   .put("https://reqres.in/api/articles/1", article)
  //   .then((response) => (element.innerHTML = response.data.updatedAt));

  // let id = user.id;
  // console.log("variabile id", id);

  const annulla = (id) => {
    console.log("premuto annulla");

    // gli indirizzi relativi, con il proxy attivo fanno la richiesta a http://localhost:8000/login mascherandolo come indirizzo nello stesso host di react (che nel nostro caso è http://localhost:3000/login)
    axios.put(`/api/v1/course/${id}/edit`).then((res) => {
      setRefesh(!refesh);
    });
  };

  return (
    <div>
      <h1>Lista corsi prenotati</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Stanza</th>
            <th scope="col">Corso</th>
            <th scope="col">Data</th>
            <th scope="col">Inizio</th>
            <th scope="col">Fine</th>
            <th scope="col">Stato</th>
          </tr>
        </thead>
        <tbody>
          {course && (
            <>
              {course.map((activity, i) => (
                // <div key={i}>
                <tr key={i}>
                  <td>{activity.location}</td>
                  <td>{activity.activity.name}</td>
                  <td>{activity.slot.day}</td>
                  <td>{activity.slot.start}</td>
                  <td>{activity.slot.end}</td>
                  {activity.pivot.status === "reject" ? (
                    <Button variant="danger">Rifiutato</Button>
                  ) : activity.pivot.status === "pending" ? (
                    <Button variant="secondary">In attesa di conferma</Button>
                  ) : (
                    <Button variant="success">Accettato</Button>
                  )}
                  <Button
                    variant="success"
                    onClick={() => {
                      annulla(activity.id);
                    }}
                  >
                    Annulla
                  </Button>
                </tr>
                // </div>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transcript;

// rafcp
