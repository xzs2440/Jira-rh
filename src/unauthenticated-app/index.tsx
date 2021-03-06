import React, { useState } from "react";
import { RegisterPage } from "./register";
import { LgoinPage } from "./login";
import { Button, Card, Divider, Typography } from "antd";
import styled from "@emotion/styled";
import logo from "assets/logo.jpg";
import left from "assets/left.svg";
import right from "assets/right.svg";
import { useDocumentTitle } from "utils";
import { Helmet } from "react-helmet";
import { ErrorBox } from "components/lib";
export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  // useDocumentTitle('请登录或注册以继续')
  return (
    <Container>
      {/* <Helmet>
        <title>请登录或注册以继续</title>
      </Helmet> */}
      <Header />
      <Background />
      {/* <Button
        onClick={() => {
          throw new Error("点击抛出一个异常");
        }}
      >
        抛出异常
      </Button> */}
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        <ErrorBox error={error}/>
        {/* {error ? (
          <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        ) : null} */}
        {isRegister ? (
          <RegisterPage onError={setError} />
        ) : (
          <LgoinPage onError={setError} />
        )}
        <Divider />
        <Button type={"link"} onClick={() => setIsRegister(!isRegister)}>
          切换到
          {isRegister ? "已经有账号了? 直接登录登录" : "没有账号? 注册新账号"}
        </Button>
      </ShadowCard>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0%.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

export const LoginBtn = styled(Button)`
  width: 100%;
`;
