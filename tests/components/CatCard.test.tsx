import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CatCard from '../../src/components/CatCard';

describe('CatCard', () => {

  const mockProps = {
    item: {
      id: '1',
      url: 'https://cdn2.thecatapi.com/images/test.jpg',
      isFavourite: false,
      favouriteId: null,
    },
    score: 5,
    onToggleFavourite: jest.fn(),
    onVoteUp: jest.fn(),
    onVoteDown: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders cat image correctly', () => {
    const { getByTestId } = render(<CatCard {...mockProps} />);

    const image = getByTestId('cat-image');

    expect(image.props.source.uri).toBe(
      'https://cdn2.thecatapi.com/images/test.jpg'
    );
  });

  it('calls onToggleFavourite when heart button pressed', () => {
    const { getAllByRole } = render(<CatCard {...mockProps} />);

    const buttons = getAllByRole('button');

    fireEvent.press(buttons[0]);

    expect(mockProps.onToggleFavourite).toHaveBeenCalledTimes(1);
  });

  it('calls onVoteUp when vote up button pressed', () => {
    const { getAllByRole } = render(<CatCard {...mockProps} />);

    const buttons = getAllByRole('button');

    fireEvent.press(buttons[1]);

    expect(mockProps.onVoteUp).toHaveBeenCalledTimes(1);
  });

  it('calls onVoteDown when vote up button pressed', () => {
    const { getAllByRole } = render(<CatCard {...mockProps} />);

    const buttons = getAllByRole('button');

    fireEvent.press(buttons[2]);

    expect(mockProps.onVoteDown).toHaveBeenCalledTimes(1);
  });

  it('renders favourite state correctly', () => {
    const props = {
      ...mockProps,
      item: {
        ...mockProps.item,
        isFavourite: true,
      },
    };

    const { toJSON } = render(<CatCard {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

});