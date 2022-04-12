import React from "react";
import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util";
import { SearchPanel } from "pages/kanban/search-panel";
import { ScreenContainer } from "components/lib";
import { useTasks } from "utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: taskIsloading } = useTasks(useTasksSearchParams());
  const isLoading = kanbanIsLoading || taskIsloading;
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnsContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn key={kanban.id} kanban={kanban} />
          ))}
          <CreateKanban />
        </ColumnsContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  );
};
export const ColumnsContainer = styled.div`
  display: flex;
  /* overflow: hidden;
  margin-right: 2rem; */
  flex: 1;
  overflow-x: scroll;
`;
