import { Block } from './model';
import { Action, ActionType, State } from './StateManager';
export declare const createBlock: (text?: string, isValid?: boolean) => Block;
export declare const createAppendOrChangeInputAction: (actionType: ActionType.AppendBlock | ActionType.ChangeInput, text?: string) => Action;
export declare const createDeleteBlockAction: (block: Block) => Action;
export declare const createState: (currentText?: string, blocks?: Block[]) => State;
