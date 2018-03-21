import React from 'react'
import classNames from 'classnames'
const ANIMATION_DURATION = 300

export default class Item extends React.Component {
  selfRef = null
  leaveTimer = null
  enterTimer = null

  constructor(props) {
    super(props)
    this.state = {
      isShow: false
    }
    this.onClick = this.onClick.bind(this)
  }
  componentDidMount() {
    this.beforeEnter();
    if (this.props.isShow) {
      this.enter();
    }
  }
  componentWillReceiveProps(nextProps){
    if (this.props.isShow !== nextProps.isShow) {
      this.triggerChange(nextProps.isShow)
    }
  }
  componentWillUnmount() {
    this.beforeLeave();
    this.leave();
  }
  triggerChange(isShow) {
    clearTimeout(this.enterTimer)
    clearTimeout(this.leaveTimer)
    if (isShow) {
      this.beforeEnter()
      this.enter()
    } else {
      this.beforeLeave()
      this.leave()
    }
  }
  beforeEnter () {
    const el = this.selfRef
    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom
    el.dataset.oldOverflow = el.style.overflow
    el.style.height = '0'
    el.style.paddingTop = 0
    el.style.paddingBottom = 0
  }

  enter() {
    const el = this.selfRef
    el.style.display = 'block'
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px'
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    } else {
      el.style.height = '';
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }

    el.style.overflow = 'hidden';

    this.enterTimer = setTimeout(() => this.afterEnter(), ANIMATION_DURATION);
  }
  afterEnter() {
    const el = this.selfRef
    el.style.display = 'block'
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
  }
  beforeLeave() {
    const el = this.selfRef
    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom
    el.dataset.oldOverflow = el.style.overflow

    el.style.display = 'block'
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px'
    }
    el.style.overflow = 'hidden'
  }

  leave() {
    const el = this.selfRef
    if (el.scrollHeight !== 0) {
      el.style.height = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    }
    this.leaveTimer = setTimeout(() => this.afterLeave(), ANIMATION_DURATION)
  }
  afterLeave() {
    const el = this.selfRef
    if (!el) return 

    el.style.display = 'none'
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
  }
  onClick(e) {
    const { name, onClick } = this.props
    onClick && onClick(name, e)
  }
  render() {
    const { isShow, name, title, children } = this.props
    return (
      <div className="dhArt-collapse-item" name={name}>
        <div className="dhArt-collapse__header" onClick={this.onClick}>
          <div className="dhArt-collapse__header-label">
            { title }
          </div>
          <div className={classNames('dhArt-collapse__header-spin')}>
            <span className={classNames({
              'is-rotate': !!isShow
            })}><i /></span>
          </div>
        </div>
        <div 
          // style={style}
          className="dhArt-collapse__animation" 
          ref={c => this.selfRef = c}
        >
         <div className="dhArt-collapse__body">
            { children }
         </div>
        </div>
      </div>
    )
  }
}