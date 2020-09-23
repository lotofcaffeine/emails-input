import { deleteButtonBuilder } from '.';
import { fireEvent } from '@testing-library/dom';

describe('DeleteButton', () => {
  it('should call onClick callback when clicked', () => {
    const fn = jest.fn();
    const cut = deleteButtonBuilder({
      tagId: 'id',
      onClick: fn,
    });
    fireEvent.click(cut);
    expect(fn).toBeCalled();
  });
});
