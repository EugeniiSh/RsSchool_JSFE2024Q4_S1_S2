import { TFieldsValue } from '../layout/login-form/form';
import { TNumberOfLevel } from './external';

export interface IStorageRoundProgress
{
  isComplete: boolean,
  completeSentence: number[]
}

export interface IStorageLevelProgress
{
  isComplete: boolean,
  roundProgress: Record<number, IStorageRoundProgress>,
  roundCount: number
}

export type TProgressData = Record<TNumberOfLevel, IStorageLevelProgress>;

export interface IStorageGameProgress
{
  last:
  {
    level: TNumberOfLevel
    round: number,
    sentense: number,
  },

  progress: TProgressData
}

export type TStorageValue = TFieldsValue & { isNew: boolean, game: IStorageGameProgress };

export class PuzzleGameStorage
{
  private key = 'PGLSEvSh';

  private startValue: TStorageValue;

  constructor()
  {
    this.startValue = 
    {
      fname: 'new',
      lname: 'user',
      isNew: true,
      game: PuzzleGameStorage.getStartGameValue(),
    };
  }

  static getStartGameValue(): IStorageGameProgress
  {
    const gameLevelCount: TNumberOfLevel[] = [1, 2, 3, 4, 5, 6];
    const progressData: TProgressData = gameLevelCount.reduce((acc, num) =>
    {
      const roundProgress: IStorageRoundProgress =
      {
        isComplete: false,
        completeSentence: []
      } 

      const levelProgress: IStorageLevelProgress =
      {
        isComplete: false,
        roundProgress: { 0: roundProgress },
        roundCount: 0
      }

      acc[num] = levelProgress;
      return acc;

    }, {} as TProgressData);

    return {
      last:
      {
        level: 1,
        round: 0,
        sentense: 0,
      },

      progress: progressData
    }
  }

  public getValue(): TStorageValue
  {
    const value = localStorage.getItem(this.key);
    if(value)
    {
      return JSON.parse(value) as TStorageValue;
    }

    return this.startValue;
  }

  public setValue(value: TStorageValue): void
  {
    const string = JSON.stringify(value);
    localStorage.setItem(this.key, string);
  }

  public resetValue(): void
  {
    this.setValue(this.startValue);
  }
}