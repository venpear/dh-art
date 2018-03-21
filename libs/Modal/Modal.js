function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Input from '../Input';

import { View } from '../utils';
import Transition from './Transition';

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      visible: false,
      inputValue: props.inputValue
    };
    return _this;
  }

  Modal.prototype.componentDidMount = function componentDidMount() {
    // document.addEventListener('click', (e) => {
    //   if (e.target.className === 'dhArt-modal-wrapper') {
    //     this.onAction.bind(this, 'cancel')
    //   }
    // })

    this.setState({ visible: true });
  };

  Modal.prototype.onChange = function onChange(e) {
    this.setState({ inputValue: e.target.value });
  };

  Modal.prototype.inputValidation = function inputValidation(value) {
    var _props = this.props,
        inputPattern = _props.inputPattern,
        inputValidator = _props.inputValidator,
        inputErrorMessage = _props.inputErrorMessage;

    var editorErrorMessage = null;
    if (inputPattern && !inputPattern.test(value)) {
      editorErrorMessage = inputErrorMessage;
    }

    if (typeof inputValidator === 'function') {
      var validateResult = inputValidator(value);

      if (validateResult === false) {
        editorErrorMessage = inputErrorMessage;
      }

      if (typeof validateResult === 'string') {
        editorErrorMessage = validateResult;
      }
    }

    this.setState({ editorErrorMessage: editorErrorMessage });
    return !editorErrorMessage;
  };

  Modal.prototype.onAction = function onAction(type) {
    var _props2 = this.props,
        promise = _props2.promise,
        modal = _props2.modal;

    switch (type) {
      case 'cancel':
        promise.reject();
        break;
      case 'confirm':
        if (modal === 'commit') {
          if (this.inputValidation(this.state.inputValue || '')) {
            promise.resolve(this.state.inputValue);
          } else {
            return;
          }
        } else {
          promise.resolve();
        }

        break;
      default:
        break;
    }
    this.setState({ visible: false });
  };

  Modal.prototype.render = function render() {
    var _props3 = this.props,
        title = _props3.title,
        modal = _props3.modal,
        message = _props3.message,
        willUnmount = _props3.willUnmount,
        inputPlaceholder = _props3.inputPlaceholder;
    var visible = this.state.visible;

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { style: { position: 'absolute', zIndex: 2001 } },
        React.createElement(
          Transition,
          {
            name: 'modal-fade',
            onLeave: function onLeave() {
              willUnmount && willUnmount();
            }
          },
          React.createElement(
            View,
            { show: visible },
            React.createElement(
              'div',
              { className: 'dhArt-modal-wrapper' },
              React.createElement(
                'div',
                { className: 'dhArt-modal-box' },
                React.createElement(
                  'div',
                  { className: 'dhArt-modal-box-header' },
                  React.createElement(
                    'div',
                    null,
                    title
                  ),
                  React.createElement(
                    'span',
                    {
                      className: 'dhArt-modal-box__close',
                      onClick: this.onAction.bind(this, 'cancel')
                    },
                    React.createElement('i', null)
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'dhArt-modal-box-body' },
                  modal === 'confirm' && React.createElement(
                    'span',
                    null,
                    message
                  ),
                  modal === 'commit' && React.createElement(
                    'div',
                    { className: 'dhArt-modal-commit' },
                    React.createElement(Input, {
                      value: this.state.inputValue,
                      placeholder: inputPlaceholder,
                      onChange: this.onChange.bind(this),
                      danger: this.state.editorErrorMessage
                    }),
                    this.state.editorErrorMessage && React.createElement(
                      'div',
                      { className: 'dhArt-modal-commit__error' },
                      this.state.editorErrorMessage
                    )
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'dhArt-modal-box-footer' },
                  React.createElement(
                    'a',
                    {
                      className: 'dhArt-modal-box__btn',
                      onClick: this.onAction.bind(this, 'confirm')
                    },
                    '\u786E\u5B9A'
                  ),
                  React.createElement(
                    'a',
                    {
                      className: 'dhArt-modal-box__btn',
                      onClick: this.onAction.bind(this, 'cancel')
                    },
                    '\u53D6\u6D88'
                  )
                )
              )
            )
          )
        )
      ),
      React.createElement(
        Transition,
        { name: 'v-modal' },
        React.createElement(
          View,
          { show: visible },
          React.createElement('div', { className: 'v-modal', style: { zIndex: 1006 } })
        )
      )
    );
  };

  return Modal;
}(React.Component);

Modal.defaultProps = {
  inputErrorMessage: '输入错误'
};
export default Modal;