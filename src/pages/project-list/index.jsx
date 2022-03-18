import React, { useEffect, useState } from "react";
import { cleanObj,useDebounce } from "utils";
import * as qs from 'qs'
// import { connect } from "react-redux";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
const apiURL = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debouncedParam=useDebounce(param,2000)
  useEffect(() => {
    fetch(`${apiURL}/projects?${qs.stringify(cleanObj(debouncedParam))}`).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);
  useMount(() => {
    fetch(`${apiURL}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};

// Custom Hook
/**
 * 不管是系统自带的hook还是自己写的Custom Hook都是不可以在普通函数中运行的,
 * 1. 只能在其他hook中运行
 * 2. 组件中运行
 * 在写Custom Hook的时候一定要以use...开头
*/ 
export const useMount=(callback)=>{
  // 在页面一开始加载的时候,执行的函数
  useEffect(()=>{
    callback()
  },[])
}
