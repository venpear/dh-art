import React from 'react'
import ReactDOM from 'react-dom'
// import requestAnimationFrame from 'raf'

export default class Transition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      children: props.children && this.extendChildren(props.children)
    }

    this.actLeave = this.actLeave.bind(this)
    this.actEnter = this.actEnter.bind(this)
  }
  get transitionClass() {
    const { name } = this.props;

    return {
      enter: `${name}-enter`,
      enterActive: `${name}-enter-active`,
      enterTo: `${name}-enter-to`,
      leave: `${name}-leave`,
      leaveActive: `${name}-leave-active`,
      leaveTo: `${name}-leave-to`,
    }
  }
  componentWillReceiveProps(nextProps) {
    const children = React.isValidElement(this.props.children) && React.Children.only(this.props.children)
    const nextChildren = React.isValidElement(nextProps.children) && React.Children.only(nextProps.children)
    
    /**
     * 接受的新属性直接是一个元素
     */
    if (!nextProps.name) {
      this.setState({ children: nextChildren })
      return
    }
    if (this.isViewChildren(nextChildren)) {
    
      this.setState({
        children: this.extendChildren(nextChildren, { 
          show: nextChildren ? nextChildren.props.show : true 
        })
      })
    } else {
      if (nextChildren) {
        this.setState({
          children: this.enhanceChildren(nextChildren)
        })
      }
      // nextChildren && 
    }
  }
  componentDidUpdate(preProps) {
    if (!this.props.name) return
    
    const children = React.isValidElement(this.props.children) && React.Children.only(this.props.children)
    const preChildren = React.isValidElement(preProps.children) && React.Children.only(preProps.children)

    if (this.isViewChildren(children)) {
      if ((!preChildren || !preChildren.props.show) && children.props.show) {
        this.handleVisible()
      } else if (preChildren && preChildren.props.show && !children.props.show) {
        this.handleHidden()
      }
      
    } else {
      if (!preChildren && children) {
        this.handleVisible()
      } else if (preChildren && !children) {
        this.handleHidden()
      }
    }
  }

  isViewChildren(element) {
    return element && element.type.$$typeName === 'View';
  }
  extendChildren(children, props = {}) {
    return React.cloneElement(children, Object.assign({ ref: (el) => { this.el = el } }, props))  
  }

  actEnter(e) {
    const DOM = ReactDOM.findDOMNode(this.el);

    if (!e || e.target !== DOM) return

    const { onAfterEnter } = this.props;
    const { enterActive, enterTo } = this.transitionClass;

    DOM.classList.remove(enterActive, enterTo);

    DOM.removeEventListener('transitionend', this.actEnter);
    DOM.removeEventListener('animationend', this.actEnter);

    onAfterEnter && onAfterEnter();
  }

  actLeave(e) {
    const DOM = ReactDOM.findDOMNode(this.el);
    if (!e || e.target !== DOM) return

    const { onAfterLeave, children } = this.props;
    const { leaveActive, leaveTo } = this.transitionClass;

    new Promise((resolve) => {
      if (this.isViewComponent(children)) {
        DOM.removeEventListener('transitionend', this.actLeave);
        DOM.removeEventListener('animationend', this.actLeave);

        requestAnimationFrame(() => {
          DOM.style.display = 'none';
          DOM.classList.remove(leaveActive, leaveTo);

          requestAnimationFrame(resolve);
        })
      } else {
        this.setState({ children: null }, resolve);
      }
    })
    .then(() => {
      console.log('kkkkkkk')
      onAfterLeave && onAfterLeave()
    })
  }
  handleVisible() {
    const { onEnter } = this.props;
    const { enter, enterActive, enterTo, leaveActive, leaveTo } = this.transitionClass;
    const DOM = ReactDOM.findDOMNode(this.el);

    DOM.addEventListener('transitionend', this.actEnter);
    DOM.addEventListener('animationend', this.actEnter);
    requestAnimationFrame(() => {
      // when hidden transition not end
      if (DOM.classList.contains(leaveActive)) {
        DOM.classList.remove(leaveActive, leaveTo);

        DOM.removeEventListener('transitionend', this.actLeave);
        DOM.removeEventListener('animationend', this.actLeave);
      }

      DOM.style.display = '';
      DOM.classList.add(enter, enterActive);

      onEnter && onEnter();

      requestAnimationFrame(() => {
        DOM.classList.remove(enter);
        DOM.classList.add(enterTo);
      })
    })
  }
  handleHidden() {
   
    const { onLeave } = this.props;
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
    setTimeout(() => {
      onLeave && onLeave()
    }, 1000)
  }
  render() {

    return this.state.children || null
  }
}