import React, { createContext, useReducer } from 'react'
import { Route, Switch } from 'react-router-dom';
import { initialState, reducer } from "./reducer/Usereducer";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Controlsystem from "./components/Controlsystem";
import Error from "./components/Error";
import Logout from "./components/Logout";
import Logoutall from "./components/Logoutall";

export const UserContext = createContext();

const RoutingPages = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/control">
          <Controlsystem />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route exact path="/logoutall">
          <Logoutall />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Header />
        <RoutingPages />
      </UserContext.Provider>
    </>
  )
}

export default App
