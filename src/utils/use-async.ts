import { useState } from "react";
import { setConstantValue } from "typescript";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success"; // 未开始 | 加载中 | 错误 | 成功
}
/**
 * defaultInitialStatus:默认的State
 * initialState : 传入的state
 * 优先级  initialState  >  defaultInitialStatus
 * */
const defaultInitialStatus: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};
const defaultConfig = {
  throwOnError: false,
};
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialStatus,
    ...initialState,
  });
  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });
  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });
  // run 用来触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入Peomise数据类型");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((err) => {
        // catch会消化异常，如果不主动抛出去，外面是接收不到异常的
        setError(err);
        if (config.throwOnError) {
          // 配置为可选的，需要抛就抛出去
          return Promise.reject(err); // 抛出去
        }
        return err;
      });
  };
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};