function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import classNames from 'classnames';
var ANIMATION_DURATION = 300;

var Item = function (_React$Component) {
  _inherits(Item, _React$Component);

  function Item(props) {
    _classCallCheck(this, Item);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.selfRef = null;
    _this.leaveTimer = null;
    _this.enterTimer = null;

    _this.state = {
      isShow: false
    };
    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  Item.prototype.componentDidMount = function componentDidMount() {
    this.beforeEnter();
    if (this.props.isShow) {
      this.enter();
    }
  };

  Item.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.isShow !== nextProps.isShow) {
      this.triggerChange(nextProps.isShow);
    }
  };

  Item.prototype.componentWillUnmount = function componentWillUnmount() {
    this.beforeLeave();
    this.leave();
  };

  Item.prototype.triggerChange = function triggerChange(isShow) {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
    if (isShow) {
      this.beforeEnter();
      this.enter();
    } else {
      this.beforeLeave();
      this.leave();
    }
  };

  Item.prototype.beforeEnter = function beforeEnter() {
    var el = this.selfRef;
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;
    el.style.height = '0';
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  };

  Item.prototype.enter = function enter() {
    var _this2 = this;

    var el = this.selfRef;
    el.style.display = 'block';
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    } else {
      el.style.height = '';
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }

    el.style.overflow = 'hidden';

    this.enterTimer = setTimeout(function () {
      return _this2.afterEnter();
    }, ANIMATION_DURATION);
  };

  Item.prototype.afterEnter = function afterEnter() {
    var el = this.selfRef;
    el.style.display = 'block';
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
  };

  Item.prototype.beforeLeave = function beforeLeave() {
    var el = this.selfRef;
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;

    el.style.display = 'block';
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
    }
    el.style.overflow = 'hidden';
  };

  Item.prototype.leave = function leave() {
    var _this3 = this;

    var el = this.selfRef;
    if (el.scrollHeight !== 0) {
      el.style.height = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
    this.leaveTimer = setTimeout(function () {
      return _this3.afterLeave();
    }, ANIMATION_DURATION);
  };

  Item.prototype.afterLeave = function afterLeave() {
    var el = this.selfRef;
    if (!el) return;

    el.style.display = 'none';
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
  };

  Item.prototype.onClick = function onClick(e) {
    var _props = this.props,
        name = _props.name,
        onClick = _props.onClick;

    onClick && onClick(name, e);
  };

  Item.prototype.render = function render() {
    var _this4 = this;

    var _props2 = this.props,
        isShow = _props2.isShow,
        name = _props2.name,
        title = _props2.title,
        children = _props2.children;

    return React.createElement(
      'div',
      { className: 'dhArt-collapse-item', name: name },
      React.createElement(
        'div',
        { className: 'dhArt-collapse__header', onClick: this.onClick },
        React.createElement(
          'div',
          { className: 'dhArt-collapse__header-label' },
          title
        ),
        React.createElement(
          'div',
          { className: classNames('dhArt-collapse__header-spin') },
          React.createElement(
            'span',
            { className: classNames({
                'is-rotate': !!isShow
              }) },
            React.createElement('i', null)
          )
        )
      ),
      React.createElement(
        'div',
        {
          // style={style}
          className: 'dhArt-collapse__animation',
          ref: function ref(c) {
            return _this4.selfRef = c;
          }
        },
        React.createElement(
          'div',
          { className: 'dhArt-collapse__body' },
          children
        )
      )
    );
  };

  return Item;
}(React.Component);

export default Item;