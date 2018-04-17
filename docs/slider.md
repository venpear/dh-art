## Slider 组件

## 基本用法
@ example
```js
onChange(value) {
  console.log(value, 'value')
}
render() {
  return (
    <Slider value={19} min={10} max={200} onChange={this.onChange} />
  )
}

```
@