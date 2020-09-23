import { Block } from '../model/Block';

export enum ActionType {
  DeleteBlock,
  AppendBlock,
  ChangeInput,
}

export interface Action {
  type: ActionType;
  payload?: any;
}

export type Listener = (state: State) => void;

export type Reducer = (state: State, action: Action) => State;

export interface StoreProps {
  reducer: Reducer;
  initialState: State;
}

export interface Store {
  dispatch: (action: Action) => void;
  subscribe: (actionType: ActionType, listener: Listener) => void;
  getState: () => State;
}

export interface State {
  blocks: Block[];
  currentText: string;
  lastBlockIdRemoved?: string;
}
