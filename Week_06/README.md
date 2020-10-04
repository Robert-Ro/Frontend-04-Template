# 浏览器工作原理

## 有限状态机(Finite State Machines)

-   每一个状态都是一个机器
    -   在每一个机器里，我们可以做计算、存储、输出...
    -   所有的这些机器接受的输入是一致的
    -   状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是纯函数(无副作用)
-   每一个机器知道下一个状态
    -   每一个机器都有确定的下一个状态(Moore)
    -   每个机器根据输入决定下一个状态(Mealy)

### JS 中的有限状态机(Mealy)

每个函数都是一个状态

```js
function state(input) {
    // 函数参数就是输入
    // 在函数中，可以自由地编写代码，处理每个状态的逻辑
    return next // 返回值就是下一个状态
}
// 调用
while (input) {
    // 获取输入
    state = state(input) //把状态机的返回值作为下一个状态
}
```

### 参考

-   [Moore and Mealy Machines](https://www.tutorialspoint.com/automata_theory/moore_and_mealy_machines.htm)
-   [Moore_machine](https://en.wikipedia.org/wiki/Moore_machine)
-   [Mealy_machine](https://en.wikipedia.org/wiki/Mealy_machine)

## 浏览器基础

### ISO 七层网络模式

-   应用层
-   表示层
-   会话层
-   传输层
-   网络层
-   数据链路层
-   物理层

### TCP/IP 基础

-   流 stream
-   端口 port
-   包 packet
-   IP 地址
-   libnet/libpcap

### Http

-   Request
-   Response
    -   Response 分段构造，使用 ResponseParser 来"装配"
    -   ResponseParser 分段处理 ResponseText，使用状态机来解析文本的结构
    -   Response 的 body 可能根据 Content-Type 有不同的结构，因此会采用子 parser 的结构来解决问题
    -   以 TrunkedBodyParser 为例，同样用状态机来处理 body 的格式
