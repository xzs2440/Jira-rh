import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObj } from "utils";

/**
 * 返回页面URL中，指定键的参数值
 * */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      /**
       * iterator - 遍历器
       * [] {} Map  都是部署了遍历器的
       * iterator特点:都是可以使用for_of 进行遍历
       * item[Symbol.iterator]
       * */
      /**
       * Object.fromEntries  就是把键值队列表转化为对象
       * 参数  传入 iterable   --   类似于 [],{},Map 或其他实现了可迭代协议的可迭代对象
       * 返回值  一个由迭代对象条目提供对应属性的新对象
       * */
      // const o = cleanObj({
      //   ...Object.fromEntries(searchParams), // 可以读取出url的对象
      //   ...params,
      // }) as URLSearchParamsInit;
      // return setSearchParam(o);
      return setSearchParams(params);
    },
  ] as const;
  // console.log(searchParams.get("name"));

  // searchParams.get("name");
};
// as const 为表达式推断出它能推断出的最窄或最特定的类型。
// 如果不使用它，编译器将使用其默认类型推断行为，这可能会导致更广泛或更一般的类型。
const a = ["jack", 12, { gender: "male" }] as const;

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObj({
      ...Object.fromEntries(searchParams), // 可以读取出url的对象
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};
