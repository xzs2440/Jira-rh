import React from "react";
import styled from "@emotion/styled";
import { EpicScreen } from "pages/epic";
import { KanbanScreen } from "pages/kanban";
import { Link, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode="inline" selectedKeys={[routeType]}>
          {/* 如果加上/就会变成根路由，比如/kanban就会跳到localhost:3000/kanban */}
          <Menu.Item key="kanban">
            <Link to={"kanban"}>看板</Link>
          </Menu.Item>
          <Menu.Item key="epic">
            <Link to={"epic"}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={"/kanban"} element={<KanbanScreen />} />
          <Route path={"/epic"} element={<EpicScreen />} />
          {/* 如果没有匹配到，就会打开下面Navigate默认的路由 */}
          <Route
            path="*"
            element={
              <Navigate
                to={window.location.pathname + "/kanban"}
                replace={true}
              />
            }
          />
        </Routes>
      </Main>
    </Container>
  );
};
const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;
const Main = styled.div`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  overflow: hidden;
  /* width: 100%; */
`;
