import Markdown from '../../libs/markdown';

// import './style.scss';

export default class Input extends Markdown {
  document(locale) {
    return require('../../../docs/input.md');
  }
}