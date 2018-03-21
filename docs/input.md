## Input 输入框

通过鼠标或键盘输入字符

### 基础用法

@ example
```js
onChange(v) {
  console.log(v)
}
// 测试
render() {
  return <Input placeholder="请输入内容" onChange={this.onChange.bind(this)} />
}
```
@
