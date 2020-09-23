import { Store, State, Listener, ActionType, StoreProps } from './types';

export const createStore = ({ reducer, initialState }: StoreProps): Store => {
  let state = initialState;
  const subscribers: Map<ActionType, Listener[]> = new Map();
  return {
    dispatch: action => {
      const newState = reducer(state, action);
      if (subscribers.has(action.type)) {
        subscribers.get(action.type)?.forEach(s => s(newState));
      }
    },
    subscribe: (actionType, listener) => {
      if (subscribers.has(actionType)) {
        subscribers.get(actionType)?.push(listener);
      } else {
        subscribers.set(actionType, [listener]);
      }
    },
    getState: (): State => {
      return state;
    },
  };
};
