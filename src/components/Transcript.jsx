import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Transcript = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/transcript")
      .then((data) => {
        setCourse(data.data.data.courses);
        console.log("data", data.data.data);
      })
      .catch((err) => navigate("/"));
  }, []);

  console.log("course", course);

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
                  <td></td>
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
