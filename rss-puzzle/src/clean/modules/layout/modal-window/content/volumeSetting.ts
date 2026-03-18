import { Component } from '../../common/component';
import { AccompanySound } from '../../../accompanySound/accompanySound';

export interface IVolumeSettingStyleList {
  settingContainer: string;
  header: string;
}

export interface IVolumeSettingOption {
  className: string[];
  text: string;
  style: IVolumeSettingStyleList;
  accompanySound: AccompanySound;
}

export class VolumeSetting extends Component {
  protected className: string[];

  protected style: IVolumeSettingStyleList;

  protected accompanySound: AccompanySound;

  protected backgroundVolume: Component;

  protected effectVolume: Component;

  protected volumeComponents: Component[];

  constructor({
    className,
    text,
    style,
    accompanySound,
  }: IVolumeSettingOption) {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.accompanySound = accompanySound;
    this.backgroundVolume = this.accompanySound.getBackgroundVolumeConteiner();
    this.effectVolume = this.accompanySound.getEffectVolumeConteiner();
    this.volumeComponents = [this.backgroundVolume, this.effectVolume];

    const header = new Component({
      tag: 'div',
      className: [this.style.header],
      text: 'volume setting',
    });
    this.append(header);
  }

  public updateVolumeComponents(): void {
    const currentComponents = this.getChildren();

    this.volumeComponents.forEach((volComponent) => {
      const isComponentInside = currentComponents.includes(volComponent);
      if (!isComponentInside) {
        this.append(volComponent);
        return;
      }

      const volumeSettingNode = this.getNode();
      const volComponentNode = volComponent.getNode();
      const isNodeInside = volumeSettingNode.contains(volComponentNode);
      if (!isNodeInside) {
        volumeSettingNode.append(volComponentNode);
      }
    });
  }
}
