import { Block } from '../model';
import { Action } from './types';
export declare const appendBlock: (text: string) => Action;
export declare const deleteBlock: (block: Block) => Action;
export declare const changeInput: (text: string) => Action;
