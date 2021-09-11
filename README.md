# 如何写一个 babel

    https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md

# babel

    Babel是一个 JavaScript 编译器，准确说是一个source-to-source编译器，通常称为“ transpiler”。这意味着您向 Babel 提供一些 JavaScript 代码，Babel 修改代码，并返回生成新代码。

    babel在编译时候，会把源代码分为两部分来处理：语法syntax、api。

    语法syntax比如const、let、模版字符串、扩展运算符等。 api比如Array.includes()等新函数。

## @babel/core

    babel编译器。被拆分三个模块：@babel/parser @babel/traverse @babel/generator
    @babel/parser: 接受源码，进行词法分析、语法分析，生成AST。
    @babel/traverse：接受一个AST，并对其遍历，根据preset、plugin进行逻辑处理，进行替换、删除、添加节点。
    @babel/generator：接受最终生成的AST，并将其转换为代码字符串，同时此过程也可以创建source map。

    babel转码流程：input string -> @babel/parser parser -> AST -> transformer[s] -> AST -> @babel/generator -> output string。

## visitor

    babel-plugins在生成ast树时注入，可对代码进行操作， babel为我们提供一个visitor方法，可以自定义babel

    AST语法树 https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-asts

```sh
module.exports = function () {
    return {
        visitor: {
            // 这个地方使用AST树的类型进行检测
            // 该链接包含所有AST树的类型
            // https://github.com/benjamn/ast-types/blob/master/gen/namedTypes.ts
            // 检查变量注册的代码
            // https://babeljs.io/docs/en/babel-types#declaration
            Declaration(path, state) {
                console.log(path.node.kind)
                path.node.kind = 'var';
            }
        }
    }
}
```
