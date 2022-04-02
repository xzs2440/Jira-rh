import React, { ReactNode, useCallback, useState } from "react";
import * as auth from "auth-provider";
import { User } from "pages/project-list/search-panel";
import { http } from "request/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import * as authStore from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
export interface AuthForm {
  username: string;
  password: string;
}
export const bootstrapUser = async () => {
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
// const AuthContext = React.createContext<
//   | {
//       user: User | null;
//       register: (form: AuthForm) => Promise<void>;
//       login: (form: AuthForm) => Promise<void>;
//       logout: () => Promise<void>;
//     }
//   | undefined
// >(undefined);
// AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    // data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    // setData: setUser,
  } = useAsync<User | null>();
  const dispatch: (...arge: unknown[]) => Promise<User> = useDispatch();
  // const [user, setUser] = useState<User | null>(null);

  // point free
  // const login = (form: AuthForm) => auth.login(form).then(setUser);
  // const register = (form: AuthForm) => auth.register(form).then(setUser);
  // const logout = () => auth.logout().then(() => setUser(null));

  // 在页面加载的时候,调用bootstrapUser
  useMount(() => {
    run(dispatch(authStore.bootstrap()));
    // run(bootstrapUser());
    // bootstrapUser().then(setUser);
  });
  if (isIdle || isLoading) {
    return <FullPageLoading />;
    // return <p>loading</p>;
  }
  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }
  return <div>{children}</div>;
  // <AuthContext.Provider
  //   children={children}
  //   value={{ user, login, register, logout }}
  // />
};
export const useAuth = () => {
  // const context = React.useContext(AuthContext);
  // if (!context) {
  //   throw new Error("useAuth必须在AuthProvider中使用");
  // }
  const dispatch: (...arge: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(authStore.selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};
