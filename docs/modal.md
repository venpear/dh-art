## Modal组件

## confirm 用法
@ example
```js
  onClick() {
    Modal.confirm('是否确认消息的正确性', '提示')
      .then(() => {
        console.log('你点击了确认')
      })
      .catch(() => {
        console.error('你取消了操作')
      })
  }
  render() {
    return (
      <button 
        onClick={this.onClick.bind(this)}
      >
        点击弹出确认框
      </button>
    )
  }
```
@

## 提交表单的用法

@ example
```js
  onClick() {
    Modal.commit('请输入名称', '表单提交', {
      inputErrorMessage: '不能输入为空',
      inputValidator: (value) => {
        return value !== ''
      }
    })
    .then((value) => {
      console.log('表单提交内容', value)
    })
    .catch(() => {
      console.error('你取消了操作')
    })
  }
  render() {
    return (
      <button 
        onClick={this.onClick.bind(this)}
      >
        点击弹出一个输入框
      </button>
    )
  }
```
@
