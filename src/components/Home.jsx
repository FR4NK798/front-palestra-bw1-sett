import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const [courses, setCourses] = useState([]); // null buon candidato
  const [auth, setAuth] = useState(null);

  const navigate = useNavigate();

  let arr = [[], [], []];
  //   arr[1].push("ciao");
  console.log("arr PRIMA", arr);

  function prova() {
    console.log("dentro await");
    courses.map((course) => {
      if (course.location === `Stanza 1`) {
        arr[0].push(course);
      }
      if (course.location === `Stanza 2`) {
        arr[1].push(course);
      }
      if (course.location === `Stanza 3`) {
        arr[2].push(course);
      }
    });
    setAuth(true);
    console.log("arr dopo", arr);
    return arr;
  }

  useEffect(() => {
    axios
      .get("/api/v1/courses")
      .then((data) => {
        setCourses(data.data.data);
        console.log("data", data.data.data);
      })
      .catch((err) => navigate("/"));
  }, []);

  return (
    courses && (
      <>
        {courses.map((course, i) => (
          <div key={i}>
            <ul>
              <Link to={`/courses/${course.id}`}>{course.activity.name}</Link>
              <li>{course.location}</li>
              <li>{course.id}</li>
            </ul>
          </div>
        ))}
      </>
    )
  );
};

export default Home;

// http://localhost:3000/   ----->    http://localhost:8000/

// {arr.map((course, i) => (
//     <>
//       <div key={i}></div>
//       {/* <ul> */}
//       {course.forEach((element) => {
//         <>
//           <div key={element.id}></div>
//           <div>
//             {element.location}
//             <div>
//               <Link to={`/courses/${element.id}`}>
//                 {/* {element.activity.name} */}
//               </Link>
//             </div>
//           </div>
//         </>;
//       })}
//       {/* </ul> */}
//     </>
//   ))}
