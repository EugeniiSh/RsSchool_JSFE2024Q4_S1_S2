import { Component } from '../common/component';
import { ModalWindow } from '../modal-window/modal-window';
import { VolumeSetting } from '../modal-window/content/volumeSetting';
import { CommonButton } from '../button/common-button';

export interface ISettingButtonStyleList {
  settingButton: string;
  settingContainer: string;
  closeButton: string;
}

export interface ISettingButtonOption {
  className: string[];
  text: string;
  style: ISettingButtonStyleList;
  modalWindow: ModalWindow;
  volumeSetting: VolumeSetting;
}

export class SettingButton extends Component {
  protected className: string[];

  protected style: ISettingButtonStyleList;

  protected modalWindow: ModalWindow;

  protected volumeSetting: VolumeSetting;

  protected closeButton: CommonButton;

  protected settingContainer: Component;

  constructor({
    className,
    text,
    style,
    modalWindow,
    volumeSetting,
  }: ISettingButtonOption) {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.modalWindow = modalWindow;
    this.volumeSetting = volumeSetting;
    this.closeButton = new CommonButton({
      className: [this.style.closeButton],
      text: 'close',
      items: [],
      clickListener: () => this.closeButtonClickHandler(),
    });

    this.settingContainer = new Component({
      tag: 'div',
      className: [this.style.settingContainer],
      text: '',
    });
    this.settingContainer.appendChildren([
      this.volumeSetting,
      this.closeButton,
    ]);

    this.addListener('click', () => this.settingButtonClickHandler());
  }

  protected settingButtonClickHandler(): void {
    this.volumeSetting.updateVolumeComponents();
    this.modalWindow.showModal(this.settingContainer);
  }

  protected closeButtonClickHandler(): void {
    this.modalWindow.hideModal();
  }
}
