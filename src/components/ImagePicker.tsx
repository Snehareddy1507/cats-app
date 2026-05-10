import React from 'react';
import {
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { Asset } from 'react-native-image-picker';

type Props = {
    selectedImage: Asset | null;
    onPress: () => void;
    text: string;
};

export default function ImagePicker({
    selectedImage,
    onPress,
    text,
}: Props) {

    return (   
            <TouchableOpacity
                style={styles.innerContainer}
                onPress={onPress}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Image picker button"
            >
                {selectedImage ? (
                    <Image
                        source={{ uri: selectedImage.uri }}
                        style={styles.previewImage}
                        accessibilityLabel="Selected cat image"
                        testID="selected-image"
                    />
                ) : (
                    <>
                        <FontAwesomeIcon
                            icon={faPaw}
                            size={120}
                            style={styles.icon}
                        />

                        <Text style={styles.text}>
                            {text}
                        </Text>
                    </>
                )}
            </TouchableOpacity>
      
    );
}

const styles = StyleSheet.create({
  
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
});