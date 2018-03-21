var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

var box = function box() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return asyncDIV(props);
};
var confirm = function confirm(message, title) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return asyncDIV({
    modal: 'confirm',
    title: title,
    message: message,
    options: options
  });
};
var commit = function commit(inputPlaceholder, title) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var value = options.value,
      validation = _objectWithoutProperties(options, ['value']);

  return asyncDIV(_extends({
    modal: 'commit',
    title: title,
    inputPlaceholder: inputPlaceholder
  }, options));
};
export var asyncDIV = function asyncDIV(props) {
  return new Promise(function (resolve, reject) {
    var div = document.createElement('div');
    document.body.appendChild(div);
    document.body.style.setProperty('overflow', 'hidden');

    var component = React.createElement(Modal, Object.assign({}, props, {
      promise: { resolve: resolve, reject: reject },
      willUnmount: function willUnmount() {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
        document.body.style.removeProperty('overflow');
      }
    }));

    ReactDOM.render(component, div);
  });
};

export default {
  box: box,
  commit: commit,
  confirm: confirm
};