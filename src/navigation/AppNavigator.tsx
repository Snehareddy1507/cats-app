// App.tsx

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import UploadScreen from '../screens/UploadScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import FavouritesScreen from '../screens/FavouritesScreen';
import { STRINGS } from '../constants/strings';

export type RootStackParamList = {
    HomeScreen: undefined;
    UploadScreen: undefined;
    FavouritesScreen: undefined;
};

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        headerTitle: () => (
                            <View style={styles.container}>
                                <FontAwesomeIcon icon={faPaw} size={26} color={'white'} />
                                <Text style={styles.text}>
                                    {STRINGS.appNavigator.catGallery}
                                </Text>
                            </View>
                        ),
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#00897B',
                        },
                    }}
                />
                <Stack.Screen
                    name="UploadScreen"
                    component={UploadScreen}
                    options={{
                        headerBackTitle: 'Back',
                        title: 'Upload a Cat', headerTitleAlign: 'center', headerTitleStyle: {
                            fontSize: 20,
                            fontWeight: 'bold',
                            fontFamily: 'Roboto',
                            color: 'white'
                        }, headerStyle: {
                            backgroundColor: '#00897B',
                        },
                        headerTintColor: '#fff',
                    }}
                />
                <Stack.Screen
                    name="FavouritesScreen"
                    component={FavouritesScreen}
                    options={{
                        headerBackTitle: 'Back',
                        title: 'Favourite Cats', headerTitleAlign: 'center', headerTitleStyle: {
                            fontSize: 20,
                            fontWeight: 'bold',
                            fontFamily: 'Roboto',
                            color: 'white'
                        }, headerStyle: {
                            backgroundColor: '#00897B',
                        },
                        headerTintColor: '#fff',
                    }}
                />
            </Stack.Navigator>
            
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        marginLeft: 8,
        color: 'white'
    },
});