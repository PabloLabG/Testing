import { renderHook, act } from '@testing-library/react-hooks';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { createEmptyLookup, Lookup } from 'common/models';

describe('Confirmation-dialog hooks test', () => {
  it('default values for hook', () => {
    // Arrage

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toBeFalsy();
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('set isOpen = true for hook and itemtToDelete is empty', () => {
    // Arrage

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // set by 'act'
    act(() => {
      result.current.isOpen = true;
    });

    // Assert
    expect(result.current.isOpen).not.toBeFalsy();
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('set isOpen = true and itemtToDelete not empty hook', () => {
    // Arrage
    const itemDelete: Lookup = {
      id: '123',
      name: 'item name',
    };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // set by 'act'
    act(() => {
      result.current.isOpen = true;
      result.current.itemToDelete = itemDelete;
    });

    // Assert
    expect(result.current.isOpen).not.toBeFalsy();
    expect(result.current.itemToDelete).toEqual(itemDelete);
  });
});
