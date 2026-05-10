import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import UploadScreen from '../../src/screens/UploadScreen';
import { launchImageLibrary } from 'react-native-image-picker';
import { useUploadCatMutation } from '../../src/services/catApi';
import Toast from 'react-native-toast-message';

jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));

jest.mock('../../src/services/catApi', () => ({
  useUploadCatMutation: jest.fn(),
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
}));

describe('UploadScreen', () => {

  const mockUpload = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useUploadCatMutation as jest.Mock).mockReturnValue([
      mockUpload,
      { isLoading: false },
    ]);
  });

  it('renders upload screen correctly', () => {
    const { getByText } = render(<UploadScreen />);
    expect(getByText(/upload/i)).toBeTruthy();
  });

  it('opens image picker and selects image', async () => {

    (launchImageLibrary as jest.Mock).mockResolvedValue({
      didCancel: false,
      assets: [
        {
          uri: 'file://image.jpg',
          fileName: 'cat.jpg',
          type: 'image/jpeg',
        },
      ],
    });

    const { getByText } = render(<UploadScreen />);
    fireEvent.press(getByText(/tap/i));

    await waitFor(() => {
      expect(launchImageLibrary).toHaveBeenCalled();
    });
  });

  it('shows error toast if no image selected on upload', async () => {

    const { getByText } = render(<UploadScreen />);

    fireEvent.press(getByText(/upload a cat/i));

    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        })
      );
    });
  });

  it('shows loading indicator when uploading', () => {

    (useUploadCatMutation as jest.Mock).mockReturnValue([
      mockUpload,
      { isLoading: true },
    ]);

    const { getByTestId } = render(<UploadScreen />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

});  