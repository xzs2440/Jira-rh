import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { LoginBtn } from "./index";
import { useAsync } from "utils/use-async";
import { useDispatch } from "react-redux";
import { login } from "store/auth.slice";

export const LgoinPage = ({ onError }: { onError: (error: Error) => void }) => {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const dispatch = useDispatch();
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    // 阻止表单提交的默认行为
    // event.preventDefault();
    // const username = (event.currentTarget.elements[0] as HTMLInputElement)
    //   .value;
    // const password = (event.currentTarget.elements[1] as HTMLInputElement)
    //   .value;
    // login(values);
    // dispatch(login(values));
    try {
      await run(login(values));
    } catch (e: any) {
      onError(e);
    }
    // await login(values).catch(onError);
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
      <Form.Item>
        <LoginBtn loading={isLoading} type={"primary"} htmlType={"submit"}>
          登录
        </LoginBtn>
      </Form.Item>
    </Form>
  );
};
