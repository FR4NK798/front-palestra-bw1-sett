import { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';

const FetchComponent = () => {
  const [activties, setActivties] = useState([]); // null buon candidato

  fetch("http://127.0.0.1:8000/api/v1/activities")
    .then((response) => {
      console.log("response", response);
      if (response.ok) {
        console.log("response", response);
        return response.json();
      } else {
        throw new Error("Problema nella chiamata API");
      }
    })
    .then((data) => {
      console.log("dati da fetch", data);

      // setIsLoading(false)
      // METTERE LOADING
    })
    .catch((error) => {
      console.log("ERRORE", error);
      // setIsLoading(false)
      // setIsError(true)
    });

  fetch("http://127.0.0.1:8000/api/v1/courses")
    .then((response) => {
      // console.log("response", response);
      if (response.ok) {
        // console.log("response", response);
        return response.json();
      } else {
        throw new Error("Problema nella chiamata API");
      }
    })
    .then((data) => {
      console.log("dati da fetch", data);

      // setIsLoading(false)
      // METTERE LOADING
    })
    .catch((error) => {
      console.log("ERRORE", error);
      // setIsLoading(false)
      // setIsError(true)
    });

  useEffect(() => {
    // fetch("/api/v1/activties")
    //   .then((res) => res.json())
    //   .then((data) => setActivties(data));
  }, []);

  return (
    <>
      {/* {activties.map((activity) => (
        <div key={activity.id}>
          <h2>{activity.name}</h2>
        </div>
      ))} */}
      <h1>Ciao</h1>
    </>
  );
};
export default FetchComponent;
