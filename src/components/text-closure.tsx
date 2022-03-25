import { log } from "console";
import React, { useEffect, useMemo, useState } from "react";
import { useMount } from "utils";
// react hook与闭包，hook与闭包的坑
// const test = () => {
//   let num = 0;
//   const effect = () => {
//     num += 1;
//     const message = `现在的num值：${num}`;
//     return function unmount() {
//       console.log(message);
//     };
//   };
//   return effect;
// };
// // 执行test 返回effect函数
// const add = test();
// // 执行effect函数，返回引用了message1和unmount函数
// const unmount = add();
// // 再一次执行effect函数，返回引用了message2和unmount函数
// add();
// // 再一次执行effect函数，返回引用了message3和unmount函数
// add();
// // 再一次执行effect函数，返回引用了message4和unmount函数
// add();
// // 
// unmount(); //理论上来说，会打印3，实际上只打印了1

export const Text = () => {
  const [num, setNum] = useState(0);
  const add = () => setNum(num + 1);
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     console.log("num in setInterval", num);
  //   }, 1000);
  //   return () => clearInterval(id);
  // }, [num]);
  useEffect(() => {
    return () => {
      console.log(num);
    };
  }, [num]);
  return (
    <div>
      <button onClick={add}>add</button>
      <p>number:{num}</p>
    </div>
  );
};
