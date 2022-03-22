import React, { useEffect, useState } from "react";
import { cleanObj, useDebounce, useMount } from "utils";
import * as qs from "qs";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useHttp } from "request/http";
const apiURL = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const client=useHttp()
  const debouncedParam = useDebounce(param, 200);
  useEffect(() => {
    client('projects',{data:cleanObj(debouncedParam)}).then(setList)
    // fetch(`${apiURL}/projects?${qs.stringify(cleanObj(debouncedParam))}`).then(
    //   async (response) => {
    //     if (response.ok) {
    //       setList(await response.json());
    //     }
    //   }
    // );
  }, [debouncedParam]);
  useMount(() => {
    client("users").then(setUsers);
    // fetch(`${apiURL}/users`).then(async (response) => {
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
