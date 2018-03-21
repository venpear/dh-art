var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      transition: false
    };
    return _this;
  }

  Input.prototype.onBlur = function onBlur(e) {
    var onBlur = this.props.onBlur;

    this.setState({ transition: false }, function () {
      onBlur && onBlur(e);
    });
  };

  Input.prototype.onFocus = function onFocus(e) {
    var onFocus = this.props.onFocus;

    this.setState({ transition: true }, function () {
      onFocus && onFocus(e);
    });
  };

  Input.prototype.render = function render() {
    var _props = this.props,
        prefix = _props.prefix,
        suffix = _props.suffix,
        prepend = _props.prepend,
        append = _props.append,
        width = _props.width,
        danger = _props.danger,
        props = _objectWithoutProperties(_props, ['prefix', 'suffix', 'prepend', 'append', 'width', 'danger']);

    var transitionStyle = this.state.transition ? { transform: 'scaleX(1)' } : { transform: 'scaleX(0)' };
    transitionStyle = danger ? { backgroundColor: '#FF5A44', transform: 'scaleX(1)' } : transitionStyle;
    return React.createElement(
      'div',
      { className: 'dhArt-input', style: { width: width } },
      prefix && React.createElement(
        'div',
        { className: 'dhArt-input-prefix' },
        prefix
      ),
      React.createElement(
        'div',
        { className: 'dhArt-input-wrapper' },
        prepend && React.createElement(
          'div',
          { className: 'dhArt-input-wrapper__prepend' },
          prepend
        ),
        React.createElement(
          'div',
          { className: 'dhArt-input-wrapper__input' },
          React.createElement('input', _extends({
            onBlur: this.onBlur.bind(this),
            onFocus: this.onFocus.bind(this)
          }, props))
        ),
        append && React.createElement(
          'div',
          { className: 'dhArt-input-wrapper__append' },
          append,
          ' '
        ),
        React.createElement('div', { className: 'dhArt-input__border' }),
        React.createElement('div', { className: 'dhArt-input__transition', style: transitionStyle })
      ),
      suffix && React.createElement(
        'div',
        { className: 'dhArt-input-suffix' },
        suffix
      )
    );
  };

  return Input;
}(React.Component);

export default Input;