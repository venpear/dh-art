import React from 'react'
import classNames from 'classnames'

import Pane from './pane'

export default class Tabs extends React.Component {

  constructor(props) {
    super(props)
    let children = React.Children.toArray(props.children)
    this.state = {
      children,
      current: props.value || props.defaultValue || children[0].props.name
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.value !== this.props.value) {
      this.setState({
        currentName: nextProps.value,
      });
    }

    if (nextProps.children !== this.props.children) {
      this.setState({
        children: React.Children.toArray(nextProps.children),
      });
    } 
  }

  onTabsClick (tabs, e) {
    this.setState({
      current: tabs.props.name
    }, () => {
      const { onTabClick } = this.props
      onTabClick && onTabClick(tabs.props.name, e)
    })
  }

  render() {
    const { children, current} = this.state
    const {
      theme,
      style,
      headStyle,
      bodyStyle,
      className,
      labelClass,
      headClass,
      bodyClass 
    } = this.props
    return (
      <div
        style={style}
        className={ 
          classNames('dhArt-tabs', {
            'dhArt-tabs-theme': theme === 'dark',
            [className]: !!className
          }) 
        }
      >
        <div 
          style={headStyle}
          className={classNames('dhArt-tabs__header', {
            [headClass]: !!headClass
          })}
        >
          {
            React.Children.map(children, (item, idx) => {
              const { name, label, disabled } = item.props
              return (
                <div 
                  name={name}
                  key={`dhart-tabs__item-${idx}`}
                  className={
                    classNames('dhArt-tabs__item', {
                      [labelClass]: !!labelClass,
                      'is-active': current === name,
                    })
                  }
                  onClick={(e) => { this.onTabsClick(item, e)}}
                >
                  { label }
                </div>
              )
            })
          }
        </div>
        <div 
          style={bodyStyle}
          className={
            classNames('dhArt-tabs__body', {
              [bodyClass]: !!bodyClass
            })
          }
        >
          {
            React.Children.map(children, item => {
              const { name } = item.props;
              const props = {
                ...item.props,
                show: name === current
              }
              return { ...item, props }
            })
          }
        </div>
      </div>
    )
  }
}
Tabs.Pane = Pane