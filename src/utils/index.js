import { useEffect, useState } from "react";

// 如果值为0的时候,转值
export const isFalsy = (value) => (value === 0 ? false : !value);
// 清除无参数传入的数据
export const cleanObj = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
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
export const useDebounce = (value, daday = 2000) => {
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
