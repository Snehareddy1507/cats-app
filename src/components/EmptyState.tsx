import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCat, faUpload } from '@fortawesome/free-solid-svg-icons';

type Props = {
    title: string;
    subtitle: string;
    buttonText: string;
    onPress: () => void;
};

export default function EmptyState({
    title,
    subtitle,
    buttonText,
    onPress,
}: Props) {
    return (
        <View style={styles.container}>
            <FontAwesomeIcon
                icon={faCat}
                size={150}
                color="#00897B"
            />

            <Text style={styles.title}>
                {title}
            </Text>

            <Text style={styles.subtitle}>
                {subtitle}
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
            >
                <FontAwesomeIcon
                    icon={faUpload}
                    size={24}
                    color="#FFF"
                />

                <Text style={styles.buttonText}>
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#111827',
        marginTop: 20,
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 18,
        color: '#777',
        marginTop: 10,
        textAlign: 'center',
    },

    button: {
        marginTop: 40,
        backgroundColor: '#00897B',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 28,
        borderRadius: 40,
        elevation: 4,
    },

    buttonText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 10,
    },
});