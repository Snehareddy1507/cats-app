import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useUploadCatMutation } from '../services/catApi';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { STRINGS } from '../constants/strings';
import Toast from 'react-native-toast-message';
import ImagePicker from '../components/ImagePicker';

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
            Toast.show({
                type: 'error',
                text1: STRINGS.uploadScreen.errorTitle,
                text2: STRINGS.uploadScreen.selectImg,
            });
            return;
        }
        setSelectedImage(asset);
    };

    const handleUpload = async () => {

        if (!selectedImage) {
            Toast.show({
                type: 'error',
                text1: STRINGS.uploadScreen.validationTitle,
                text2: STRINGS.uploadScreen.chooseImg,
            });
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
            Toast.show({
                type: 'success',
                text1: STRINGS.uploadScreen.successTitle,
                text2: STRINGS.uploadScreen.successMsg,
            });
            navigation.goBack();

        } catch (error: unknown) {
            Toast.show({
                type: 'error',
                text1: STRINGS.uploadScreen.uploadfailTitle,
                text2: STRINGS.uploadScreen.FailMsg,
            });
        }
    };

    return (
        <View style={styles.container}>

            {/* Upload Area */}
            <View style={styles.topSection}>

                <ImagePicker
                    selectedImage={selectedImage}
                    onPress={choosePhoto}
                    text={STRINGS.uploadScreen.tapMsg}
                />

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
                            {STRINGS.uploadScreen.uploadCat}
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