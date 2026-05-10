import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';
import { useGetCatsQuery, useGetFavouritesQuery, useGetVotesQuery } from '../../src/services/catApi';
import { useNavigation } from '@react-navigation/native';

jest.mock('../../src/services/catApi');
jest.mock('@react-navigation/native');

const mockNavigation = jest.fn();

jest.mock('../../src/services/catApi', () => ({
  useGetCatsQuery: jest.fn(),
  useGetFavouritesQuery: jest.fn(),
  useGetVotesQuery: jest.fn(),
  useAddFavouriteMutation: () => [jest.fn()],
  useRemoveFavouriteMutation: () => [jest.fn()],
  useAddVoteMutation: () => [jest.fn()],
}));

(useGetCatsQuery as jest.Mock).mockReturnValue({
  data: [],
  isLoading: false,
  error: null,
});

(useGetFavouritesQuery as jest.Mock).mockReturnValue({
  data: [],
});
(useGetVotesQuery as jest.Mock).mockReturnValue({
  data: [],
});

describe('HomeScreen', () => {

  beforeEach(() => {
    jest.clearAllMocks();

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigation,
    });
  });

  it('shows loading state', () => {
    (useGetCatsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
    });

    const { getByTestId } = render(<HomeScreen />);

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('shows error state', () => {
    (useGetCatsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: null,
      error: true,
    });

    const { getByText } = render(<HomeScreen />);

    expect(getByText(/Failed to load cats/i)).toBeTruthy();
  });

  it('renders empty state when no cats exist', () => {
    (useGetCatsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: null,
    });

    (useGetFavouritesQuery as jest.Mock).mockReturnValue({ data: [] });
    (useGetVotesQuery as jest.Mock).mockReturnValue({ data: [] });

    const { getByText } = render(<HomeScreen />);

    expect(getByText(/No Cats Yet/i)).toBeTruthy();
  });

  it('renders list of cats', () => {
    (useGetCatsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [
        { id: '1', url: 'test' },
      ],
      error: null,
    });

    (useGetFavouritesQuery as jest.Mock).mockReturnValue({ data: [] });
    (useGetVotesQuery as jest.Mock).mockReturnValue({ data: [] });

    const { getByText } = render(<HomeScreen />);

    expect(getByText(/Home/i)).toBeTruthy();
  });

  it('navigates to upload screen from empty state', () => {
    (useGetCatsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: null,
    });

    (useGetFavouritesQuery as jest.Mock).mockReturnValue({ data: [] });
    (useGetVotesQuery as jest.Mock).mockReturnValue({ data: [] });

    const { getByText } = render(<HomeScreen />);

    fireEvent.press(getByText(/upload a cat/i));

    expect(mockNavigation).toHaveBeenCalledWith('UploadScreen');
  });
});