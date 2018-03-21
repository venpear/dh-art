import React from 'react'

export default class View extends React.Component {
  static $$typeName = 'View'
  render() {
    const style = this.props.hasOwnProperty('show') && !this.props.show && {
      display: 'none'
    };
    return React.cloneElement(React.Children.only(this.props.children), {
      style:  Object.assign({}, this.props.children.props.style, style)
    }) 
  }
}
