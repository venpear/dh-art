## Select 下拉选择

通过鼠标或键盘输入字符

### 基础用法

@ example
```js
onChange(v) {
  console.log(v)
}
// 测试
render() {
  return  (
    <Select 
      value="dark" 
      onChange={this.onChange.bind(this)}
      prefix="更新"
    >
      <Select.Option value="default">默认</Select.Option>
      <Select.Option value="dark">黑色</Select.Option>
    </Select>
  )
}
```
@
