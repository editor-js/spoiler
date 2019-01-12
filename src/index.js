import styles from './index.css';

export default class Spoiler {
  constructor({api, settings}) {
    this.api = api;
    this.opened = settings.opened || false;

    this.nodes = {};
  }

  render() {
    this.nodes.button = document.createElement('div');
    this.nodes.button.classList.add(this.api.styles.inlineToolButton);
    this.nodes.button.classList.add(styles.button);
    this.nodes.button.classList.toggle(this.api.styles.inlineToolButtonActive, this.opened);

    this.nodes.icon = document.createElement('div');
    this.nodes.icon.classList.add(styles.icon);
    this.nodes.icon.classList.toggle(styles.iconOpened, this.opened);

    this.nodes.button.appendChild(this.nodes.icon);

    this.api.listeners.on(this.nodes.button, 'click', () => this.handleClick());

    const index = this.api.blocks.getCurrentBlockIndex();
    const block = this.api.blocks.getBlockByIndex(index);

    block.classList.toggle(styles.container, this.opened);
    block.firstChild.classList.toggle(styles.spoiler, this.opened);

    return this.nodes.button;
  }

  handleClick() {
    const index = this.api.blocks.getCurrentBlockIndex();
    const block = this.api.blocks.getBlockByIndex(index);

    this.opened = !this.opened;

    this.nodes.button.classList.toggle(this.api.styles.inlineToolButtonActive, this.opened);
    this.nodes.icon.classList.toggle(styles.iconOpened, this.opened);
    block.classList.toggle(styles.container, this.opened);
    block.firstChild.classList.toggle(styles.spoiler, this.opened);
  }

  save() {
    return {
      opened: this.opened
    };
  }
}
