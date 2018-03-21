function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Item from './Item';

var Collapse = function (_React$Component) {
  _inherits(Collapse, _React$Component);

  function Collapse(props) {
    _classCallCheck(this, Collapse);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      activeNames: []
    };
    return _this;
  }

  Collapse.prototype.setActiveNames = function setActiveNames(activeNames) {
    var _this2 = this;

    activeNames = [].concat(activeNames);
    this.setState({
      activeNames: activeNames
    }, function () {
      var onChange = _this2.props.onChange;

      onChange && onChange(activeNames);
    });
  };

  Collapse.prototype.onItemClick = function onItemClick(name) {
    var activeNames = this.state.activeNames;

    if (this.props.accordion) {
      this.setActiveNames(activeNames[0] && activeNames[0] === name ? '' : name);
    } else {
      if (activeNames.includes(name)) {
        this.setActiveNames(activeNames.filter(function (item) {
          return item !== name;
        }));
      } else {
        this.setActiveNames([].concat(activeNames, [name]));
      }
    }
  };

  Collapse.prototype.render = function render() {
    var _this3 = this;

    var children = this.props.children;

    return React.createElement(
      'div',
      { className: 'dhArt-collapse dhArt-collapse-theme' },
      React.Children.map(children, function (child, idx) {
        var name = child.props.name || idx.toString();
        return React.cloneElement(child, {
          key: idx,
          name: name,
          isShow: _this3.state.activeNames.includes(name),
          onClick: function onClick(item) {
            return _this3.onItemClick(item);
          }
        });
      })
    );
  };

  return Collapse;
}(React.Component);

export default Collapse;

Collapse.Item = Item;