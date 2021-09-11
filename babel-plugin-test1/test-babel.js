const babel = require('@babel/core');
const types = require('@babel/types');
const fs = require('fs');

const result = babel.transformFileSync('conversion.js', {
    plugins: [
        {
            visitor: {
                // 变量声明
                // https://github.com/benjamn/ast-types/blob/master/gen/namedTypes.ts
                Declaration(path, state) {
                    // console.log(path.node.kind);
                    path.node.kind = 'var';
                },
                ImportDeclaration(path, state) {
                    // console.log(path.node);
                    if (path.node.source.value !== 'lodash') return;
                    let node = path.node;
                    let { specifiers } = node; // 导入的包的说明符 是个数组集合
                    // 如果使用全量引入 则不管
                    if (specifiers[0].type !== 'ImportDefaultSpecifier') {
                        const newImports = specifiers.map((item) => {
                            // console.log(item);
                            // 创建一个import AST树
                            // https://babeljs.io/docs/en/babel-types#importdeclaration
                            // types.importDeclaration(specifiers, source);
                            // specifiers: Array
                            // source: StringLiteral (required)
                            // StringLiteral: AST Node StringLiteral shape:
                            return types.importDeclaration([types.ImportDefaultSpecifier(item.local)], types.stringLiteral(`lodash/${item.imported.name}`))
                        });
                        // 将原有语句写法替换掉
                        path.replaceWithMultiple(newImports);
                    }
                }
            }
        }
    ]
});
fs.writeFileSync('./build.js', result.code);
