// /** @jsx jsx */
// import { jsx } from "@emotion/react";
import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
export interface User {
  id: string;
  name: string;
  title: string;
  email: string;
  organization: string;
  token: string;
}
interface SearchPanelProps {
  users: User[]; //uses是User类型的数组
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}
export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  // console.log(users, "----user");
  return (
    <Form layout={"inline"} style={{ marginBottom: "2rem" }}>
      <Form.Item>
        {/* 
          setParam({...param,name:evt.target.value})
           === 
          setParam(Object.assign({},param,{name:evt.target.value}))
        */}
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(evt) => {
            setParam({
              ...param,
              name: evt.target.value,
            });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) => {
            setParam({
              ...param,
              personId: value,
            });
          }}
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option value={String(user.id)} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
