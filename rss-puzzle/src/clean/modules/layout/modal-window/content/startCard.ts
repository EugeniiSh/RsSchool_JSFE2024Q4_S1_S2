import { Component } from '../../common/component';
import { CommonButton } from '../../button/common-button';
import { AccompanySound } from '../../../accompanySound/accompanySound';

export interface IStartCardStyleList {
  startCardContainer: string;
  cardText: string;
  audioSetting: string;
  audioWarning: string;
  notificationBlock: string;
  notificationImage: string;
  closeButton: string;
}

export interface IStartCardOption {
  className: string[];
  text: string;
  style: IStartCardStyleList;
  accompanySound: AccompanySound;
}

export class StartCard extends Component {
  protected className: string[];

  protected style: IStartCardStyleList;

  protected accompanySound: AccompanySound;

  protected closeHandler: () => void;

  protected closeButtonListener: () => void;

  constructor({ className, text, style, accompanySound }: IStartCardOption) {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.accompanySound = accompanySound;
    this.closeHandler = () => {};
    this.closeButtonListener = () => this.closeHandler();

    const textContent: [string, string[]][] = [
      ['please keep this card in book pocket', [this.style.cardText]],
      ['bl 23154 631', [this.style.cardText]],
      ['free magic library', [this.style.cardText]],
      ['28.6', [this.style.cardText]],
      ['valerydluski, EugeniiSh', [this.style.cardText]],
      ['c47', [this.style.cardText]],
      ['rolling scopes school puzzle - game', [this.style.cardText]],
      ['educational project. stage 2. mar 5 2024 - ?', [this.style.cardText]],
      [
        "A magical world of the new and unknown awaits you. Immerse yourself in a captivating journey through the world of English. You'll learn new words, phrases, and pronunciation through play. And as a reward, you'll see beautiful works of art. Learn and be inspired.",
        [this.style.cardText],
      ],
      ['28.6', [this.style.cardText]],
    ];

    const textComponents = textContent.map(
      ([textPart, stylePart]) =>
        new Component({
          tag: 'div',
          className: [...stylePart],
          text: textPart,
        }),
    );

    const audioWarning = new Component({
      tag: 'div',
      className: [this.style.audioWarning],
      text: 'Caution! This book may produce strange sounds. To adjust the volume, use the sliders below.',
    });

    const notificationText = new Component({
      tag: 'div',
      className: [],
      text: 'These settings are always accessible in the upper right corner.',
    });

    const notificationImage = new Component({
      tag: 'div',
      className: [this.style.notificationImage],
      text: '',
    });

    const notificationBlock = new Component(
      {
        tag: 'div',
        className: [this.style.notificationBlock],
        text: '',
      },
      notificationText,
      notificationImage,
    );

    const audioSettingBlock = new Component({
      tag: 'div',
      className: [this.style.audioSetting],
      text: '',
    });
    audioSettingBlock.appendChildren([
      audioWarning,
      this.accompanySound.getBackgroundVolumeConteiner(),
      this.accompanySound.getEffectVolumeConteiner(),
      notificationBlock,
    ]);

    const closeButton = new CommonButton({
      className: [style.closeButton],
      text: 'close',
      items: [],
      clickListener: this.closeButtonListener,
    });

    this.appendChildren([...textComponents, audioSettingBlock, closeButton]);
  }

  public setCloseHandler(func: () => void): void {
    this.closeHandler = func;
  }
}
