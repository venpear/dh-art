import React from 'react'
import Input from '../Input'

import { View } from '../utils'
import Transition from './Transition'

export default class Modal extends React.Component {
  static defaultProps = {
    inputErrorMessage: '输入错误'
  }
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      inputValue: props.inputValue
    }
  }
  componentDidMount() {
    // document.addEventListener('click', (e) => {
    //   if (e.target.className === 'dhArt-modal-wrapper') {
    //     this.onAction.bind(this, 'cancel')
    //   }
    // })

    this.setState({ visible: true })
  }
  onChange(e) {
    this.setState({ inputValue: e.target.value })
  }
  inputValidation(value) {
    const { inputPattern, inputValidator, inputErrorMessage } = this.props
    let editorErrorMessage = null
    if (inputPattern && !inputPattern.test(value)) {
      editorErrorMessage = inputErrorMessage
    }

    if (typeof inputValidator === 'function') {
      const validateResult = inputValidator(value);

      if (validateResult === false) {
        editorErrorMessage = inputErrorMessage
      }

      if (typeof validateResult === 'string') {
        editorErrorMessage = validateResult
      }
    }
   
    this.setState({ editorErrorMessage })
    return !editorErrorMessage
  }
  onAction(type) {
    const { promise, modal } = this.props
    switch (type) {
      case 'cancel':
        promise.reject()
        break
      case 'confirm':
        if (modal === 'commit') {
          if (this.inputValidation(this.state.inputValue || '')) {
            promise.resolve(this.state.inputValue)
          } else {
            return
          }     
        } else {
          promise.resolve()
        }
        
        break
      default:
        break;
    }
    this.setState({ visible: false })
  }
  render() {
    const { title, modal, message, willUnmount, inputPlaceholder } = this.props

    const { visible } = this.state
    return (
      <div>
        <div style={{ position: 'absolute', zIndex: 2001 }}>
          <Transition 
            name="modal-fade" 
            onLeave={() => {
              willUnmount && willUnmount()
            }}
          >
            <View show={visible}>
              <div className="dhArt-modal-wrapper">
                <div className="dhArt-modal-box">
                  <div className="dhArt-modal-box-header">
                    <div>{title}</div>
                    <span 
                      className="dhArt-modal-box__close"
                      onClick={this.onAction.bind(this, 'cancel')}
                    >
                      <i />
                    </span>
                  </div>
                  { /*** body 体    ***/ }
                  <div className="dhArt-modal-box-body">
                    {
                      modal === 'confirm' && (
                        <span>{ message }</span>
                      )
                    }
                    {
                      modal === 'commit' && (
                        <div className="dhArt-modal-commit">
                          <Input
                            value={this.state.inputValue}
                            placeholder={inputPlaceholder} 
                            onChange={this.onChange.bind(this)}
                            danger={this.state.editorErrorMessage}
                          />
                          {
                            this.state.editorErrorMessage && 
                            (<div className="dhArt-modal-commit__error">{this.state.editorErrorMessage}</div>)
                          }
                          
                        </div>
                      )
                    }
                  </div>
                  <div className="dhArt-modal-box-footer">
                    <a 
                      className="dhArt-modal-box__btn" 
                      onClick={this.onAction.bind(this, 'confirm')}
                    >
                      确定
                    </a>
                    <a 
                      className="dhArt-modal-box__btn"
                      onClick={this.onAction.bind(this, 'cancel')}
                    >
                      取消
                    </a>
                  </div>
                </div>
              </div>
            </View>
          </Transition>
        </div>
        <Transition name="v-modal">
          <View show={visible}>
            <div className="v-modal" style={{ zIndex: 1006 }}></div>
          </View>
        </Transition>
      </div>
    )
  }
}