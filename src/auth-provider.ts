// 在真实环境中,如果使用firebbase这种第三方auth服务的话,本文件就不需要开发者开发
import { User } from "pages/project-list/search-panel";
const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKay = "__auth_provider_token__";
export const getToken = () => window.localStorage.getItem(localStorageKay);
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKay, user.token || "");
  return user;
};


/**
 * axios 和 fetch 的表现不一样，
 * axios可以直接在返回状态为2xx的时候抛出异常，
 * 而fetch则无法直接抛出，需要在response中 !而fetch则无法直接抛出，需要在response中.ok才能抛出异常
 * */ 
// 登录
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res: Response) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(await res.json());
    }
  });
};

// 注册
export const register = async (data: {
  username: string;
  password: string;
}) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res: Response) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(await res.json());
    }
  });
};

// 登出
export const logout = async () =>
  window.localStorage.removeItem(localStorageKay);