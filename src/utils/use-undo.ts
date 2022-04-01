import { useState, useCallback, useReducer } from "react";
/**
 *
 *
 */

export const useUndo = <T>(initialPresent: T) => {
  // 用于记录历史操作的合集
  // const [past, setPast] = useState<T[]>([]);
  // const [present, setPresent] = useState(initialPresent);
  // const [future, setFuture] = useState<T[]>([]);
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });
  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;
  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (past.length === 0) return currentState;
      const previous = past[past.length - 1];
      // newPast是不包含最新的past  --即即将要变成现在的past
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
      // // 将newPast赋值给过去(setPast)
      // setPast(newPast);
      // // 将previous 给到现在(setPresent) -- 时间往前跳了一个
      // setPresent(previous);
      // // setFuture就多了一个项目 （present)
      // setFuture([present, ...future]);
    });
  }, []);
  const redo = useCallback(() => {
    setState((currentState) => {
      const { past, future, present } = currentState;
      if (future.length === 0) return currentState;
      const next = future[0];
      // ['present',f1,f2,f3,....] === newFuture,把f1舍弃掉,从f1开始往后复制f2,f3...
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
      // setPast([...past, present]);
      // setPresent(next);
      // setFuture(newFuture);
    });
  }, []);
  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { past, future, present } = currentState;
      if (newPresent === present) return currentState;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
    // // 如果传入新的present等于现在present,就return
    // if (newPresent === present) return;
    // // 传入新的present,现在的present就成为过去,就将现在的present传入到past中,让其成为过去
    // setPast([...past, present]);
    // // newPresent就成为现在的present
    // setPresent(newPresent);
    // // 将future置空
    // setFuture([]);
  }, []);
  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    });
    // setPast([]);
    // // 把现在的present设置成传入进来的newPresent
    // setPresent(newPresent);
    // setFuture([]);
  }, []);
  return [
    // { past, present, future },
    state,
    { set, reset, undo, redo, canUndo, canRedo },
  ] as const;
};
