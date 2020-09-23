import { InputField, InputFieldProps } from '../../types';
import style from './InputField.modules.css';

export const inputFieldBuilder = ({
  id,
  placeholder = 'add more people...',
  shouldPreventEnterDefault = false,
  onTextChange = () => {},
  onTextPasted = () => {},
}: InputFieldProps): InputField => {
  const element = document.createElement('input') as InputField;
  element.classList.add(style['emails-editor__input-field']);
  if (id) {
    element.setAttribute('id', id);
  }
  element.setAttribute('placeholder', placeholder);
  if (shouldPreventEnterDefault) {
    element.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    });
  }
  element.addEventListener('keyup', event => {
    const value = (event.target as HTMLInputElement).value;
    onTextChange(value, event.key, event);
  });
  element.addEventListener('paste', event => {
    const text = (event.clipboardData || window.clipboardData).getData('text');
    onTextPasted(text, event);
  });
  return element;
};
