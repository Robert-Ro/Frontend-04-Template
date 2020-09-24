## 语言通识
### 乔姆斯基谱系
- 0 型 无限制文法
- 1 型 上下文相关文法
- 2 型 上下文无关文法
- 3 型 正则文法
### 用途分类
- 数据描述语言
- 编程语言

### 产生式 BNF
- 巴克斯诺尔范式
- 用尖括号括起来的的名称来表示语法结构名
- 基础结构 终结符 Terminal Symbol
- 用其他结构定义的复合结构 非终结符 Nonterminal Symbol
- 用字符串来表示终结符
- 可以用括号
- * 重复多次
- | 或
- + 至少一次
- - js ** 右结合

## JavaScript类型
### Number类型
IEEE 754 Double Float
> 小数点来回浮动
- Sign(1)
- Exponent(11)
- Fraction(52)

### String类型
- UTF-8编码规则
### Object
- 归类
- 分类
- Prototype
- 在设计对象的行为和状态时，我们总是遵循'行为改变状态'的原则
- 唯一性 内存地址
- 数据属性:`Object.defineProperty()`
- 访问器属性:`setter, getter`