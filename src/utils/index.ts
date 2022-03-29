import { title } from "process";
import { useEffect, useState, useRef } from "react";

// 如果值为0的时候,转值
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
// 清除无参数传入的数据
export const cleanObj = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

// Custom Hook
/**
 * 不管是系统自带的hook还是自己写的Custom Hook都是不可以在普通函数中运行的,
 * 1. 只能在其他hook中运行
 * 2. 组件中运行
 * 在写Custom Hook的时候一定要以use...开头
 */
export const useMount = (callback: () => void) => {
  // 在页面一开始加载的时候,执行的函数
  useEffect(() => {
    callback();
    // 依赖项加上callback会造成无限循环，这个和useCallback和useMeno有关系
    // eslint-disabled-next-line react-hooks/exhaustive-deps
  }, []);
};

/**
 * debounce--防抖
    const debounce = (func, delay=5000) => {
      let timeout;
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
          func();
        }, delay);
      };
    };
 * const log=debounce(()=>console.log("call"),5000)
 * log()
 * log()
 * log()
 *
 * 原理:
 * 0s ---> 1s ---> 2s ---> 3s ---> 4s ---> 5s ---> ...
 * 理解: 这三个函数是同步操作,所以他们都是在0~1s这个时间段瞬间完成的
 * log() #1  --> timeout#1
 * log() #2  --> 发现timeout#1! 取消之,然后设置timeout#2
 * log() #3  --> 发现timeout#2! 取消之,然后设置timeout#3
 *           --> 所以,log()#3 结束后,就只剩timeout#3在独自等待了
 * */
/**
 * useDebounce的作用就是,将value转变成debounceValue,
 * 但是value和debounceValue之间的关系,并不是直接可以转换的
 * 需要在内部定义一个状态(响应式的状态)
 * */
// 使用泛型来规范类型
export const useDebounce = <V>(value: V, daday?: number) => {
  // Custom Hook定义了一个内部的变量 --debounceValue
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    // 每次在value变化的时候,我们都设置了一个定时器,
    // 在dalay毫秒之后,再来setDebounceValue
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, daday);
    // 每次在上一次useEffect运行完成之后,再来执行,主要是用于清理上一次定时器的任务
    return () => clearTimeout(timeout);
  }, [value, daday]);
  return debounceValue;
};

/**
 * throttle--节流
 * */

export const useArry = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  // 页面加载时：oldTitle === 旧titile -> 'React App'
  // 加载后：ldTitle === 新titile
  // 在加载的时候用useRef保存一个值，那么这个值在组件的整个生命周期中，是不会变化的
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 如果不指定依赖，读到的就是旧titile
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};
// 重置路由,不但回到根路由，而且还会刷新浏览器
export const resetRoute = () => (window.location.href = window.location.origin);
