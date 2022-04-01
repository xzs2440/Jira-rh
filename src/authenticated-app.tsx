import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "pages/project-list";
import { ProjectScreen } from "pages/project";
import { ButtonNoPadding, Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/jira.svg";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { resetRoute } from "utils";
import { ProjectModal } from "pages/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";

export const AuthenticatedApp = () => {
  // const value: any = undefined;
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader setProjectModalOpen={setProjectModalOpen} />
      {/* <Button onClick={() => setProjectModalOpen(true)}>open</Button> */}
      <Main>
        {/* <ProjectListScreen /> */}
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen setProjectModalOpen={setProjectModalOpen} />
              }
            />
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
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
};

const PageHeader = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <SoftwareLogo width={"10rem"} height={35} color={"rgb(38,132,255)"} />
        </ButtonNoPadding>
        <ProjectPopover setProjectModalOpen={props.setProjectModalOpen} />
        {/* <h3>项目</h3> */}
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
      {/* <Button onClick={logout}>登出</Button> */}
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
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
