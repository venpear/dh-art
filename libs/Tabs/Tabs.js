var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import classNames from 'classnames';

import Pane from './pane';

var Tabs = function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    var children = React.Children.toArray(props.children);
    _this.state = {
      children: children,
      current: props.value || props.defaultValue || children[0].props.name
    };
    return _this;
  }

  Tabs.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

    if (nextProps.value !== this.props.value) {
      this.setState({
        currentName: nextProps.value
      });
    }

    if (nextProps.children !== this.props.children) {
      this.setState({
        children: React.Children.toArray(nextProps.children)
      });
    }
  };

  Tabs.prototype.onTabsClick = function onTabsClick(tabs, e) {
    var _this2 = this;

    this.setState({
      current: tabs.props.name
    }, function () {
      var onTabClick = _this2.props.onTabClick;

      onTabClick && onTabClick(tabs.props.name, e);
    });
  };

  Tabs.prototype.render = function render() {
    var _classNames,
        _classNames2,
        _this3 = this,
        _classNames4;

    var _state = this.state,
        children = _state.children,
        current = _state.current;
    var _props = this.props,
        theme = _props.theme,
        style = _props.style,
        headStyle = _props.headStyle,
        bodyStyle = _props.bodyStyle,
        className = _props.className,
        labelClass = _props.labelClass,
        headClass = _props.headClass,
        bodyClass = _props.bodyClass;

    return React.createElement(
      'div',
      {
        style: style,
        className: classNames('dhArt-tabs', (_classNames = {
          'dhArt-tabs-theme': theme === 'dark'
        }, _classNames[className] = !!className, _classNames))
      },
      React.createElement(
        'div',
        {
          style: headStyle,
          className: classNames('dhArt-tabs__header', (_classNames2 = {}, _classNames2[headClass] = !!headClass, _classNames2))
        },
        React.Children.map(children, function (item, idx) {
          var _classNames3;

          var _item$props = item.props,
              name = _item$props.name,
              label = _item$props.label,
              disabled = _item$props.disabled;

          return React.createElement(
            'div',
            {
              name: name,
              key: 'dhart-tabs__item-' + idx,
              className: classNames('dhArt-tabs__item', (_classNames3 = {}, _classNames3[labelClass] = !!labelClass, _classNames3['is-active'] = current === name, _classNames3)),
              onClick: function onClick(e) {
                _this3.onTabsClick(item, e);
              }
            },
            label
          );
        })
      ),
      React.createElement(
        'div',
        {
          style: bodyStyle,
          className: classNames('dhArt-tabs__body', (_classNames4 = {}, _classNames4[bodyClass] = !!bodyClass, _classNames4))
        },
        React.Children.map(children, function (item) {
          var name = item.props.name;

          var props = _extends({}, item.props, {
            show: name === current
          });
          return _extends({}, item, { props: props });
        })
      )
    );
  };

  return Tabs;
}(React.Component);

export default Tabs;

Tabs.Pane = Pane;