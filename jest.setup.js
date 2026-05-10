// Mock react-native-screens
jest.mock('react-native-screens', () => {
    const { View } = require('react-native');
    return {
        enableScreens: jest.fn(),
        screensEnabled: jest.fn().mockReturnValue(true),
        Screen: View,
        ScreenContainer: View,
        ScreenStack: View,
        ScreenStackHeaderConfig: View,
        NativeScreen: View,
        NativeScreenContainer: View,
        NativeScreenNavigationContainer: View,
        SearchBarCommands: {},
    };
});

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
    const React = require('react');
    const { View } = require('react-native');
    const inset = { top: 0, right: 0, bottom: 0, left: 0 };
    return {
        SafeAreaProvider: ({ children }) => React.createElement(View, null, children),
        SafeAreaView: ({ children }) => React.createElement(View, null, children),
        useSafeAreaInsets: () => inset,
        useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
        SafeAreaInsetsContext: {
            Consumer: ({ children }) => children(inset),
            Provider: ({ children }) => React.createElement(View, null, children),
        },
        initialWindowMetrics: { frame: { x: 0, y: 0, width: 390, height: 844 }, insets: inset },
    };
});

// Mock @react-navigation/native-stack (avoids native module dependency)
jest.mock('@react-navigation/native-stack', () => {
    const React = require('react');
    const { View } = require('react-native');
    const createNativeStackNavigator = () => ({
        Navigator: ({ children }) => React.createElement(View, null, children),
        Screen: ({ children }) => React.createElement(View, null, children),
        Group: ({ children }) => React.createElement(View, null, children),
    });
    return { createNativeStackNavigator };
});

// Mock react-redux
jest.mock('react-redux', () => ({
    Provider: ({ children }) => children,
    useDispatch: () => jest.fn(),
    useSelector: jest.fn(),
    useStore: () => ({
        getState: jest.fn(),
        dispatch: jest.fn(),
        subscribe: jest.fn(),
    }),

}));

// Mock react-native-image-picker
jest.mock('react-native-image-picker', () => ({
    launchImageLibrary: jest.fn(),
 }));

// Mock react-native-toast-message
jest.mock('react-native-toast-message', () => ({
    __esModule: true,
    default: () => null,
    show: jest.fn(),
}));

// Mock @fortawesome/react-native-fontawesome
jest.mock('@fortawesome/react-native-fontawesome', () => ({
    FontAwesomeIcon: 'Icon',
}));