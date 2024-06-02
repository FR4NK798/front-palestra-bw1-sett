import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const FacultyPage = () => {
  const [course, setCourse] = useState(null); // null buon candidato
  const [slots, setSlots] = useState(null); // null buon candidato
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/v1/courses/${id}`)
      .then((res) => {
        if (!res.ok) navigate("/404");
        return res.json();
      })
      .then((data) => {
        console.log("data", data.data.slot);
        setCourse(data.data);
        setSlots(data.data.slot);
      });
  }, [id]);

  console.log("course", course);
  console.log("slots", slots);

  return (
    slots && (
      <>
        <h1>{course.activity.name}</h1>
        <p>{course.activity.description}</p>

        <p>Slot</p>
        <div>
          <div>
            <ul>
              {slots.day}
              <li>{slots.start}</li>
              <li>{slots.end}</li>
            </ul>
          </div>
          <div class="btn btn-info">
            <Link to={`/courses/${course.id}`}>Prenota</Link>
          </div>
        </div>
      </>
    )
  );
};

export default FacultyPage;
