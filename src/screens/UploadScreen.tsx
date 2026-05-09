import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaw, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useUploadCatMutation } from '../services/catApi';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RouteProps = RouteProp<RootStackParamList, 'UploadScreen'>;

type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    'UploadScreen'
>;

export default function UploadScreen() {

    const navigation = useNavigation<NavigationProps>();
    const [selectedImage, setSelectedImage] = useState<Asset | null>(null);

    const [uploadCat, { isLoading }] = useUploadCatMutation();

    const choosePhoto = async () => {

        const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
        });

        if (result.didCancel) {
            return;
        }
        const asset = result.assets?.[0];

        if (!asset?.uri) {
            Alert.alert('Error', 'Please select an image');
            return;
        }
        setSelectedImage(asset);
    };

    const handleUpload = async () => {

        if (!selectedImage) {
            Alert.alert('Validation', 'Please choose an image first');
            return;
        }

        const formData = new FormData();

        const imageFile = {
            uri: selectedImage.uri,
            type: selectedImage.type || 'image/jpeg',
            name: selectedImage.fileName || 'cat.jpg',
        };

        formData.append('file', imageFile as unknown as Blob);

        try {
            await uploadCat(formData).unwrap();
            Alert.alert('Success', 'Cat uploaded successfully');
            navigation.goBack();

        } catch (error: unknown) {
            Alert.alert('Upload Failed', 'Something went wrong');
        }
    };

    return (
        <View style={styles.container}>

            {/* Upload Area */}
            <View style={styles.topSection}>

                <TouchableOpacity
                    style={styles.innerContainer}
                    onPress={choosePhoto}
                    activeOpacity={0.8}
                >

                    {selectedImage ? (
                        <Image
                            source={{ uri: selectedImage.uri }}
                            style={styles.previewImage}
                        />

                    ) : (
                        <>
                            <FontAwesomeIcon
                                icon={faPaw}
                                size={120}
                                style={styles.icon}
                            />
                            <Text style={styles.text}>
                                Tap to Choose a Photo
                            </Text>
                        </>
                    )
                    }
                </TouchableOpacity>

            </View>

            {/* Upload Button */}
            <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleUpload}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <>
                        <FontAwesomeIcon
                            icon={faUpload}
                            size={22}
                            color="#FFF"
                        />
                        <Text style={styles.uploadButtonText}>
                            Upload a Cat
                        </Text>
                    </>
                )
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#E8F5E9',
        paddingBottom: 100,
    },
    topSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        width: '85%',
        height: '60%',
        borderWidth: 2,
        borderColor: '#00897B',
        borderStyle: 'dashed',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#F5FFFD',
    },
    icon: {
        color: '#00897B',
    },
    text: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    uploadButton: {
        position: 'absolute',
        bottom: 30,
        left: 24,
        right: 24,
        backgroundColor: '#00897B',
        borderRadius: 40,
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    uploadButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 10,
    },

});