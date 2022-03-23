import styled from "@emotion/styled";
import { Button } from "antd";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "pages/project-list";
import { Row } from "components/lib";
import React from "react";
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h3>logo</h3>
          <h3>用户</h3>
          <h3>项目</h3>
        </HeaderLeft>
        {/* <HeaderRight>right;</HeaderRight> */}
        <Button onClick={logout}>登出</Button>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </div>
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
`;
const HeaderLeft = styled(Row)``;
const Main = styled.main`
  height: calc(100vh - 6rem);
  grid-area: main;
`;
const HeaderItem = styled.h3`
  margin-right: 3rem;
`;
