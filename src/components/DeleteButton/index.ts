import { DeleteButton, DeleteButtonProps } from '../../types';
import style from './DeleteButton.modules.css';

const createClose = () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '8');
  svg.setAttribute('height', '8');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svg.setAttribute('viewBox', '0 0 8 8');
  path.setAttribute('fill-rule', 'evenodd');
  path.setAttribute('clip-rule', 'evenodd');
  path.setAttribute(
    'd',
    'M8 .8L7.2 0 4 3.2.8 0 0 .8 3.2 4 0 7.2l.8.8L4 4.8 7.2 8l.8-.8L4.8 4 8 .8z'
  );
  path.setAttribute('fill', '#050038');
  svg.appendChild(path);
  return svg;
};

export const deleteButtonBuilder = ({
  tagId,
  onClick = () => {},
}: DeleteButtonProps): DeleteButton => {
  let info = createClose();
  const element = document.createElement('button') as DeleteButton;
  element.dataset['tagId'] = tagId;
  element.appendChild(info);
  element.classList.add(style['emails-editor__delete-button']);
  element.addEventListener('click', onClick, { once: true });
  element.clean = () => {
    element.removeEventListener('click', onClick);
  };
  return element;
};
