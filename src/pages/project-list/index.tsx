import React, { useEffect, useState } from "react";
import { cleanObj,useDebounce,useMount } from "utils";
import * as qs from 'qs'
import { List } from "./list";
import { SearchPanel } from "./search-panel";
const apiURL = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debouncedParam=useDebounce(param,200)
  useEffect(() => {
    fetch(`${apiURL}/projects?${qs.stringify(cleanObj(debouncedParam))}`).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);
  useMount(() => {
    fetch(`${apiURL}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
