import { emailBlockBuilder } from '.';
import { createBlock } from '../../testUtils';
import { getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

let container: HTMLDivElement;
let div: any;
jest.mock('../DeleteButton', () => {
  return {
    deleteButtonBuilder: ({ onClick = () => {} }) => {
      div = document.createElement('input');
      div.innerHTML = 'MockDeleteButton';
      div.callOnClick = () => {
        onClick();
      };
      return div;
    },
  };
});

describe('EmailBlock', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  it('should render as valid block', () => {
    const block = createBlock();
    const cut = emailBlockBuilder({
      block,
      onDelete: () => {},
    });
    container.appendChild(cut);
    expect(getByText(document.body, block.text)).toBeInTheDocument();
    expect(getByText(document.body, 'MockDeleteButton')).toBeInTheDocument();
  });
  it('should call onTextChange callback when the user type', () => {
    const fn = jest.fn();
    const block = createBlock();
    emailBlockBuilder({
      block,
      onDelete: fn,
    });
    div.callOnClick();
    expect(fn).toBeCalled();
  });
});
