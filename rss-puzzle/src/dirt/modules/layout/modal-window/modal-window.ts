import { Component } from '../common/component';

export interface IModalWindowOption
{
  className: string[];
  text: string;
  showModal: (content: Component) => void;
  hideModal: () => void;
}

export class ModalWindow extends Component
{
  public showModal: (content: Component) => void;

  public hideModal: () => void;

  constructor
  (
    {
      className,
      text,
      showModal,
      hideModal
    }: IModalWindowOption
  )
  {
    super({ tag: 'div', className, text });
    this.showModal = showModal;
    this.hideModal = hideModal;
  }
}