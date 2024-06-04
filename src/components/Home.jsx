import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [courses, setCourses] = useState([]); // null buon candidato
  const [auth, setAuth] = useState(null);
  const [refesh, setRefesh] = useState(false);
  const [courseAdmin, setCourseAdmin] = useState([]);
  const [finish, setFinish] = useState(false);

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  // let arrUser = [];

  let arr = [[], [], []];
  //   arr[1].push("ciao");
  console.log("arr PRIMA", arr);

  const prenota = (id) => {
    console.log("premuto prenota");

    // gli indirizzi relativi, con il proxy attivo fanno la richiesta a http://localhost:8000/login mascherandolo come indirizzo nello stesso host di react (che nel nostro caso è http://localhost:3000/login)
    axios.post(`/api/v1/course/${id}/create`).then((res) => {
      console.log("axios res", res);
      setRefesh(!refesh);
    });
  };

  const accetta = (id, slot) => {
    // gli indirizzi relativi, con il proxy attivo fanno la richiesta a http://localhost:8000/login mascherandolo come indirizzo nello stesso host di react (che nel nostro caso è http://localhost:3000/login)
    axios.post(`api/v1/course/${id}/${slot}/approve`).then((res) => {
      console.log("accetta");
      setRefesh(!refesh);
    });
  };

  const rifiuta = (id, slot) => {
    // gli indirizzi relativi, con il proxy attivo fanno la richiesta a http://localhost:8000/login mascherandolo come indirizzo nello stesso host di react (che nel nostro caso è http://localhost:3000/login)
    axios.post(`api/v1/course/${id}/${slot}/reject`).then((res) => {
      console.log("rifiuta");
      setRefesh(!refesh);
    });
  };

  const admin = () => {
    axios
      .get("/api/v1/transcript")
      .then((data) => {
        // setCourse(data.data.data.courses);
        console.log("data", data);
      })
      .catch((err) => navigate("/"));

    // console.log("course", course);
    // console.log("id", user.id);
  };

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
        setCourseAdmin(data.data.data);
        console.log("data", data.data.data);
      })
      .catch((err) => navigate("/"));

    console.log("utente", user);
  }, [refesh]);
  if (courses && user) {
    if (user.role === "admin") {
      console.log("admin");
      return (
        courses && (
          <>
            {courses.map((course, i) => (
              <ul key={i}>
                {/* <Link to={`/courses/${course.id}`}>{course.activity.name}</Link> */}
                {course.location}

                <li>{course.activity.name}</li>
                {/*  */}
                <ul>
                  Lista Utenti prenotati
                  {course.users.length === 0 ? (
                    <li>Nessun utente</li>
                  ) : (
                    <ul>
                      {course.users.map((user, i) => (
                        // console.log("user", user);
                        <>
                          {user.name}
                          <li>Status : {user.pivot.status}</li>
                          <Button
                            variant="success"
                            onClick={() => {
                              accetta(user.id, user.pivot.course_id);
                            }}
                          >
                            Accetta
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => {
                              rifiuta(user.id, user.pivot.course_id);
                            }}
                          >
                            Rifiuta
                          </Button>
                        </>
                      ))}

                      {/* <li>{course.users.pivot.status}</li> */}
                    </ul>
                  )}
                  {/* {course.users.length !== 0 ? (
                  <ul>
                    {course.users.name}
                    <li>{course.users.pivot.status}</li>
                    <Button
                      variant="success"
                      onClick={() => {
                        accetta(course.users.pivot);
                      }}
                    >
                      Accetta
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        rifiuta(course.users.pivot);
                      }}
                    >
                      Rifiuta
                    </Button>
                  </ul>
                ) : (
                  <li>Nessun utente prenotato</li>
                )} */}
                </ul>

                {/*  */}
                {/* {course.users.forEach((user, i) => {
                <ul key={i}>
                  Lista Utenti prenotati
                  <ul>
                    {user.name}
                    <li>{user.pivot.status}</li>
                    <Button
                      variant="success"
                      onClick={() => {
                        accetta(user.pivot);
                      }}
                    >
                      Accetta
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        rifiuta(user.pivot);
                      }}
                    >
                      Rifiuta
                    </Button>
                  </ul>
                </ul>;
              })} */}
              </ul>
            ))}
          </>
        )
      );
    } else {
      return (
        courses && (
          <>
            {courses.map((course, i) => (
              <div key={i}>
                <ul>
                  <Link to={`/courses/${course.id}`}>
                    {course.activity.name}
                  </Link>
                  <li>{course.location}</li>
                  <div></div>

                  {course.users.length !== 0 &&
                    course.users.map((element, i) => {
                      while (i !== element.length) {
                        if (element.id !== user.id) {
                          return (
                            <Button
                              variant="warning"
                              onClick={() => {
                                prenota(course.id);
                              }}
                            >
                              Prenota
                            </Button>
                          );
                        } else {
                          // setFinish(!finish);
                          i = element.length;
                        }
                      }
                    })}

                  {/* <Button
                    variant="warning"
                    onClick={() => {
                      prenota(course.id);
                    }}
                  >
                    Prenota
                  </Button> */}
                </ul>
              </div>
            ))}
          </>
        )
      );
    }
  } else {
    return (
      courses && (
        <>
          {courses.map((course, i) => (
            <div key={i}>
              <ul>
                <Link to={`/courses/${course.id}`}>{course.activity.name}</Link>
                <li>{course.location}</li>
                {/* <li>{course.id}</li> */}
                {/* <Button
                  variant="warning"
                  onClick={() => {
                    prenota(course.slot.id);
                  }}
                >
                  Prenota
                </Button> */}
              </ul>
            </div>
          ))}
        </>
      )
    );
  }
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
