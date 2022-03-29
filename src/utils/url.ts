import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * 返回页面URL中，指定键的参数值
 * */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams]
    ),
    setSearchParam,
  ] as const;
  // console.log(searchParams.get("name"));

  // searchParams.get("name");
};
// as const 为表达式推断出它能推断出的最窄或最特定的类型。
// 如果不使用它，编译器将使用其默认类型推断行为，这可能会导致更广泛或更一般的类型。
const a = ["jack", 12, { gender: "male" }] as const;
