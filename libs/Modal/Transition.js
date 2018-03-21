var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
// import requestAnimationFrame from 'raf'

var Transition = function (_React$Component) {
  _inherits(Transition, _React$Component);

  function Transition(props) {
    _classCallCheck(this, Transition);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      children: props.children && _this.extendChildren(props.children)
    };

    _this.actLeave = _this.actLeave.bind(_this);
    _this.actEnter = _this.actEnter.bind(_this);
    return _this;
  }

  Transition.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var children = React.isValidElement(this.props.children) && React.Children.only(this.props.children);
    var nextChildren = React.isValidElement(nextProps.children) && React.Children.only(nextProps.children);

    /**
     * 接受的新属性直接是一个元素
     */
    if (!nextProps.name) {
      this.setState({ children: nextChildren });
      return;
    }
    if (this.isViewChildren(nextChildren)) {

      this.setState({
        children: this.extendChildren(nextChildren, {
          show: nextChildren ? nextChildren.props.show : true
        })
      });
    } else {
      if (nextChildren) {
        this.setState({
          children: this.enhanceChildren(nextChildren)
        });
      }
      // nextChildren && 
    }
  };

  Transition.prototype.componentDidUpdate = function componentDidUpdate(preProps) {
    if (!this.props.name) return;

    var children = React.isValidElement(this.props.children) && React.Children.only(this.props.children);
    var preChildren = React.isValidElement(preProps.children) && React.Children.only(preProps.children);

    if (this.isViewChildren(children)) {
      if ((!preChildren || !preChildren.props.show) && children.props.show) {
        this.handleVisible();
      } else if (preChildren && preChildren.props.show && !children.props.show) {
        this.handleHidden();
      }
    } else {
      if (!preChildren && children) {
        this.handleVisible();
      } else if (preChildren && !children) {
        this.handleHidden();
      }
    }
  };

  Transition.prototype.isViewChildren = function isViewChildren(element) {
    return element && element.type.$$typeName === 'View';
  };

  Transition.prototype.extendChildren = function extendChildren(children) {
    var _this2 = this;

    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return React.cloneElement(children, Object.assign({ ref: function ref(el) {
        _this2.el = el;
      } }, props));
  };

  Transition.prototype.actEnter = function actEnter(e) {
    var DOM = ReactDOM.findDOMNode(this.el);

    if (!e || e.target !== DOM) return;

    var onAfterEnter = this.props.onAfterEnter;
    var _transitionClass = this.transitionClass,
        enterActive = _transitionClass.enterActive,
        enterTo = _transitionClass.enterTo;


    DOM.classList.remove(enterActive, enterTo);

    DOM.removeEventListener('transitionend', this.actEnter);
    DOM.removeEventListener('animationend', this.actEnter);

    onAfterEnter && onAfterEnter();
  };

  Transition.prototype.actLeave = function actLeave(e) {
    var _this3 = this;

    var DOM = ReactDOM.findDOMNode(this.el);
    if (!e || e.target !== DOM) return;

    var _props = this.props,
        onAfterLeave = _props.onAfterLeave,
        children = _props.children;
    var _transitionClass2 = this.transitionClass,
        leaveActive = _transitionClass2.leaveActive,
        leaveTo = _transitionClass2.leaveTo;


    new Promise(function (resolve) {
      if (_this3.isViewComponent(children)) {
        DOM.removeEventListener('transitionend', _this3.actLeave);
        DOM.removeEventListener('animationend', _this3.actLeave);

        requestAnimationFrame(function () {
          DOM.style.display = 'none';
          DOM.classList.remove(leaveActive, leaveTo);

          requestAnimationFrame(resolve);
        });
      } else {
        _this3.setState({ children: null }, resolve);
      }
    }).then(function () {
      console.log('kkkkkkk');
      onAfterLeave && onAfterLeave();
    });
  };

  Transition.prototype.handleVisible = function handleVisible() {
    var _this4 = this;

    var onEnter = this.props.onEnter;
    var _transitionClass3 = this.transitionClass,
        enter = _transitionClass3.enter,
        enterActive = _transitionClass3.enterActive,
        enterTo = _transitionClass3.enterTo,
        leaveActive = _transitionClass3.leaveActive,
        leaveTo = _transitionClass3.leaveTo;

    var DOM = ReactDOM.findDOMNode(this.el);

    DOM.addEventListener('transitionend', this.actEnter);
    DOM.addEventListener('animationend', this.actEnter);
    requestAnimationFrame(function () {
      // when hidden transition not end
      if (DOM.classList.contains(leaveActive)) {
        DOM.classList.remove(leaveActive, leaveTo);

        DOM.removeEventListener('transitionend', _this4.actLeave);
        DOM.removeEventListener('animationend', _this4.actLeave);
      }

      DOM.style.display = '';
      DOM.classList.add(enter, enterActive);

      onEnter && onEnter();

      requestAnimationFrame(function () {
        DOM.classList.remove(enter);
        DOM.classList.add(enterTo);
      });
    });
  };

  Transition.prototype.handleHidden = function handleHidden() {
    var onLeave = this.props.onLeave;
    // let DOM = ReactDOM.findDOMNode(this.el)
    // const { leave, leaveActive, leaveTo, enterActive, enterTo } = this.transitionClass
    // DOM.addEventListener('transitionend', this.actLeave)
    // DOM.addEventListener('animationend', this.actLeave);
    // requestAnimationFrame(() => {

    //   if (DOM.classList.contains(enterActive)) {
    //     DOM.classList.remove(enterActive, enterTo)

    //     DOM.removeEventListener('transitionend', this.actEnter)
    //     DOM.removeEventListener('animationend', this.actEnter)
    //   }

    //   DOM.classList.add(leave, leaveActive)


    //   requestAnimationFrame(() => {
    //     DOM.classList.remove(leave);
    //     DOM.classList.add(leaveTo);
    //   })
    // })

    setTimeout(function () {
      onLeave && onLeave();
    }, 1000);
  };

  Transition.prototype.render = function render() {

    return this.state.children || null;
  };

  _createClass(Transition, [{
    key: 'transitionClass',
    get: function get() {
      var name = this.props.name;


      return {
        enter: name + '-enter',
        enterActive: name + '-enter-active',
        enterTo: name + '-enter-to',
        leave: name + '-leave',
        leaveActive: name + '-leave-active',
        leaveTo: name + '-leave-to'
      };
    }
  }]);

  return Transition;
}(React.Component);

export default Transition;