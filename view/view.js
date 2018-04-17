import React from 'react';

import components from './page'
// console.log(Components)
// import { Input } from '../src'
export default class View extends React.Component {
  constructor(props) {
    super(props)
    const routes = location.hash.match(/(?:\/(.+))?\/(.+)/)
    this.state = {
      current: routes[2]
    }
  }
  componentDidMount() {
    window.addEventListener('hashchange', (e) => {
      const location = e.target.location
      const routes = location.hash.match(/(?:\/(.+))?\/(.+)/);
      this.setState({
        current: routes[2]
      })
    })
  }
  renderComponent(page) {
    const result = components[page];
    return React.createElement(result.default, {})
  }
  render() {
  
    return (
      <div className="app">
        <header>Datahunter 黑色主题 React UI 库</header>
        <div className="app-container">
          <div className="app-nav">
            <ul>
              <li><a href="#/tabs">Tab切换</a></li>
              <li><a href="#/input">input输入框</a></li>
              <li><a href="#/select">select输入框</a></li>
              <li><a href="#/modal">Modal模态框</a></li>
              <li><a href="#/slider">Slider 滑动输入</a></li>
            </ul>
          </div>
          <div className="app-page">
            {/* <Input /> */}
            { this.renderComponent(this.state.current)}
          </div>
        </div>
      </div>
    )
  }
}
