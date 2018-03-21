import React from 'react'
import './style.scss'
import Item from './Item'

export default class Collapse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeNames: []
    }
  }
  setActiveNames(activeNames) {
    activeNames = [].concat(activeNames);
    this.setState({ 
      activeNames 
    }, () => {
      let { onChange } = this.props
      onChange && onChange(activeNames)
    });
  }
  onItemClick(name) {
    const { activeNames } = this.state
    if (this.props.accordion) {
      this.setActiveNames(
        activeNames[0] && activeNames[0] === name ? '' : name
      );
    } else {
      if (activeNames.includes(name)) {
        this.setActiveNames(activeNames.filter(item => item !== name))
      } else {
        this.setActiveNames([...activeNames, name])
      }
    }
  }
  render() {
    let { children } = this.props 
    return (
      <div className="dhArt-collapse dhArt-collapse-theme">
        {
          React.Children.map(children, (child, idx) => {
            let name = child.props.name || idx.toString()
            return React.cloneElement(child, {
              key: idx,
              name: name,
              isShow: this.state.activeNames.includes(name),
              onClick: item => this.onItemClick(item)
            })
          })
        }
      </div>
    )
  }
}
Collapse.Item = Item