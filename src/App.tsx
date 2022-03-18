import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {ProjectListScreen} from 'pages/project-list'
import {TsReactTest} from 'pages/text/try-user-array'
import { Lgoin } from "pages/login";

function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen/> */}
      {/* <TsReactTest/> */}
      <Lgoin/>
    </div>
  );
}

export default App;
