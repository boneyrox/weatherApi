import { useState } from "react";
import "./styles.css";

const style = {
  color: "#111",
  fontFamily: "Helvetica Neue",
  font: "sansSerif",
  fontSize: "10vh",
  fontWeight: "bold",
  letterSpacing: "-1px",
  lineHeight: "1",
  textAlign: "center"
};
const styleLabel = {
  color: "#111",
  fontFamily: "Helvetica Neue",
  fontSize: "5vh",
  letterSpacing: "-1px",
  lineHeight: "1",
  textAlign: "center",
  marginBottom: "15vh"
};

function ResultFinal(props) {
  return (
    <p hidden={props.hidden}>
      {" "}
      Current temperature of {props.city} is {props.answer} °C
    </p>
  );
}

export default function App() {
  const [city, setCity] = useState("");
  const [visibility, setVisibility] = useState(true);
  const [currentTemp, setCurrentTemp] = useState(0);

  var result = new Object();
  var finalResult = 0;

  function clicked(event) {
    setCity(event.target.value);
    setVisibility(true);
  }

  async function apiCall(e) {
    //e.preventDefault();

    console.log(city);
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8a3bb0f6875d3c9b15352d03a5977d97`
    )
      .then((response) => response.json())
      .then(
        (x) => (
          (finalResult = x.main.temp - 273),
          setCity(x.name + " " + x.sys.country)
        )
      )
      .catch((error) => console.error("error:", error));

    setCurrentTemp(Math.floor(finalResult));
    setVisibility(false);
  }
  return (
    <div className="App">
      <h1 style={style}>
        <span role="img">🌧️</span> Weather App in React{" "}
        <span role="img">🌧️</span>
      </h1>
      <p style={styleLabel}>Enter city name below to know its weather...</p>
      <label style={styleLabel}>City Name : </label>
      <input style={styleLabel} value={city} onChange={clicked} />

      <button onClick={apiCall} style={styleLabel}>
        Submit
      </button>
      <ResultFinal hidden={visibility} city={city} answer={currentTemp} />
    </div>
  );
}
