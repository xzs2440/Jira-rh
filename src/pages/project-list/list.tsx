import React from "react";
import { User } from "pages/project-list/search-panel";
import { Table, TableProps, Dropdown, Menu } from "antd";
import dayjs from "dayjs";
import { Pin } from "components/pin";
import { ButtonNoPadding } from "components/lib";
// react-router 和 react-router-dom 的关系，
// 类似于react和react-dom、react-native、react-vr...
import { Link } from "react-router-dom";
import { useEditProject } from "utils/project";
import { useProjectModal } from "./util";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
interface ListProps extends TableProps<Project> {
  users: User[];
  // refresh?: () => void;
  // projectButton: JSX.Element;
}
export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const { startEdit } = useProjectModal();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin });
  const editProject = (id: number) => () => startEdit(id);
  // .then(props.refresh)
  const { open } = useProjectModal();

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
          title: "创建时间",
          dataIndex: "created",
          render(value, project) {
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
                        // onClick={() => confirmDeleteProject(project.id)}
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
          },
        },
      ]}
      {...props}
    />
  );
  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>名称</th>
  //         <th>负责人</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {list.map((project) => (
  //         <tr key={project.id}>
  //           <td>{project.name}</td>
  //           <td>
  //             {users.find((user) => user.id === project.personId)?.name ||
  //               "未知"}
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
};
