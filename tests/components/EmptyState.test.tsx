import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EmptyState from '../../src/components/EmptyState';

describe('EmptyState', () => {
  const mockOnPress = jest.fn();

  const defaultProps = {
    title: 'No Cats Yet',
    subtitle: 'Upload your first furry friend',
    buttonText: 'Upload a Cat',
    onPress: mockOnPress,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title correctly', () => {
    const { getByText } = render(
      <EmptyState {...defaultProps} />
    );

    expect(getByText('No Cats Yet')).toBeTruthy();
  });

  it('renders subtitle correctly', () => {
    const { getByText } = render(
      <EmptyState {...defaultProps} />
    );

    expect(
      getByText('Upload your first furry friend')
    ).toBeTruthy();
  });

  it('renders button text correctly', () => {
    const { getByText } = render(
      <EmptyState {...defaultProps} />
    );

    expect(getByText('Upload a Cat')).toBeTruthy();
  });

  it('calls onPress when button is pressed', () => {
    const { getByText } = render(
      <EmptyState {...defaultProps} />
    );

    fireEvent.press(getByText('Upload a Cat'));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const tree = render(
      <EmptyState {...defaultProps} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});