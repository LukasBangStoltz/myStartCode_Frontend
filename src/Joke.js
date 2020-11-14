import facade from "./apiFacade.js";
import React, { useState, useEffect } from "react";
function Joke() {
  const [dataFromServer, setDataFromServer] = useState("");

  return (
    <div>
      <p>
        Joke: <br></br>
        {dataFromServer.starWarsQuote}
      </p>
      <button
        onClick={() => {
          facade.fetchJoke().then((data) => setDataFromServer(data));
        }}
      >
        Click me to render a new joke!
      </button>
    </div>
  );
}

export default Joke;
