import styled from "@emotion/styled";
import { Button } from "antd";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "pages/project-list";
import React from "react";
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>logo</h3>
          <h3>用户</h3>
          <h3>项目</h3>
        </HeaderLeft>
        {/* <HeaderRight>right;</HeaderRight> */}
        <Button onClick={logout}>登出</Button>
      </Header>
      <Nav>nav</Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside>Aside</Aside>
      <Footer>footer</Footer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  /* grid-template-rows  -> 从上到下 表示header main footer */
  grid-template-rows: 6rem 1fr 6rem;
  /* grid-template-columns   -> 从左到右 表示 左 中 右 */
  grid-template-columns: 20rem 1fr 20rem;
  /* grid-template-areas  ->布局是怎么排列的   */
  grid-template-areas:
  /* header 独占一行 */
    "header header deader"
    /* 中间 左边是nav 中间是main 右边是 aside */
    "nav main aside"
    /* footer 独占一行 */
    "footer footer footer";
  height: 100vh;
  grid-gap: 10rem;
`;
// grid-area用于给grid元素起名
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;
const Nav = styled.nav`
  grid-area: nav;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const Footer = styled.footer`
  grid-area: footer;
`;
/* const PagesHeader = styled.header`
  background-color: gray;
  height: 6rem;
`;
const Main = styled.main`
  height: calc(100vh - 6rem);
`; */

/* const Header = styled.header`
  padding: 2rem;
  justify-content: space-between;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`; */
