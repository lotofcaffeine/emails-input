import { Block } from './model';
import { Action, ActionType, State } from './StateManager';

export const createBlock = (
  text: string = 'blah@miro.com',
  isValid: boolean = true
) => new Block(text, isValid);

export const createAppendOrChangeInputAction = (
  actionType: ActionType.AppendBlock | ActionType.ChangeInput,
  text: string = 'blah'
): Action => {
  return {
    type: actionType,
    payload: { text },
  };
};

export const createDeleteBlockAction = (tagId: string): Action => {
  return {
    type: ActionType.DeleteBlock,
    payload: { tagId },
  };
};

export const createState = (
  currentText: string = 'some text',
  blocks: Block[] = []
): State => {
  return {
    currentText,
    blocks,
  };
};
