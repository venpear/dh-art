import React from 'react'
import classNames from 'classnames'

export default class Pane extends React.Component {

  constructor(props) {
    super(props)
  }
  render() {
    const { children, show, className, style } = this.props
    const styleWapper = show ? {...style } : { ...style, display: 'none'}
    return (
      <div 
        style={styleWapper}
        className={
        classNames('dhArt-tabs__pane', {
          [className]: !!className
        })
      }>
        {children}
      </div>
    )
  }
}