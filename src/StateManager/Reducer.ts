import { Reducer, ActionType } from './types';
import { Block } from '../model';
import { validate } from '../utils';

export const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case ActionType.DeleteBlock: {
      state.blocks = state.blocks.filter(e => e.id !== action.payload.tagId);
      state.lastBlockIdRemoved = action.payload.tagId;
      return state;
    }
    case ActionType.AppendBlock: {
      const text = action.payload.text;
      if (text.indexOf(',') >= 0) {
        const texts = text.split(',') as string[];
        const blocks = texts
          .map(t => t.trim())
          .filter(t => t.length > 0)
          .map(t => new Block(t, validate(t)));
        state.blocks = state.blocks.concat(blocks);
      } else {
        const block = new Block(text, validate(text));
        state.blocks.push(block);
      }
      return state;
    }
    case ActionType.ChangeInput: {
      state.currentText = action.payload.text;
      return state;
    }
    default:
      return state;
  }
};
