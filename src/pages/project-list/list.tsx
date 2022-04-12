import React from "react";
import { User } from "types/User";
import { Table, TableProps, Dropdown, Menu, Modal } from "antd";
import dayjs from "dayjs";
import { Pin } from "components/pin";
import { ButtonNoPadding } from "components/lib";
// react-router 和 react-router-dom 的关系，
// 类似于react和react-dom、react-native、react-vr...
import { Link } from "react-router-dom";
import { useDeleteProject, useEditProject } from "utils/project";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { Project } from "../../types/Project";

interface ListProps extends TableProps<Project> {
  users: User[];
  // refresh?: () => void;
  // projectButton: JSX.Element;
}
export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey());

  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  // .then(props.refresh)
  // const { open } = useProjectModal();

  return (
    <Table
      pagination={false}
      rowKey={"id"}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render: (val, record) => {
            return (
              <Pin
                checked={record.pin}
                onCheckedChange={pinProject(record.id)}
              />
            );
          },
        },
        {
          title: "名称",
          // dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          dataIndex: "created",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          title: "操作",
          dataIndex: "created",
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗？",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteProject({id});
      },
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="edit">
            <ButtonNoPadding
              type="link"
              onClick={editProject(project.id)}
              // onClick={open}
            >
              编辑
            </ButtonNoPadding>
          </Menu.Item>
          <Menu.Item key="delete">
            <ButtonNoPadding
              onClick={() => confirmDeleteProject(project.id)}
              type="link"
            >
              删除
            </ButtonNoPadding>
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
  );
};
