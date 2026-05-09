import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ActivityIndicator,
    Image,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faCat,
    faHouse,
    faUpload,
    faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGetCatsQuery } from '../services/catApi';
type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    'HomeScreen'
>;

const numColumns = 2;

const SCREEN_WIDTH = Dimensions.get('window').width;

const ITEM_SPACING = 12;

const ITEM_SIZE = (SCREEN_WIDTH - 24 * 2 - ITEM_SPACING * (numColumns - 1)) / numColumns;

export default function HomeScreen() {

    const navigation = useNavigation<NavigationProps>();

    const {
        data,
        isLoading,
        error,
    } = useGetCatsQuery(undefined);

    const renderContent = () => {

        if (isLoading) {
            return (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#00897B" />
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.center}>
                    <Text style={styles.errorText}>
                        Failed to load cats
                    </Text>
                </View>
            );
        }

        if (data?.length > 0) {
            return (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    numColumns={numColumns}
                    contentContainerStyle={{
                        paddingBottom: 120,
                        paddingTop: 12,
                    }}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        marginBottom: 12,
                    }}
                    renderItem={({ item }) => (
                        <View style={styles.gridItem}>
                            <Image
                                source={{ uri: item.url }}
                                style={styles.image}
                            />
                        </View>
                    )}
                />
            );
        }

        return (
            <View style={styles.bottomContainer}>

                <FontAwesomeIcon
                    icon={faCat}
                    size={150}
                    color="#00897B"
                />

                <Text style={styles.title}>
                    No Cats Yet
                </Text>

                <Text style={styles.subtitle}>
                    Upload your first furry friend
                </Text>

                <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={() => navigation.navigate('UploadScreen')}
                >
                    <FontAwesomeIcon
                        icon={faUpload}
                        size={26}
                        color="#FFF"
                    />

                    <Text style={styles.uploadButtonText}>
                        Upload a Cat
                    </Text>
                </TouchableOpacity>

            </View>
        );
    };

    return (
        <View style={styles.container}>

            {renderContent()}

            <View style={styles.bottomNav}>

                <TouchableOpacity style={styles.navItem}>
                    <FontAwesomeIcon
                        icon={faHouse}
                        size={22}
                        color="#777"
                    />

                    <Text style={styles.navText}>
                        Home
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('UploadScreen')}
                >
                    <View style={styles.activeIconContainer}>
                        <FontAwesomeIcon
                            icon={faUpload}
                            size={20}
                            color="#FFF"
                        />
                    </View>

                    <Text style={styles.activeNavText}>
                        Upload
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <FontAwesomeIcon
                        icon={faHeart}
                        size={22}
                        color="#777"
                    />

                    <Text style={styles.navText}>
                        Favourites
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 20,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
    uploadButtonText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 10,
    },
    uploadButton: {
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
    bottomNav: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 10,
        paddingBottom: 20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        elevation: 10,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        marginTop: 6,
        color: '#777',
        fontSize: 12,
        fontWeight: '500',
    },
    activeNavText: {
        marginTop: 6,
        color: '#00897B',
        fontSize: 12,
        fontWeight: '700',
    },
    activeIconContainer: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#00897B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
    },
    gridItem: {
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        margin: 6,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#eee',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

});