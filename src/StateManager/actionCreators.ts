import { Action, ActionType } from './types';

export const appendBlock = (text: string): Action => {
  return {
    type: ActionType.AppendBlock,
    payload: { text },
  };
};

export const deleteBlock = (tagId: string): Action => {
  return {
    type: ActionType.DeleteBlock,
    payload: { tagId },
  };
};

export const changeInput = (text: string): Action => {
  return {
    type: ActionType.ChangeInput,
    payload: { text },
  };
};
