import styled from "@emotion/styled";
import { Popover, Typography, List, Divider, Button } from "antd";
import { useProjectModal } from "pages/project-list/util";
import React from "react";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
import { ButtonNoPadding } from "../../components/lib";

export const UserPopover = () => {
  const { data: users, refetch } = useUser();

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>组员列表</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
    </ContentContainer>
  );
  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottom"}
      content={content}
    >
      <span>组员</span>
    </Popover>
  );
};
const ContentContainer = styled.div`
  min-width: 30rem;
`;
