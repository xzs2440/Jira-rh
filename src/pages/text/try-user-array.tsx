import React from "react";
import { useMount, useArry } from "utils";

export const TsReactTest = () => {
  const person: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 22 },
  ];
  console.log(useArry(person));
  
  const { value, clear, removeIndex, add } = useArry(person);
  console.log(value);
  
  useMount(() => {
    // 期待这里报错：Property 'notExist' do not exit on type '{name:string;age:number}
    // console.log('value.notExits')
    // 期待这里报错：Property 'age' is missing in type  '{age:number}' but required in type
    // add({name:'david'})
    // 期待这里报错：Argument of type 'string' is not assjgnable of type 'number'
    // removeIndex('123')
  });
  return (
    <div>
      {/* 期待：点击以后增加 join */}
      <button onClick={() => add({ name: "john", age: 23 })}>add john</button>
      {/* 期待：点击以后删除第一项 */}
      <button onClick={() => removeIndex(0)}>remove 0</button>
      {/* 期待：点击以后清空列表 */}
      <button style={{ marginBottom: "50px" }} onClick={() => clear()}>
        clear
      </button>
      {value.map((person: { age: number; name: string }, index: number) => {
        <div style={{ marginBottom: "30px" }} key={index}>
          {person}
          <span style={{ color: "red" }}>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>;
      })}
    </div>
  );
};
