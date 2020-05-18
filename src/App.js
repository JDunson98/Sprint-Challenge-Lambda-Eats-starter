import React from "react";
import Form from "./Components/Form";
import Header from './Components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <Router>
      <h1>Lambda Eats</h1>
      <Route path="/"><Header /></Route>
      <Route exact path="/pizza"><Form /></Route>
    </Router>
  );
};
export default App;
