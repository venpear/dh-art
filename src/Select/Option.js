import React from 'react'
import classNames from 'classnames'

export default class Option extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onClick, value, children, selected } = this.props
    return (
      <li 
        onClick={
          () => {
          onClick && onClick()
        }}
        className={classNames('dhArt-select-dropdown__item', {
          'is-selected': selected
        })} 
        name={value}
      >
        { this.props.children }
      </li>
    )
  }
}