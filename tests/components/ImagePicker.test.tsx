import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ImagePicker from '../../src/components/ImagePicker';

describe('ImagePicker Component', () => {

  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders placeholder text when no image selected', () => {

    const { getByText } = render(
      <ImagePicker
        selectedImage={null}
        onPress={mockOnPress}
        text="Tap to choose a photo"
      />
    );

    expect(
      getByText('Tap to choose a photo')
    ).toBeTruthy();
  });

  it('calls onPress when picker pressed', () => {

    const { getByRole } = render(
      <ImagePicker
        selectedImage={null}
        onPress={mockOnPress}
        text="Tap to choose a photo"
      />
    );

    fireEvent.press(getByRole('button'));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders selected image correctly', () => {

    const mockImage = {
      uri: 'https://cdn2.thecatapi.com/images/test.jpg',
    };

    const { getByLabelText } = render(
      <ImagePicker
        selectedImage={mockImage as any}
        onPress={mockOnPress}
        text="Tap to choose a photo"
      />
    );

    const image = getByLabelText('Selected cat image');

    expect(image.props.source.uri).toBe(
      'https://cdn2.thecatapi.com/images/test.jpg'
    );
  });

  it('does not render placeholder text when image exists', () => {

    const mockImage = {
      uri: 'https://cdn2.thecatapi.com/images/test.jpg',
    };

    const { queryByText } = render(
      <ImagePicker
        selectedImage={mockImage as any}
        onPress={mockOnPress}
        text="Tap to choose a photo"
      />
    );

    expect(
      queryByText('Tap to choose a photo')
    ).toBeNull();
  });

});