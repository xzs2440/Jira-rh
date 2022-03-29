import React from "react";
import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "pages/project-list";
import { ProjectScreen } from "pages/project";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/jira.svg";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { resetRoute } from "utils";

export const AuthenticatedApp = () => {
  const value: any = undefined;
  return (
    <div>
      <PageHeader />
      <Main>
        {/* <ProjectListScreen /> */}
        <Router>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            {/* 如果没有匹配到，就会打开下面Navigate默认的路由 */}
            <Route
              path="/"
              element={<Navigate to="/projects" replace={true} />}
            />
            {/* <Navigate to={"/projects"} /> */}
          </Routes>
        </Router>
      </Main>
    </div>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo
            width={"10rem"}
            height={35}
            color={"rgb(38,132,255)"}
          />
        </Button>

        <h2>用户</h2>
        <h2>项目</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <Button type={"link"} onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="link" onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
      {/* <Button onClick={logout}>登出</Button> */}
    </Header>
  );
};

const Container = styled.div`
  /* display: grid; */
  /* grid-template-rows  -> 从上到下 表示header main footer */
  /* grid-template-rows: 6rem 1fr 6rem; */
  /* grid-template-columns   -> 从左到右 表示 左 中 右 */
  /* grid-template-columns: 20rem 1fr 20rem; */
  /* grid-template-areas  ->布局是怎么排列的   */
  height: 100vh;
`;
// grid-area用于给grid元素起名
const Header = styled(Row)`
  justify-content: space-between;
  padding: 0.5rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  height: calc(100vh - 6rem);
  grid-area: main;
`;
const HeaderItem = styled.h3`
  margin-right: 3rem;
`;
