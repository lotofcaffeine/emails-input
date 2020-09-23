import { uuidv4 } from '../utils';

export class Block {
  id: string;
  text: string;
  isValid: boolean;
  constructor(text: string, isValid: boolean) {
    this.id = uuidv4();
    this.text = text;
    this.isValid = isValid;
  }
}
