import { Action, ActionType, appendBlock, changeInput, deleteBlock } from '.';
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
    const tagId = 'tagId';
    const expectedAction: Action = {
      type: ActionType.DeleteBlock,
      payload: { tagId },
    };
    expect(deleteBlock(tagId)).toEqual(expectedAction);
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
