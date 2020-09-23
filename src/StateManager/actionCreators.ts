import { Block } from '../model';
import { Action, ActionType } from './types';

export const appendBlock = (text: string): Action => {
  return {
    type: ActionType.AppendBlock,
    payload: { text },
  };
};

export const deleteBlock = (block: Block): Action => {
  return {
    type: ActionType.DeleteBlock,
    payload: { block },
  };
};

export const changeInput = (text: string): Action => {
  return {
    type: ActionType.ChangeInput,
    payload: { text },
  };
};
