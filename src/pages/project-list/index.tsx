import React, { useEffect, useState } from "react";
import { cleanObj, useDebounce, useDocumentTitle, useMount } from "utils";
import { Project } from "pages/project-list/list";
import * as qs from "qs";
import { List } from "./list";
// import { Text } from "../../components/text-closure";
import { SearchPanel } from "./search-panel";
import { useHttp } from "request/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
// import { useAsync } from "utils/use-async";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
import { useUrlQueryParam } from "utils/url";
// import { Helmet } from "react-helmet";
const apiURL = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [, setParam] = useState({ name: "", personId: "" });
  // const [keys,setKeys]=useState<('name'|'personId')[]>(['name','personId'])
  // const [param]=useUrlQueryParam(keys)
  const [param]=useUrlQueryParam(['name','personId'])
  const debouncedParam = useDebounce(param, 200);
  // const [users, setUsers] = useState([]);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUser();
  useDocumentTitle("项目列表", false);
  // console.log(useUrlQueryParam(["name"]));
  // const test = useUrlQueryParam(["name"]);

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
      {/* <Text /> */}
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;
/**
 * ProjectListScreen.whyDidYouRender = true;
 * 相当于
 *  class Test extends React.Component<any, any> {
      static whyDidYouRender = true;
    } 
 * */

const Container = styled.div`
  padding: 3.2rem;
`;
