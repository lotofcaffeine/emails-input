import { ActionType, reducer } from '.';
import {
  createAppendOrChangeInputAction,
  createBlock,
  createDeleteBlockAction,
  createState,
} from '../testUtils';

describe('Reducer', () => {
  it('should have a new email after a AppendBlock action', () => {
    const email = 'test@miro.com';
    const state = createState();
    const action = createAppendOrChangeInputAction(
      ActionType.AppendBlock,
      email
    );
    const newState = reducer(state, action);
    expect(newState.blocks).toHaveLength(1);
    expect(newState.blocks[0].text).toEqual(email);
    expect(newState.blocks[0].isValid).toBeTruthy();
  });
  it('should have a new block after a AppendBlock action with invalid text', () => {
    const email = 'test';
    const state = createState();
    const action = createAppendOrChangeInputAction(
      ActionType.AppendBlock,
      email
    );
    const newState = reducer(state, action);
    expect(newState.blocks).toHaveLength(1);
    expect(newState.blocks[0].text).toEqual(email);
    expect(newState.blocks[0].isValid).toBeFalsy();
  });
  it('should have blocks after a AppendBlock action with comma-separated string', () => {
    const emaila = 'a@miro.com';
    const emailb = 'b@miro.com';
    const emailc = 'c@miro.com';
    const csv = [emaila, emailb, emailc].join(',');
    const state = createState();
    const action = createAppendOrChangeInputAction(ActionType.AppendBlock, csv);
    const newState = reducer(state, action);
    expect(newState.blocks).toHaveLength(3);
    expect(newState.blocks[0].text).toEqual(emaila);
    expect(newState.blocks[0].isValid).toBeTruthy();
    expect(newState.blocks[1].text).toEqual(emailb);
    expect(newState.blocks[1].isValid).toBeTruthy();
    expect(newState.blocks[2].text).toEqual(emailc);
    expect(newState.blocks[2].isValid).toBeTruthy();
  });
  it('should delete a block after a DeleteBlock action', () => {
    const emaila = 'a@miro.com';
    const emailb = 'b@miro.com';
    const emailc = 'c@miro.com';
    const blocks = [emaila, emailb, emailc].map(s => createBlock(s));
    const state = createState('', blocks);
    const action = createDeleteBlockAction(blocks[1].id);
    const newState = reducer(state, action);
    expect(newState.blocks).toHaveLength(2);
    expect(newState.blocks[0].text).toEqual(emaila);
    expect(newState.blocks[0].isValid).toBeTruthy();
    expect(newState.blocks[1].text).toEqual(emailc);
    expect(newState.blocks[1].isValid).toBeTruthy();
  });
});
