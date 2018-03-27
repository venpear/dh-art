import React from 'react'
import Option from './Option'
import classNames from 'classnames'

export default class Select extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      hidden: false,
      collection: this.getCollection(props.children),
      selectKeys: props.defaultValue || props.value || ''
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
    this.setState({ hidden: true })
  }

  onAction(value) {
    const { selectKeys } = this.state
    const { onChange } = this.props
    this.setState({
      selectKeys: value,
      hidden: false
    }, () => {
      typeof onChange === 'function' && onChange(selectKeys)
    })
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
    const { children, prefix, placeholder="请输入内容" } = this.props
    const { selectKeys, collection, hidden } = this.state

    const style = hidden ? { top: 32 } : { display: 'none'}
    return (
      <div className="dhArt-select">
        {
          prefix && (<div className="dhArt-select-prefix">{ prefix }</div>)
        }
        <div className="dhArt-select-wrapper__input">
          <div 
            className="dhArt-select-wrapper__value"
            onMouseDown={this.onShow.bind(this)}
          >
            <input value={collection[selectKeys]} placeholder={placeholder} />
            {/* {
              selectKeys.length !== 0
              ? this.renderValue(selectKeys, collection)
              : <span>请选择内容</span>
            } */}
          </div>
          <div className="dhArt-select-wrapper__arrow">
            <span 
              className={classNames({
                'is-animate': !!hidden === true
              })}
            >
              <i />
            </span>
          </div>
          <div className="dhArt-select__border" />
            <div style={style} className="dhArt-select-dropdown">
              <ul>
                {
                  React.Children.map(children, (item, idx) => {
                    const { value, ...props } = item.props
                    return {
                      ...item,
                      props: {
                        ...props,
                        value,
                        selected: selectKeys === value,
                        onClick: () => { this.onAction(value) }
                      }
                    }
                  })
                }       
              </ul>
          </div>
        </div>
        {/* <div style={style} className="dhArt-select-dropdown">
          <ul>
            {
              React.Children.map(children, (item, idx) => {
                const { value, ...props } = item.props
                return {
                  ...item,
                  props: {
                    ...props,
                    value,
                    selected: selectKeys === value,
                    onClick: () => { this.onAction(value) }
                  }
                }
              })
            }       
          </ul>
        </div> */}
      </div>
    )
  }
}
Select.Option = Option