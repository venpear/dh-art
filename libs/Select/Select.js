var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Option from './Option';
import classNames from 'classnames';

var Select = function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      style: null,
      collection: _this.getCollection(props.children),
      selectKeys: [props.defaultValue] || props.value || []
    };
    return _this;
  }

  Select.prototype.getCollection = function getCollection(children) {
    var collection = {};
    React.Children.forEach(children, function (item) {
      var props = item.props;

      collection[props.value] = React.isValidElement(props.children) ? props.value : props.children;
    });
    return collection;
  };

  Select.prototype.onShow = function onShow(e) {
    var offsetHeight = e.currentTarget.offsetParent.offsetHeight;

    var style = { top: offsetHeight + 10, display: 'block' };
    this.setState({ style: style });
  };

  Select.prototype.onHidden = function onHidden() {
    this.setState({ style: null });
  };

  Select.prototype.setSelectKeys = function setSelectKeys(selectKeys) {
    var _this2 = this;

    selectKeys = [].concat(selectKeys);
    this.setState({
      selectKeys: selectKeys
    }, function () {
      _this2.onHidden();
    });
  };

  Select.prototype.onAction = function onAction(value) {
    var selectKeys = this.state.selectKeys;

    if (this.props.multiple) {} else {
      selectKeys.includes(value) ? this.setSelectKeys(selectKeys.filter(function (item) {
        return item !== value;
      })) : this.setSelectKeys([value]);
    }
    // this.setState({
    //   selectKeys: [...this.state.selectKeys, value]
    // })
  };

  Select.prototype.renderValue = function renderValue(selectKeys, collection) {
    return selectKeys.map(function (item, key) {
      return React.createElement(
        'span',
        { key: 'select/$.' + key },
        collection.hasOwnProperty(item) ? collection[item] : item
      );
    });
  };

  Select.prototype.render = function render() {
    var _this3 = this;

    var children = this.props.children;
    var _state = this.state,
        selectKeys = _state.selectKeys,
        collection = _state.collection,
        style = _state.style;

    return React.createElement(
      'div',
      { className: 'dhArt-select', style: { width: 400 } },
      React.createElement(
        'div',
        { className: 'dhArt-select-wrapper__input' },
        React.createElement(
          'div',
          {
            className: 'dhArt-select-wrapper__value',
            onMouseDown: this.onShow.bind(this)
          },
          selectKeys.length !== 0 ? this.renderValue(selectKeys, collection) : React.createElement(
            'span',
            null,
            '\u8BF7\u9009\u62E9\u5185\u5BB9'
          )
        ),
        React.createElement(
          'div',
          { className: 'dhArt-select-wrapper__arrow' },
          React.createElement(
            'span',
            {
              className: classNames({
                'is-animate': !!style === true
              })
            },
            React.createElement('i', null)
          )
        ),
        React.createElement('div', { className: 'dhArt-select__border' })
      ),
      React.createElement(
        'div',
        {
          style: this.state.style,
          className: 'dhArt-select-dropdown'
        },
        React.createElement(
          'ul',
          null,
          React.Children.map(children, function (item, idx) {
            var _item$props = item.props,
                value = _item$props.value,
                props = _objectWithoutProperties(_item$props, ['value']);

            return _extends({}, item, {
              props: _extends({}, props, {
                value: value,
                selected: _this3.state.selectKeys.includes(value),
                onClick: function onClick() {
                  _this3.onAction(value);
                }
              })
            });
          })
        )
      )
    );
  };

  return Select;
}(React.Component);

export default Select;

Select.Option = Option;