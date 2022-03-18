# 技术栈
## React 17
### JSX,State,事件处理等必备知识
### 状态提升,组件解耦,组合
### Refs转发
### 高阶组件
### Render Props
### 错误边界(Erroe Boundaires)
### ...

## React Hook
### useState,useRef等自带Hook详解
### 自定义Hook:异步操作,状态管理,debounce,路由,增删查改等
### 发挥Hook最大的威力

## typescript4
### 第四大最受欢迎编程语言
### 可以不用,但是不可以不会
### 必备知识+高级特性 应用
### 打造强大的类型约束系统

## 其他
### Hook+Content/Redux Toolkit管理客户端全局状态
### React Query 管理服务端全局状态
### 性能优化,性能监控,性能报告
### 自动化测试:单元测试,集成测试,e2e测试 
### CSS-in-JS,Grid,Flexbox
### React Router 6


# API
## REST API
### GET /tickets // 列表
### GET /tickets/12  // 详情
### POST /tickets  // 增加
### PUT /tickets/12  // 替换 
### PATCH /tickets/12 // 修改 
### DELETE /tickets/12 // 删除 

# React 列表数据获取与渲染 -- 工程列表
## decodeURLComponent(转义成汉字) encodeURLComponent(转义成加密)  encodeURL(转义整个URL)
## 问题 : 状态提升
## 组件组合,数据传递,useEffect,useState 

# 用Custom Hook 提取复用组件代码
## 使用 useMount 和 useDebounce
### useMount
 * 不管是系统自带的hook还是自己写的Custom Hook都是不可以在普通函数中运行的,
 * 1. 只能在其他hook中运行
 * 2. 组件中运行
 * 在写Custom Hook的时候一定要以use...开头
### useDebounce