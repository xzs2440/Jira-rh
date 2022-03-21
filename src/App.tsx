import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {ProjectListScreen} from 'pages/project-list'
import {TsReactTest} from 'pages/text/try-user-array'
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";
// import { Lgoin } from "pages/login";

function App() {
  const {user}=useAuth()
  return (
    <div className="App">
      {user?<AuthenticatedApp/>:<UnauthenticatedApp/>}
    </div>
  );
}

export default App;
