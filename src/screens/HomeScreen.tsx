import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faCat,
    faHouse,
    faUpload,
    faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGetCatsQuery, useGetFavouritesQuery, useAddFavouriteMutation, useRemoveFavouriteMutation } from '../services/catApi';
import { STRINGS } from '../constants/strings';
import CatCard from '../components/CatCard';
import { Cat, Favourite } from '../types/catTypes';

type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    'HomeScreen'
>;

export default function HomeScreen() {

    const navigation = useNavigation<NavigationProps>();

    const {
        data,
        isLoading,
        error,
    } = useGetCatsQuery(undefined);

    const { data: favourites } = useGetFavouritesQuery(undefined);
    const [addFavourite] = useAddFavouriteMutation();
    const [removeFavourite] = useRemoveFavouriteMutation();

    const mergedData = React.useMemo(() => {
        if (!data) return [];
        return data.map((cat: Cat) => {
            const fav = favourites?.find((f: Favourite) => f.image_id === cat.id);

            return {
                ...cat,
                isFavourite: !!fav,
                favouriteId: fav?.id || null,
            };
        });
    }, [data, favourites]);

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
                        {STRINGS.homeScreen.errorMsg}
                    </Text>
                </View>
            );
        }

        if (data && data?.length > 0) {
            return (
                <FlatList
                    data={mergedData ?? []}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={{
                        paddingBottom: 120,
                        paddingTop: 12,
                    }}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        marginBottom: 12,
                    }}
                    renderItem={({ item }) => (
                        <CatCard
                            item={item}
                            onToggleFavourite={async () => {
                                try {
                                    if (item.isFavourite) {
                                        if (item.favouriteId) {
                                            await removeFavourite(item.favouriteId);
                                        }
                                    } else {
                                        await addFavourite(item.id);
                                    }
                            
                                } catch (e) {
                                    console.log('Favourite error:', e);
                                }
                            }}
                        />
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
                    {STRINGS.homeScreen.noCatsAdded}
                </Text>

                <Text style={styles.subtitle}>
                    {STRINGS.homeScreen.uploadMsg}
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
                        {STRINGS.homeScreen.uploadCat}
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
                        {STRINGS.homeScreen.home}
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
                        {STRINGS.homeScreen.upload}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('FavouritesScreen')}>
                    <FontAwesomeIcon
                        icon={faHeart}
                        size={22}
                        color="#777"
                    />

                    <Text style={styles.navText}>
                        {STRINGS.homeScreen.favourites}
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

});