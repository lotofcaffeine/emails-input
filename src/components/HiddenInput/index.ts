import { HiddenInput, HiddenInputProps } from '../../types';

export const hiddenInputBuilder = ({
  name = 'emails-input',
  initialValue = [],
}: HiddenInputProps): HiddenInput => {
  const element = document.createElement('input') as HiddenInput;
  element.setBlocks = blocks => {
    element.setAttribute(
      'value',
      blocks
        .filter(b => b.isValid)
        .map(b => b.text)
        .join(',')
    );
  };
  element.setAttribute('name', name);
  element.setAttribute('type', 'hidden');
  element.setBlocks(initialValue);
  return element;
};
