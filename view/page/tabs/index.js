import Markdown from '../../libs/markdown';

// import './style.scss';

export default class Tabs extends Markdown {
  document(locale) {
    return require('../../../docs/tabs.md');
  }
}