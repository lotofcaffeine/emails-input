import { EmailBlock, EmailBlockProps } from '../../types';
import { deleteButtonBuilder } from '../DeleteButton';
import style from './EmailBlock.modules.css';

export const emailBlockBuilder = ({
  block,
  onDelete = () => {},
}: EmailBlockProps): EmailBlock => {
  const element = document.createElement('span') as EmailBlock;
  element.classList.add(style['emails-editor__email-block']);
  element.classList.add(
    block.isValid
      ? style['emails-editor__email-block--valid']
      : style['emails-editor__email-block--invalid']
  );
  element.dataset['tagId'] = block.id;

  const blockText = document.createElement('span');
  blockText.textContent = block.text;
  // This dataset field will be checked during e2e tests
  blockText.dataset['isValid'] = block.isValid ? 'valid' : 'invalid';

  element.appendChild(blockText);

  const deleteButton = deleteButtonBuilder({
    tagId: block.id,
    onClick: () => {
      onDelete(block);
    },
  });
  element.appendChild(deleteButton);
  return element;
};
