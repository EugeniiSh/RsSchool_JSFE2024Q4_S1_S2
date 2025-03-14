import * as style from './field-hints-style.module.scss';
import { Component } from '../../../../modules/layout/common/component';
import { HintField } from '../../../../modules/layout/hint/hintField';
import { HintsBlock, IHintsBlock } from '../../../../modules/layout/hint/hintsBlock';
import { TInputTextFieldsCheckers } from '../../../../modules/layout/login-form/input/input-text';





const firstNamefieldCheckers: TInputTextFieldsCheckers = new Map();
firstNamefieldCheckers.set
(
  'size', 
  {
    func: (value: string) => value.length >= 3,
    text: 'minimum 3 characters',
  }
);
firstNamefieldCheckers.set
(
  'upperCase',
  { 
    func: (value: string) => value[0] ? value[0] === value[0].toUpperCase() : false,
    text: 'first letter uppercase',
  } 
);
firstNamefieldCheckers.set
(
  'latinLeter', 
  {
    func: (value: string) =>
    { 
      if(value.length === 0) return false;

      for(let i = 0; i < value.length; i += 1)
      {
        const char = value[i];
        const charPoint = char.codePointAt(0);

        if(!charPoint) return false;

        if(charPoint !== 45)
        {
          if(charPoint < 65 || charPoint > 122) return false;
          if(charPoint > 90 && charPoint < 97) return false;
        }
      }

      return true; 
    },
    text: 'only Latin letters and hyphen (-)',
  }
);





const hintFieldsMap: Map<string, HintField> = new Map();

function setStateHintFieldComponent(this: HintField, state: boolean)
{
  this.getChildren().forEach((childNode) =>
  {
    const invertState = !state;
    childNode.toggleClass(style.error, invertState)
  })
}

firstNamefieldCheckers.forEach((value, checkFor) =>
{
  const firstHint = new Component({ tag: 'div', className: [style.tick], text: '' });
  const secondHint = new Component({ tag: 'div', className: [style.string], text: value.text });
  const hintField = new HintField
  (
    {
      className: [style.field],
      text: '',
      hintName: checkFor,
      hintComponents: [firstHint, secondHint],
      setState: setStateHintFieldComponent
    }
  )

  hintFieldsMap.set(checkFor, hintField);
});
 
function setStateHintField(this: HintsBlock, state: boolean, checkFor: string): void
{
  const currentHintField = this.hintFields.get(checkFor);

  if(currentHintField)
  {
    currentHintField.setState(state);
  }
  else
  {
    console.log(`Hint field <${checkFor}> not found!`);
  }
}

const hintBlockOptions: IHintsBlock =
{
  className: [style.block],
  text: '',
  hintFields: hintFieldsMap,
  setState: setStateHintField
}

const firstNameHintsBlock = new HintsBlock(hintBlockOptions);
export
{
  firstNamefieldCheckers,
  firstNameHintsBlock,
  setStateHintFieldComponent,
  setStateHintField
}