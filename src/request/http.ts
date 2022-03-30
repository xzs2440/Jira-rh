import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { type } from "os";
import { useCallback } from "react";
const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  token?: string;
  data?: object;
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      //未登录或token失效的情况下 返回4401
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      /**
       *
       * fetch api 服务端返回的无论401还是500，fetch catch都抓不到异常，只有在断网或者链接失败才会抓住异常
       * 所以，我们这里只能手动抛出异常
       * axios 和 fetch 的表现不一样，
       * axios可以直接在返回状态为2xx的时候抛出异常，
       * 而fetch则无法直接抛出，需要在response中 而fetch则无法直接抛出，需要在response中.ok才能抛出异常
       *
       * */
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};

/**
 * TS Utility typeof --工具
 * 联合类型
 * */

// let myFavoritrNumber: string | number;
// myFavoritrNumber = "seven";
// myFavoritrNumber = 7;
// myFavoritrNumber={}   //报错
// let jackFavoritrNum: string | number;
/**
 * 类型别名
 * 在很多情况下,可以和interface互换
 * 区别
 * 1. 定义联合类型 type可以实现,interface则无法做到
 * type FavoritrNum = string | number;  √
 * type FavoritrNum = string & number;  √
 * 2. interface也无法实现Utility type
 *  js中的typeof是在runtime时运行的
 *  ts中的typeof是在静态环境运行的
 *    return (...[endpoint, config]: Parameters<typeof http>) =>
 *  Utility type的用法:用泛型给它传入一个其他类型,
 *  然后Utility type对这个类型进行某种操作
 * */
// type FavoritrNum = string | number;
// let tomFavNum: FavoritrNum = 6;

/**
 * interface
 * */
// interface Person {
//   name: string;
//   age?: number;
// }
// let xiaoming: Person = { name: "xiaoming" };
// let daxin: Person = { name: "daxin", age: 25 };

// interface也无法实现Utility type
// type Person = {
//   // name?: string;
//   // age?: number;
//   name: string;
//   age: number;
// };
// let xiaoming: Partial<Person> = { age: 8 }; //Partial-> 允许不传入任何属性,可有可无
// let daxin: Omit<Person, "name"> = { age: 6 }; //Omit -> 指定参数不允许传入  从Person中,把name删掉 {name:'daxin'} //报错
// let xiaofang: Omit<Person, "name" | "age"> = { name: "daxin" }; //从Person中,把name和age都删掉

/**
 * TS的Utility
 * Types-Pick、
 * Exclude、
 * Partial
 * Omit
 * 实现
 * */
/**
 *  Partial的实现
 *  其实就是获取到泛型的key，然后统一修改成？可有可无的状态
 * */

// type PersonKeys = keyof Person;
// type Partial<T> = {
//   /**
//    * keyof的作用,就是把Person的键值,取出来,形成一个联合类型
//    * in --> 遍历
//    * ? --> 统一修改成？可有可无的状态
//    * P --> 对象
//    * T --> 键
//    * T[P] --> 值
//    * */
//   [P in keyof T]?: T[P];
// };

/**
 * Omit
 * Pick --> 用于在对象中挑选几个键,组成一个新的类型
 *
 */
// type PersonOnlyName = Pick<Person, "name" | "age">;
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
/**
 * keyof  -> T,即第一个泛型的键值的集合
 * extends-> 这个K,必须是在这个T的键值的集合里面,即K是T键值集合的子集
 * in --> 遍历 传入的第二个泛型 即传入的键的名字的类型
 * P -> 临时的变量,临时的泛型名字
 * T[P] ->值
 * */
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };

/**
 * Exclude
 * 第一个参数传入联合类型,第二个参数,传入联合类型,其中的一个类型
 * 这个联合类型,就从其中的,过滤掉第二个属性,返回剩下的类型
 *  T -> 总的联合类型
 *  U -> 要删除掉的联合类型
 * */
// type Age = Exclude<PersonKeys, "name">;
// type Exclude<T, U> = T extends U ? never : T;
