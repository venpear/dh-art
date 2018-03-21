import React from 'react'
export default class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transition: false
    }
  }
  onBlur(e) {
    const { onBlur } = this.props
    this.setState({ transition: false }, () => {
      onBlur && onBlur(e)
    })
  }
  onFocus(e) {
    const { onFocus } = this.props
    this.setState({ transition: true }, () => {
      onFocus && onFocus(e)
    })
  }
  render() {
    const { 
      prefix, 
      suffix, 
      prepend, 
      append, 
      width,
      danger,
      ...props
    } = this.props

    let transitionStyle = this.state.transition ? { transform: 'scaleX(1)' } : { transform: 'scaleX(0)'}
    transitionStyle = danger ? { backgroundColor: '#FF5A44', transform: 'scaleX(1)' } : transitionStyle
    return (
      <div className="dhArt-input" style={{ width}}>
        {
          prefix && (<div className="dhArt-input-prefix">{ prefix }</div>)
        }
        <div className="dhArt-input-wrapper">
          {
            prepend && (<div className="dhArt-input-wrapper__prepend">{ prepend }</div>)
          }
          <div className="dhArt-input-wrapper__input">
            <input 
              onBlur={ this.onBlur.bind(this) }
              onFocus={ this.onFocus.bind(this) }
              {...props}
            />
          </div>
          { 
            append && (<div className="dhArt-input-wrapper__append">{append} </div>)  
          }
          <div className="dhArt-input__border" />
          <div className="dhArt-input__transition" style={transitionStyle} />
        </div>
        {
          suffix && (
            <div className="dhArt-input-suffix">
              { suffix }
            </div>
          )
        }
        
      </div>
    )
  }
}