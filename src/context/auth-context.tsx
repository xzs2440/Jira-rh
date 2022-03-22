import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { User } from "pages/project-list/search-panel";
import { http } from "request/http";
import { useMount } from "utils";
interface AuthForm {
  username: string;
  password: string;
}
const bootstrapUser = async () => {
  let user = null;
  // 先调用auth.getToken()
  const token = auth.getToken();
  if (token) {
    // 如果存在token 就请求'me'api ,就会返回user信息
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // point free
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  // 在页面加载的时候,调用bootstrapUser
  useMount(() => {
    bootstrapUser().then(setUser)
  });
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
