# Week 05

## 表达式

### 运算符与表达式

-   member
-   new
-   call
-   left Handside & right Handside
-   update
-   Unary
-   Exponental
-   Multiplicative
-   Additive
-   Shift
-   Relationship
-   Equality
-   BitWise
-   Logic
-   Conditional

### 类型转换

|           | Number          | String            | Boolean  | Undefined | Null | Object | Symbol |
| --------- | --------------- | ----------------- | -------- | --------- | ---- | ------ | ------ |
| Number    | -               |                   | 0 false  | Χ         | Χ    | Boxing | Χ      |
| String    |                 | -                 | "" false | Χ         | Χ    | Boxing | Χ      |
| Boolean   | true 1, false 0 | "true","false"    | -        | Χ         | Χ    | boxing | Χ      |
| Undefined | NaN             | 'Undefined'       | false    | -         | Χ    | Χ      | Χ      |
| Null      | 0               | 'null'            | false    | Χ         | -    | Χ      | Χ      |
| Object    | valueOf         | valueOf, toString | true     | Χ         | Χ    | -      | Χ      |
| Symbol    | Χ               | Χ                 | Χ        | Χ         | Χ    | Boxing | -      |

#### 拆箱管理 Unboxing

Object 类型转换为基本类型

Object 对象在运行中会发生拆箱操作，主要是`toPrimitive`在起作用。对象的三个方法影响`toPrimitive`的返回值。

```js
 var o = {
   toString(){return '2';} //
   valueOf(){return 1} // 加法优先
   [Symbol.toPrimitive](){return 3} // 1
 }
```

#### 装箱操作

> 使用基础类型对应包装类

| 类型    | 对象                    | 值          |
| ------- | ----------------------- | ----------- |
| Number  | new Number(1)           | 1           |
| String  | new String('a')         | 'a'         |
| Boolean | new Boolean(true)       | true        |
| Symbol  | new Object(Symbol('a')) | Symbol('a') |

## Statement

### Runtime

-   Completion Record
    -   [[type]]:normal, break, continue, return, or throw
    -   [[value]]: base type
    -   [[target]]: label
-   Lexical Environment

### Grammar

-   简单语句
    -   ExpressionStatement
    -   EmptyStatement
    -   DebuggerStatement
    -   ThrowStatement
    -   ContinueStatement
    -   BreakStatement
    -   ReturnStatement
-   复合语句
    -   BlockStatement
        -   { xxx } type: `normal`
    -   IfStatement
    -   IterationStatement
    -   WithStatement
    -   LabelledStatement
    -   TryStatement
        -   `finnally`内的代码必定执行，++边边角角的规则++
-   声明
    -   FunctionDeclaration
    -   GeneratorDeclaration
    -   AsyncFunctionDeclaration
    -   VariableDeclaration
    -   ClassDeclarartion
    -   LexicalDeclaration

### 预处理（pre-process）

执行前去查找全部的`var`, `let`, `const`声明的变量

### 作用域

-   全局作用域
-   函数作用域
-   块作用域

## 结构化

### JavaScript 执行粒度（运行时）

-   宏任务
    > 传给 JavaScript 引擎(静态的代码库)的任务
-   微任务(Promise)
-   函数调用(Execution Context)
-   语句/声明(Completion Record)
-   表达式(Reference)
-   直接量/变量/this
