import { Block } from '../model/Block';
export declare enum ActionType {
    DeleteBlock = 0,
    AppendBlock = 1,
    ChangeInput = 2
}
export interface Action {
    type: ActionType;
    payload?: any;
}
export declare type Listener = (state: State) => void;
export declare type Reducer = (state: State, action: Action) => State;
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
