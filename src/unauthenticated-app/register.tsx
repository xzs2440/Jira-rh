import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { LoginBtn } from "./index";
import { useAsync } from "utils/use-async";

export const RegisterPage = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      return onError(new Error("请确认两次输入的密码相同"));
    }
    // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // 阻止表单提交的默认行为
    // event.preventDefault();
    // const username = (event.currentTarget.elements[0] as HTMLInputElement)
    //   .value;
    // const password = (event.currentTarget.elements[1] as HTMLInputElement)
    //   .value;
    //   register({ username, password });
    try {
      await run(register(values));
    } catch (e: any) {
      onError(e);
    }
    // await register(values).catch(onError);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="text" id={"password"} />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请输确认密码" }]}
      >
        <Input placeholder={"确认密码"} type="text" id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <LoginBtn loading={isLoading} type={"primary"} htmlType={"submit"}>
          注册
        </LoginBtn>
      </Form.Item>
    </Form>
  );
};
