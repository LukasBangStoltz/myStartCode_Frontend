import React, { useState } from "react";
import apiFacade from "./apiFacade.js";

function User() {
  const initialChar = { charName: "", charAge: "" };
  const [character, setCharacter] = useState(initialChar);

  const handleSubmit = (event) => {
    event.preventDefault();
    apiFacade.addCharacter(character);
    setCharacter({ ...initialChar });
  };

  function handleChange(event) {
    const value = event.target.value;
    const id = event.target.id;
    setCharacter({
      ...character,
      [id]: value,
    });
  }

  return (
    <div>
      <h3>Du er logget ind som user og har adgang til denne side</h3>
      <p>Indsæt en StarWars karakter til systemet:</p>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            id="charName"
            value={character.charName}
            onChange={handleChange}
          />
        </label>

        <label>
          Age:
          <input
            type="text"
            id="charAge"
            value={character.charAge}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default User;
