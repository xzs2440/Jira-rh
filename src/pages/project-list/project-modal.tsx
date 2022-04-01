import { Drawer, Button } from "antd";
import React from "react";

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer onClose={props.onClose} visible={props.projectModalOpen} width={"100%"}>
      <h1>project-modal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
