import React, { useEffect, useState } from "react";
import { cleanObj } from "utils";
import * as qs from 'qs'
// import { connect } from "react-redux";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
const apiURL = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`${apiURL}/projects?${qs.stringify(cleanObj(param))}`).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
        console.log(list);
      }
    });
  }, [param]);
  useEffect(() => {
    fetch(`${apiURL}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
