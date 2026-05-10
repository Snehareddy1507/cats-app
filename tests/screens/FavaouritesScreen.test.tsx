import React from 'react';
import { render } from '@testing-library/react-native';
import FavouritesScreen from '../../src/screens/FavouritesScreen';
import { useGetFavouritesQuery } from '../../src/services/catApi';

jest.mock('../../src/services/catApi', () => ({
  useGetFavouritesQuery: jest.fn(),
}));

const mockHook = useGetFavouritesQuery as jest.Mock;

describe('FavouritesScreen', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loader when loading', () => {
    mockHook.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    const { getByTestId } = render(<FavouritesScreen />);
    const loader = getByTestId('loading');
    expect(loader).toBeDefined();
  });

  it('renders empty state when no favourites exist', () => {
    mockHook.mockReturnValue({
      data: [],
      isLoading: false,
    });

    const { getByText } = render(<FavouritesScreen />);

    expect(getByText(/no/i)).toBeTruthy();
  });

  it('handles undefined data safely', () => {
    mockHook.mockReturnValue({
      data: undefined,
      isLoading: false,
    });

    const { queryByText } = render(<FavouritesScreen />);

    expect(queryByText(/error|fail|no/i)).toBeTruthy();
  });

});