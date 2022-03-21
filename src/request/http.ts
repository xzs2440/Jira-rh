import qs from "qs";
import * as auth from "auth-provider";
const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  token?: string;
  data?: object;
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      //未登录或token失效的情况下 返回4401
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      /**
       *
       * fetch api 服务端返回的无论401还是500，fetch catch都抓不到异常，只有在断网或者链接失败才会抓住异常
       * 所以，我们这里只能手动抛出异常
       * axios 和 fetch 的表现不一样，
       * axios可以直接在返回状态为2xx的时候抛出异常，
       * 而fetch则无法直接抛出，需要在response中 而fetch则无法直接抛出，需要在response中.ok才能抛出异常
       *
       * */
      return Promise.reject(data);
    }
  });
};
