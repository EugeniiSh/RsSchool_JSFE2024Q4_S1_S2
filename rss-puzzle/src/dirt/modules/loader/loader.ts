import { Component } from '../layout/common/component';

export interface ILoaderStyleList
{
  loader: string;
  wrapper: string;
  part: string;
  part1: string;
  part2: string;
  part3: string;
  part4: string;
  part5: string;
  part6: string;
  part7: string;
}

export interface ILoaderOption
{
  className: string[];
  text: string;
  style: ILoaderStyleList;
}

export class Loader extends Component
{
  protected className: string[];

  protected style: ILoaderStyleList;

  protected wrapper: Component;

  protected timeOutID: NodeJS.Timeout | null;

  protected isTimeOutAble: boolean;

  protected isFirstRunUpdate: boolean;

  constructor
  (
    {
      className,
      text,
      style,
    }: ILoaderOption
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.timeOutID = null;
    this.isTimeOutAble = true;
    this.isFirstRunUpdate = true;

    this.wrapper = new Component({ tag: 'div', className: [this.style.wrapper], text: '' });
   
    const part1 = new Component({ tag: 'div', className: [this.style.part, this.style.part1], text: '' });
    const part2 = new Component({ tag: 'div', className: [this.style.part, this.style.part2], text: '' });
    const part3 = new Component({ tag: 'div', className: [this.style.part, this.style.part3], text: '' });
    const part4 = new Component({ tag: 'div', className: [this.style.part, this.style.part4], text: '' });
    const part5 = new Component({ tag: 'div', className: [this.style.part, this.style.part5], text: '' });
    const part6 = new Component({ tag: 'div', className: [this.style.part, this.style.part6], text: '' });
    const part7 = new Component({ tag: 'div', className: [this.style.part, this.style.part7], text: '' });

    this.wrapper.appendChildren([part1, part2, part3, part4, part5, part6, part7]);
    this.append(this.wrapper);
  }

  public start(): void
  {
    this.runUpdateBorderSize();
    this.wrapper.getNode().style.animationPlayState = 'running';
  }

  public stop(): void
  {
    this.stopUpdateBorderSize();
    this.wrapper.getNode().style.animationPlayState = 'paused';
  }

  protected runUpdateBorderSize(): void
  {
    if(this.isFirstRunUpdate)
    {
      this.setBorderSize();
      this.isFirstRunUpdate = false;
    }

    if(this.isTimeOutAble)
    {
      this.timeOutID = setTimeout(() => 
      {
        this.setBorderSize();
        this.runUpdateBorderSize();
      }, 1000);
    }
  }

  protected stopUpdateBorderSize(): void
  {
    this.isTimeOutAble = false;
    if(this.timeOutID)
    {
      clearTimeout(this.timeOutID);
      this.timeOutID = null;
    } 
  }

  protected setBorderSize = () =>
  {
    const wrapperNode = this.wrapper.getNode();
    const wrapperSize = wrapperNode.clientHeight;
    wrapperNode.style.setProperty('--size-border', `${wrapperSize}px`);
  }

  public destroy(): void
  {
    this.stop();

    if(this.parentComponent)
    {
      const loaderNeighbours = this.parentComponent.getChildren();
      const loaderIndex = loaderNeighbours.indexOf(this);

      if(loaderIndex !== -1)
      {
        this.parentComponent.destroyOneChild(loaderIndex);
        return;
      }
    }
    else
    {
      super.destroy();
      return;
    }

    super.destroy();
  }

  public getLoader(): Loader
  {
    return new Loader
    (
      {
        className: this.className,
        text: '',
        style: this.style,
      }
    )
  }
}