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

### 泛型  -- 泛型增强 useDebounce 类型灵活性

# JWT原理与auth-provider实现
## JWT原理
## auth-provider实现

# 使用useContext 存储用户信息

# 用fetch抽离通用HTTP请求方法，增强通用性

# TS Utility typeof --工具
## 联合类型 
## let myFavoritrNumber : string | number   -> |
## myFavoritrNumber='seven'
## myFavoritrNumber=7
/**
 * TS Utility typeof --工具
 * 联合类型
 * */

let myFavoritrNumber: string | number;
myFavoritrNumber = "seven";
myFavoritrNumber = 7;
// myFavoritrNumber={}   //报错
let jackFavoritrNum: string | number;
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
type FavoritrNum = string | number;
let tomFavNum: FavoritrNum = 6;

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
type Person = {
  // name?: string;
  // age?: number;
  name: string;
  age: number;
};
let xiaoming: Partial<Person> = { age: 8 }; //Partial-> 允许不传入任何属性,可有可无
let daxin: Omit<Person, "name"> = { age: 6 }; //Omit -> 指定参数不允许传入  从Person中,把name删掉 {name:'daxin'} //报错
let xiaofang: Omit<Person, "name" | "age"> = { name: "daxin" }; //从Person中,把name和age都删掉

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

type PersonKeys = keyof Person;
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
type PersonOnlyName = Pick<Person, "name" | "age">;
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
type Age = Exclude<PersonKeys, "name">;
// type Exclude<T, U> = T extends U ? never : T;


# css-in-js  组织css代码的一种方式
## 代表库  styled-component emotion
## 传统css的缺陷
### 缺乏模块组织
### 缺乏作用域
### 隐式依赖,样式难以追踪
### css选择器与html元素耦合
### css没有变量
### 
# grid和flex的区别及应用场景
## grid和flex的应用场景
  1. 要区分 是一维布局，还是二维布局  
    - 一般来说 一维布局用flex 二维布局用grid
  2. 从内容出发还是 布局出发  
    - 从内容出发：先有一组内容（数量一般不固定），然后希望他们均匀的分布在容器中，由内容自己来决定占据的空间大小
    - 从布局出发：先规划网格（数量固定），然后再把元素往里填充
    - 从内容出发,用flex 从布局出发,用grid

<!-- 
- html
  <Container>
    <Header>
      <HeaderLeft>
        <h3>logo</h3>
        <h3>用户</h3>
        <h3>项目</h3>
      </HeaderLeft>
      {/* <HeaderRight>right;</HeaderRight> */}
      <Button onClick={logout}>登出</Button>
    </Header>
    <Nav>nav</Nav>
    <Main>
      <ProjectListScreen />
    </Main>
    <Aside>Aside</Aside>
    <Footer>footer</Footer>
  </Container>
- css
  const Container = styled.div`
    display: grid;
    /* grid-template-rows  -> 从上到下 表示header main footer */
    grid-template-rows: 6rem 1fr 6rem;
    /* grid-template-columns   -> 从左到右 表示 左 中 右 */
    grid-template-columns: 20rem 1fr 20rem;
    /* grid-template-areas  ->布局是怎么排列的   */
    grid-template-areas:
    /* header 独占一行 */
      "header header deader"
      /* 中间 左边是nav 中间是main 右边是 aside */
      "nav main aside"
      /* footer 独占一行 */
      "footer footer footer";
    height: 100vh;
    grid-gap: 10rem;
  `;
  // grid-area用于给grid元素起名
  const Header = styled.header`
    grid-area: header;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `;
  const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
  `;
  const Main = styled.main`
    grid-area: main;
  `;
  const Nav = styled.nav`
    grid-area: nav;
  `;
  const Aside = styled.aside`
    grid-area: aside;
  `;
  const Footer = styled.footer`
    grid-area: footer;
  `; 
-->
# 何时使用useMemo 何时使用useCallback
## 非基本类型的依赖 -- 使用useCallback
## 如果要写自定义hook的时候，需要返回function，就需要使用useCallback来限制
# const he var
## 其实const和var都存在变量提升，但是const不像var一样直接提升到顶部，同时赋值undefined
## conts存在temporal dead zone （暂时性死区），可以提升到顶部，但是在初始化之前，无法反访问到

# 状态提升 -- props
# prop drilling 
## 定义与使用 距离太远了 -- 紧耦合

# 组合组件 -- component compositon  -- 如果只是想避免层层传递一些属性
## 和子组件解耦了 子组件只需要渲染就可以了
## 对组件的控制反转减少了在应用中要传递的props数量
## 不适用：这种将逻辑提升到组件树的更高层次来来处理，会使得这些高层组件变得更为复杂，并且会强行将底层组件适应这样的形式，可能不会是你想要的
## 而且组件并不限制与接受单个子组件，传递多个子组件，甚至会为这些子组件（children）封装多个单独的slots

# 控制反转
## 就是本来需要某个类（构造函数）的某个方式时，需要主动实例化变为被动，不需要是loC的一种实现方式
## 所谓依赖注入就是由loC容器在运行期间，动态地将某种依赖关系注入到对象中
## 所以loC和DI是从不同角度来描述同一件事情，就是通过引入loC容器，利用依赖注入方式，实现对象之间的解释
## 提高开发效率  提高模块化  便于单元测试

# redux 和useReducer
## useReducer：通过action的传递，更新复杂逻辑的状态，主要是可以实现类似Redux中的Reducer部分，实现业务逻辑的可行性。
## useContext：可访问全局状态，避免一层层的传递状态。这符合Redux其中的一项规则，就是状态全局化，并能统一管理。