import { useCallback, useState } from "react";
import { setConstantValue } from "typescript";
import { useMountedRef } from "utils";

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
  const mountedRef = useMountedRef();
  // useState 直接传入函数的意义是：惰性初始化，所以用useState保存函数，不能直接传入函数
  const [retry, setRetry] = useState(() => () => {});
  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        stat: "success",
        error: null,
      }),
    []
  );
  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        stat: "error",
        data: null,
      }),
    []
  );
  // run 用来触发异步请求
  // 只有当依赖列表的数据发生变化的时候，这个run才会被重新定义
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入Peomise数据类型");
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      setState(prevState=>({ ...prevState, stat: "loading" }));
      return promise
        .then((data) => {
          if (mountedRef.current) setData(data);
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
    },
    [config.throwOnError, mountedRef, setData, setError]
  );
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
    // retry被调用时，重新跑一边run，让state一次
    retry,
  };
};
