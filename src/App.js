import React, { useState } from "react";
import facade from "./apiFacade";
import LogIn, { LoggedIn } from "./LogIn.js";
import Header from "./Header.js";
import Starwars from "./Starwars.js";
import Admin from "./Admin.js";
import User from "./User.js";
import Joke from "./Joke.js";
import { Switch, Route } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  //const [role, setRole] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };

  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => setLoggedIn(true), setError(""))
      .catch((err) => {
        setError("Wrong username or password");
      });
  };

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/starwars">
          <Starwars />
        </Route>
        <Route path="/joke">
          <Joke />
        </Route>
        {!loggedIn ? (
          <div>
            <Route exact path="/">
              <LogIn login={login} />
              <p>{error}</p>

              <p>
                Jeg brugte startkoden til hurtigt at sætte en fetch af
                forskellige starwars quotes op. <br></br>I backenden, lavede jeg
                et eksternt kald til et api, hvor jeg implementerede tråde til
                af fange dataen. <br></br>I min frontend har jeg brugt det api
                fra min backend, til at kunne vise en enkelt quote ad gangen,
                som opdateres ved klik på knap.
                <br></br>Jeg har dernæst forsøgt at lave en entitet i form af en favorit karakter, som en given bruger på siden kan vælge.
                <br></br>Jeg nåede ikke i hus med opgaven, da jeg er stødt på mange problemer undervejs... I backenden fungere entiteten, men der kan ikke oprettes nye favoritkarakterer fra frontenden, hvilket var meningen.
              </p>
            </Route>
          </div>
        ) : (
          <div>
            <div>
              <Route exact path="/">
                <LoggedIn />
                <button onClick={logout}>Logout</button>
              </Route>
            </div>
            <div>
              <Route path="/user">
                {facade.getRole() === "user" ? (
                  <User />
                ) : (
                  <p>Du er ikke logget ind som user</p>
                )}
              </Route>
            </div>
            <div>
              <Route path="/admin">
                {facade.getRole() === "admin" ? (
                  <Admin />
                ) : (
                  <p>Du er ikke logget ind som admin</p>
                )}
              </Route>
            </div>
          </div>
        )}
      </Switch>
    </div>
  );
}
export default App;
