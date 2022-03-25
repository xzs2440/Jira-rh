import React, { useEffect, useState } from "react";
import { cleanObj, useDebounce, useMount } from "utils";
import { Project } from "pages/project-list/list";
import * as qs from "qs";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useHttp } from "request/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
// import { useAsync } from "utils/use-async";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
const apiURL = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const debouncedParam = useDebounce(param, 200);
  // const [users, setUsers] = useState([]);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUser();
  // const client = useHttp();
  // const [list, setList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<null | Error>(null);
  // useEffect(() => {
  //   // run(client("projects", { data: cleanObj(debouncedParam) }));
  //   // setIsLoading(true);
  //   // client("projects", { data: cleanObj(debouncedParam) })
  //   //   .then(setList)
  //   //   .catch((err) => {
  //   //     setList([]);
  //   //     setError(err);
  //   //   })
  //   // .finally(() => setIsLoading(false));
  //   // eslint-disabled-next-line react-hooks/exhaustive-deps
  //   // fetch(`${apiURL}/projects?${qs.stringify(cleanObj(debouncedParam))}`).then(
  //   //   async (response) => {
  //   //     if (response.ok) {
  //   //       setList(await response.json());
  //   //     }
  //   //   }
  //   // );
  // }, [debouncedParam]);
  // useMount(() => {
  //   client("users").then(setUsers);
  //   // fetch(`${apiURL}/users`).then(async (response) => {
  //   //   if (response.ok) {
  //   //     setUsers(await response.json());
  //   //   }
  //   // });
  // });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`;
