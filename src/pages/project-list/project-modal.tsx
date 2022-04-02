import React, { useEffect } from "react";
import { Drawer, Button, Spin, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { UserSelect } from "components/user-select";
import { useAddProject, useEditProject } from "utils/project";
import { useProjectModal } from "./util";
import { ErrorBox } from "components/lib";

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject;

  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();
  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const title = editingProject ? "编辑项目" : "创建项目";

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);
  return (
    <Drawer
      forceRender={true}
      onClose={close}
      visible={projectModalOpen}
      width={"100%"}
    >
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <h1>{title}</h1>
          <ErrorBox error={error} />
          <Form
            form={form}
            layout="vertical"
            style={{ width: "40rem" }}
            onFinish={onFinish}
          >
            <Form.Item
              label="名称"
              name="name"
              rules={[{ required: true, message: "请输入项目名" }]}
            >
              <Input placeholder="请输入项目名称" autoComplete={"off"} />
            </Form.Item>
            <Form.Item
              label="部门"
              name="organization"
              rules={[{ required: true, message: "请输入部门名" }]}
            >
              <Input placeholder="请输入部门名" autoComplete={"off"} />
            </Form.Item>
            <Form.Item label="负责人" name="personId">
              <UserSelect defaultOptionName="负责人" />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button loading={mutateLoading} type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Drawer>
  );
};
