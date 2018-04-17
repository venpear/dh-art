import React, { Component } from 'react'
import './style.scss'

export default class Slider extends Component {
  static defaultProps = {
    min: 0,
    max: 100
  }
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || 0
    }
    this.onMouseStart = this.onMouseStart.bind(this)
    this.onMouseEnd = this.onMouseEnd.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
  }
  onMouseStart() {
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseEnd)
  }
  onMouseMove(e) {
    const rect = this.slider.getBoundingClientRect()
    const { left, width, height } = this.slider.getBoundingClientRect()
    const { clientX, clientY } = e
    let x = clientX - left
    let per = Math.round((x / width) * 100)
    per = per > 100 ? 100 : per
    per = per < 0 ? 0 : per
    // console.log(per, 'per')
    this.setState({value: per})
  }
  onMouseEnd() {
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseEnd)
    if (this.props.onChange) {
      const { value } = this.state
      const { max, min } = this.props
      let num = Math.round(value * (max - min) / 100)
      num = value >= 100 ? max : num
      num = value <= 0 ? min : num
      this.props.onChange(num)
    }
  }
  render () {
    const { min , max } = this.props
    const { value } = this.state
    return (
      <div className="dhArt-slider" ref={r => this.slider = r}>
       <div className="dhArt-slider-step"></div>
        <div className="dhArt-slider-track"
             style={{width: `${value}%`}}
        ></div>
        <div className="dhArt-slider-handle"
             style={{left: `${value}%`}}
             onMouseDown={this.onMouseStart}
             onMouseUp={this.onMouseEnd}
        >
        </div>
      </div>
    )
  }
}