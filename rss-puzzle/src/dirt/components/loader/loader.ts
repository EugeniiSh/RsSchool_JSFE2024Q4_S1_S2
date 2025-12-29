import * as style from './loader-style.module.scss';
import { Loader, ILoaderOption, ILoaderStyleList } from '../../modules/loader/loader';

const loaderStyleList: ILoaderStyleList =
{
  loader: style.loader,
  wrapper: style.wrapper,
  part: style.part,
  part1: style.part1,
  part2: style.part2,
  part3: style.part3,
  part4: style.part4,
  part5: style.part5,
  part6: style.part6,
  part7: style.part7,
}

const loaderOption: ILoaderOption =
{
  className: [style.loader],
  text: '',
  style: loaderStyleList,
}

export default new Loader(loaderOption);