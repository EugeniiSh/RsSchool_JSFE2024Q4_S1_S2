import { TFieldsValue } from '../layout/login-form/form';
import { TNumberOfLevel } from './external';

export interface IStorageGameProgress {
  last: {
    level: TNumberOfLevel;
  };
}

export type TStorageValue = TFieldsValue & {
  isNew: boolean;
  game: IStorageGameProgress;
};

export class PuzzleGameStorage {
  private key = 'PGLSEvSh';

  private startValue: TStorageValue;

  constructor() {
    this.startValue = {
      fname: 'new',
      lname: 'user',
      isNew: true,
      game: PuzzleGameStorage.getStartGameValue(),
    };
  }

  static getStartGameValue(): IStorageGameProgress {
    return {
      last: {
        level: 1,
      },
    };
  }

  public getValue(): TStorageValue {
    const value = localStorage.getItem(this.key);
    if (value) {
      return JSON.parse(value) as TStorageValue;
    }

    return this.startValue;
  }

  public setValue(value: TStorageValue): void {
    const string = JSON.stringify(value);
    localStorage.setItem(this.key, string);
  }

  public resetValue(): void {
    this.setValue(this.startValue);
  }
}
