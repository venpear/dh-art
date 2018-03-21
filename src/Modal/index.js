import React from 'react'

import ReactDOM from 'react-dom';

import Modal from './Modal'
import './style.scss'

const box = (props = {}) => {
  return asyncDIV(props)
}
const confirm = (message, title, options = {}) => {
  return asyncDIV({
    modal: 'confirm',
    title,
    message,
    options
  })
}
const commit = (inputPlaceholder, title, options = {}) => {
  const { value, ...validation } = options
  return asyncDIV({
    modal: 'commit',
    title,
    inputPlaceholder,
    ...options
  })
}
export const asyncDIV = (props) => {
  return new Promise((resolve, reject) => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    document.body.style.setProperty('overflow', 'hidden')

    const component = React.createElement(Modal, Object.assign({}, props, {
      promise: { resolve, reject },
      willUnmount: () => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
        document.body.style.removeProperty('overflow');
      }
    }))

    ReactDOM.render(component, div)
  })
}

export default {
  box,
  commit,
  confirm
}