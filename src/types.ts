import { Block } from './model';
import { Store } from './StateManager';
export interface DeleteButtonProps {
  tagId: string;
  onClick: (event: MouseEvent) => any;
}

export interface DeleteButton extends HTMLButtonElement {}

export interface EmailBlockProps {
  block: Block;
  onDelete?: (block: Block) => void;
}

export interface EmailBlock extends HTMLSpanElement {}

export interface InputFieldProps {
  id?: string;
  placeholder?: string;
  shouldPreventEnterDefault?: boolean;
  onTextChange?: (text: string, key: string, event: KeyboardEvent) => void;
  onTextPasted?: (text: string, event: ClipboardEvent) => void;
}

export interface InputField extends HTMLInputElement {}

export interface HiddenInputProps {
  name?: string;
  initialValue?: Block[];
}

export interface HiddenInput extends HTMLInputElement {
  setBlocks: (blocks: Block[]) => void;
}

export interface EmailsEditorProps {
  id?: string;
  placeholder?: string;
  name?: string;
  store: Store;
}

export interface EmailsEditor extends HTMLDivElement {
  getEmails: () => Block[];
  getBlocks: () => Block[];
  addBlock: (text: string) => void;
}

export type EmailsInputOptions = Omit<EmailsEditorProps, 'store'>;
