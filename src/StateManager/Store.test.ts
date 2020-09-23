import { ActionType, createStore, Reducer, State } from '.';
import {
  createAppendOrChangeInputAction,
  createBlock,
  createState,
} from '../testUtils';

let reducer: Reducer;

beforeAll(() => {
  reducer = (state, _) => {
    state.currentText = 'affected';
    return state;
  };
});

describe('Store', () => {
  it('initializes the state with the input param provided', () => {
    const block = createBlock();
    const expectedState = createState('some text', [block]);
    const store = createStore({ reducer, initialState: expectedState });
    expect(store.getState()).toEqual(expectedState);
  });
  it('changes the state when action is dispatched', () => {
    const expectedState: State = {
      currentText: 'some text',
      blocks: [],
    };
    const store = createStore({ reducer, initialState: expectedState });
    const action = createAppendOrChangeInputAction(
      ActionType.AppendBlock,
      'test@miro.com'
    );
    store.dispatch(action);
    const state = store.getState();
    expect(state.currentText).toEqual('affected');
  });
});
