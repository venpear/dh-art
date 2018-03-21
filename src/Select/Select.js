import React from 'react'
import Option from './Option'
import classNames from 'classnames'

export default class Select extends React.Component {
  constructor(props) {
    super(props) 
    
    this.state = {
      style: null,
      collection: this.getCollection(props.children),
      selectKeys: [props.defaultValue] || props.value || []
    }
  }
  getCollection(children) {
    let collection = {}
    React.Children.forEach(children, (item) => {
      let { props } = item
      collection[props.value] = React.isValidElement(props.children) 
        ? props.value 
        : props.children
    })
    return collection
  }
  onShow(e) {
    let { offsetHeight } = e.currentTarget.offsetParent
    let style = { top: offsetHeight + 10, display: 'block' }
    this.setState({ style })
  }
  onHidden() {
    this.setState({ style: null })
  }
  setSelectKeys(selectKeys) {
    selectKeys = [].concat(selectKeys)
    this.setState({
      selectKeys
    }, () => {
      this.onHidden()
    })
  }
  onAction(value) {
    const { selectKeys } = this.state
    if (this.props.multiple) {

    } else {
      selectKeys.includes(value) 
      ?  this.setSelectKeys(selectKeys.filter(item => item !== value))
      : this.setSelectKeys([value])
    
    }
    // this.setState({
    //   selectKeys: [...this.state.selectKeys, value]
    // })
  }
  renderValue(selectKeys, collection) {
    return selectKeys.map((item, key) => {
      return (
        <span key={`select/$.${key}`}>
          { 
            collection.hasOwnProperty(item) ? collection[item] : item
          }
        </span>
      )
    })
  }
  render() {
    const { children } = this.props
    const { selectKeys, collection, style } = this.state
    return (
      <div className="dhArt-select" style={{ width: 400 }}>
        <div className="dhArt-select-wrapper__input">
          <div 
            className="dhArt-select-wrapper__value"
            onMouseDown={this.onShow.bind(this)}
          >
            {
              selectKeys.length !== 0
              ? this.renderValue(selectKeys, collection)
              : <span>请选择内容</span>
            }
            {/* <span>123</span> */}
          </div>
          <div className="dhArt-select-wrapper__arrow">
            <span 
              className={classNames({
                'is-animate': !!style === true
              })}
            >
              <i />
            </span>
          </div>
          <div className="dhArt-select__border" />
        </div>
        <div
          style={this.state.style} 
          className="dhArt-select-dropdown" 
        >
          <ul>
            {
              React.Children.map(children, (item, idx) => {
                const { value, ...props } = item.props
                return {
                  ...item,
                  props: {
                    ...props,
                    value,
                    selected: this.state.selectKeys.includes(value),
                    onClick: () => { this.onAction(value) }
                  }
                }
              })
            }       
          </ul>
        </div>
      </div>
    )
  }
}
Select.Option = Option