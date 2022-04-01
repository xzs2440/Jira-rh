import { useState, useCallback, useReducer } from "react";
/**
 *
 */
const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";
type State<T> = {
  past: T[];
  present: T;
  future: T[];
};
type Action<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};
// undoReducer函数,每次运行都会接收两个参数 state(当前的state值) action (传进来的参数)
// undoReducer函数,接收当前的state值,结合传进来的action 告诉reducer这个值结束之后,下一个值是什么,return新的值
const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { newPresent, type } = action;
  // 当接收到dispatch参数,就进行判断,返回新的值
  switch (type) {
    case UNDO: {
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }
    case REDO: {
      if (future.length === 0) return state;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }
    case SET: {
      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }
    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
    default:
      break;
  }

  return state;
};
export const useUndo = <T>(initialPresent: T) => {
  // useReducer 第一个参数接受useReducer函数,第二个参数接受状态的初始值
  // 调用Reducerfn开始产值的时候,就调用dispatch
  // dispatch传入的参数可以自定定义
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);
  // 用于记录历史操作的合集
  // const [past, setPast] = useState<T[]>([]);
  // const [present, setPresent] = useState(initialPresent);
  // const [future, setFuture] = useState<T[]>([]);
  // const [state, setState] = useState<{
  //   past: T[];
  //   present: T;
  //   future: T[];
  // }>({
  //   past: [],
  //   present: initialPresent,
  //   future: [],
  // });
  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;
  const undo = useCallback(() => {
    dispatch({ type: UNDO });
    // setState((currentState) => {
    //   const { past, present, future } = currentState;
    //   if (past.length === 0) return currentState;
    //   const previous = past[past.length - 1];
    //   // newPast是不包含最新的past  --即即将要变成现在的past
    //   const newPast = past.slice(0, past.length - 1);
    //   return {
    //     past: newPast,
    //     present: previous,
    //     future: [present, ...future],
    //   };
    //   // // 将newPast赋值给过去(setPast)
    //   // setPast(newPast);
    //   // // 将previous 给到现在(setPresent) -- 时间往前跳了一个
    //   // setPresent(previous);
    //   // // setFuture就多了一个项目 （present)
    //   // setFuture([present, ...future]);
    // });
  }, []);
  const redo = useCallback(() => {
    dispatch({ type: REDO });
    // setState((currentState) => {
    //   const { past, future, present } = currentState;
    //   if (future.length === 0) return currentState;
    //   const next = future[0];
    //   // ['present',f1,f2,f3,....] === newFuture,把f1舍弃掉,从f1开始往后复制f2,f3...
    //   const newFuture = future.slice(1);
    //   return {
    //     past: [...past, present],
    //     present: next,
    //     future: newFuture,
    //   };
    //   // setPast([...past, present]);
    //   // setPresent(next);
    //   // setFuture(newFuture);
    // });
  }, []);
  const set = useCallback((newPresent: T) => {
    dispatch({ type: SET, newPresent });
    // setState((currentState) => {
    //   const { past, future, present } = currentState;
    //   if (newPresent === present) return currentState;
    //   return {
    //     past: [...past, present],
    //     present: newPresent,
    //     future: [],
    //   };
    // });
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
    dispatch({ type: RESET, newPresent });
    // setState(() => {
    //   return {
    //     past: [],
    //     present: newPresent,
    //     future: [],
    //   };
    // });
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
