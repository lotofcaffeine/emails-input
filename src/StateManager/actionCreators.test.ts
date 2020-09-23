import { Action, ActionType, appendBlock, changeInput, deleteBlock } from '.';
import { createBlock } from '../testUtils';
describe('appendBlock', () => {
  it('should return a appendBlock action', () => {
    const text = 'blah@miro.com';
    const expectedAction: Action = {
      type: ActionType.AppendBlock,
      payload: { text },
    };
    expect(appendBlock(text)).toEqual(expectedAction);
  });
});
describe('deleteBlock', () => {
  it('should return a deleteBlock action', () => {
    const block = createBlock();
    const expectedAction: Action = {
      type: ActionType.DeleteBlock,
      payload: { block },
    };
    expect(deleteBlock(block)).toEqual(expectedAction);
  });
});
describe('changeInput', () => {
  it('should return a changeInput action', () => {
    const text = 'blah@miro.com';
    const expectedAction: Action = {
      type: ActionType.ChangeInput,
      payload: { text },
    };
    expect(changeInput(text)).toEqual(expectedAction);
  });
});
