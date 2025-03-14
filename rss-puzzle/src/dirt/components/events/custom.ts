import { TCustomEventList } from "../../modules/events/custom";


const customEventList: TCustomEventList = 
{
  login: new CustomEvent('login', { bubbles: true }),
};

export default customEventList;