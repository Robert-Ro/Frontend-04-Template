const regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g
const dictionary = ['Number', 'Whitespace', 'LineTerminator', '+', '-', '*', '/']

function* tokenize(source) {
  let result = null
  let lastIndex = 0
  while (true) {
    lastIndex = regexp.lastIndex
    result = regexp.exec(source)
    if (!result) {
      break
    }
    if (regexp.lastIndex - lastIndex > result[0].length) {
      break
    }
    let token = {
      type: null,
      value: null
    }
    for (let index = 0; index <= dictionary.length; index++) {
      if (result[index]) {
        token.type = dictionary[index - 1]
      }
    }
    token.value = result[0]
    yield token
  }
  yield {
    type: "EOF"
  }
}
let source = []
for (const token of tokenize('1024*25/2')) {
  if(token.type!=='Whitespace'&&token.type!=='LineTerminator'){
    source.push(token)
  }
}
function multiplicativeExpression(source){
  if(source[0].type==='Number'){
    let node = {
      type: "MultiplicativeExpression",
      children: [source[0]]
    }
    source[0] = node
    return multiplicativeExpression(source)
  }
  if (source[0].type === 'MultiplicativeExpression'&&source[1]&&source[1].type==='*'){
    let node = {
      type:'MultiplicativeExpression',
      operator:'*',
      children:[]
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    node.children.push(source.shift())
    source.unshift(node)
    return multiplicativeExpression(source)
  }
  if (source[0].type === 'MultiplicativeExpression'&&source[1]&&source[1].type==='/'){
    let node = {
      type:'MultiplicativeExpression',
      operator:'/',
      children:[]
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    node.children.push(source.shift())
    source.unshift(node)
    return multiplicativeExpression(source)
  }
  if (source[0].type ==='MultiplicativeExpression'){
    return source[0]
  }
  return multiplicativeExpression(source)
}
function expression(source){
  if (source[0].type ==='AdditiveExpression'&&source[1]&&source[1].type==='EOF'){
    let node = {
      type:'Expression',
      children:[source.shift(), source.shift()]
    }
    source.unshift(node)
    return node
  }
  additiveExpression(source)
  return expression(source)
}
function additiveExpression(source){
  if (source[0].type ==='MultiplicativeExpression'){
    let node = {
      type:'AdditiveExpression',
      children: [source[0]]
    }
    source[0] = node
    return additiveExpression(source)
  }
  if(source[0].type==='AdditiveExpression'&&source[1]&&source[1].type==='+'){
    let node = {
      type:'AdditiveExpression',
      operator:'+',
      children:[]
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    multiplicativeExpression(source)
    node.children.push(source.shift())
    source.unshift(node)
    return additiveExpression(source)
  }
  if(source[0].type==='AdditiveExpression'&&source[1]&&source[1].type==='-'){
    let node = {
      type:'AdditiveExpression',
      operator:'-',
      children:[]
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    multiplicativeExpression(source)
    node.children.push(source.shift())
    source.unshift(node)
    return additiveExpression(source)
  }
  if (source[0].type ==='AdditiveExpression'){
    return source[0]
  }
  multiplicativeExpression(source)
  return additiveExpression(source)

}
console.log(multiplicativeExpression(source))