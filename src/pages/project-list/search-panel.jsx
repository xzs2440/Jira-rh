import React, { useEffect, useState } from "react";

export const SearchPanel = ({param, setParam,users}) => {
  
  
  return (
    <form>
      <div>
        {/* 
          setParam({...param,name:evt.target.value})
           === 
          setParam(Object.assign({},param,{name:evt.target.value}))
        */}
        <input
          type="text"
          value={param.name}
          onChange={(evt) => {
            setParam({
              ...param,
              name: evt.target.value,
            });
          }}
        />
        <select
          value={param.personId}
          onChange={(evt) => {
            setParam({
              ...param,
              personId: evt.target.value,
            });
          }}
        >
          <option value="">负责人</option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
    </form>
  );
};
