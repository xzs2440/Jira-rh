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
/**
 * 不管是系统自带的hook还是自己写的Custom Hook都是不可以在普通函数中运行的,
 * 1. 只能在其他hook中运行
 * 2. 组件中运行
 * 在写Custom Hook的时候一定要以use...开头
 */
### useDebounce

# 学习和使用ts的重要性
## 使用JS的时候，大部分错误是在runtime（运行时）的时候发现的
## 希望在静态代码中，就能找到其中一些错误   -->  强类型  -->ts
### ts   vs   js
/**
  TS：强类型 版的JS,
  在代码中定义变量（包括普通变量，函数，组件，hook等）的时候，
  TS允许定义的同时指定其类型，在使用不当的时候就会被及时报错提醒
  TS类型
    number ：数字类型，包含小数，其他进制的数字
    string ： 字符串
    boolean : 布尔值
    函数 ： 直接声明参数和返回值  和  直接声明想要的函数类型
    array ： 在TS中，array一般指 所有元素相同 的值的集合 和 混合类型的 ‘数组’ -> tuple
    any ： 表示这个值可以是任何值，被定义为any就意味着不做任何类型的检查
    void ： 绝大部分情况下，只会用在 表示这个函数不返回任何值或者返回undefined（因为函数不反悔任何值的时候 === 或者返回 undefined）
    object ： 除了以上类型，其他的都是object
    tuple ： 另一种array , 数量固定，类型可以各异 版的数组   
            eg:const [users,setUsers]=useState([])
    enum 
    null和undefined ： 在TS中即是一个值，也是一个类型
    unknown : 表示这个值是任何值--严格版本的‘any’   unknown不能赋给任何的值，也不能读取任何unknown里任何的方法
    never 
    interface ： 不是一个类型， 创建一个自己的类型
  什么时候需要：
    在声明任何变量的时候，都需要声明类型（包括普通变量，函数，组件，hook等），声明 函数，组件，hook等需要声明参数和返回值的类型
  .d.ts
    js文件+.d.ts文件  === ts文件
    .d.ts文件可以让js文件继续维持自己js文件的身份，而拥有TS的类型保护
*/