## tab组件

## 基本用法

@ example
```js
onTabClick (key) {
  console.log('当前选中的是', key)
}
render() {
  return (
    <Tabs 
      theme="dark"
      defaultValue="5"
      onTabClick={this.onTabClick.bind(this)}
    >
      <Tabs.Pane label="测试数据1" name="1">测试数据1</Tabs.Pane>
      <Tabs.Pane label="测试数据2" name="2">测试数据2</Tabs.Pane>
      <Tabs.Pane label="测试数据3" name="3">测试数据3</Tabs.Pane>
      <Tabs.Pane label="测试数据4" name="4">测试数据4</Tabs.Pane>
      <Tabs.Pane label="测试数据5" name="5">测试数据5</Tabs.Pane>
    </Tabs>
  )
}

```
@