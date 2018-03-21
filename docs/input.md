## Input 输入框

通过鼠标或键盘输入字符

### 基础用法

::: demo
```js
onChange(v) {
  console.log(v)
}
render() {
  return <Input placeholder="请输入内容" onChange={this.onChange.bind(this)} />
}
```
:::



### Input 属性说明

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type         | 类型   | string  | text/textarea | text |
| value         | 绑定值           | string, number  | — | — |
| maxLength     | 最大输入长度      | number          |  —  | — |
| minLength     | 最小输入长度      | number          | — | — |
| placeholder   | 输入框占位文本    | string          | — | — |
| disabled      | 禁用            | boolean         | — | false   |
| size          | 输入框尺寸，只在 `type!="textarea"` 时有效      | string          | large, small, mini  | — |
| icon          | 输入框尾部图标    | string          | — | — |
| rows          | 输入框行数，只对 `type="textarea"` 有效  |  number | — |  2   |
| autosize      | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }  |  boolean/object | — |  false   |
| autoComplete | 原生属性，自动补全 | string | on, off | off |
| name | 原生属性 | string | — | — |
| readOnly | 原生属性，是否只读 | boolean | — | false |
| max | 原生属性，设置最大值 | — | — | — |
| min | 原生属性，设置最小值 | — | — | — |
| step | 原生属性，设置输入字段的合法数字间隔 | — | — | — |
| resize | 控制是否能被用户缩放 | string | none, both, horizontal, vertical | — |
| autoFocus | 原生属性，自动获取焦点 | boolean | true, false | false |
| onIconClick | 点击 Input 内的图标的钩子函数 | function | — | — |

### Autocomplete Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| placeholder   | 输入框占位文本   | string          | — | — |
| disabled      | 禁用            | boolean         | — | false   |
| value         | 必填值输入绑定值   | string  | — | — |
| customItem  | 通过该参数指定自定义的输入建议列表项的组件名 | Element  | — | — |
| fetchSuggestions | 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它  | Function(queryString, callback)  | — | — |
| popperClass | Autocomplete 下拉列表的类名 | string | — | — |
| triggerOnFocus | 是否在输入框 focus 时显示建议列表 | boolean | — | true |
| onIconClick | 点击图标的回调函数 | function | — | — |
| icon          | 输入框尾部图标    | string          | — | — |

### Autocomplete Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| onSelect | 点击选中建议项时触发 | 选中建议项 |
