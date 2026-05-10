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
    faHouse,
    faUpload,
    faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGetCatsQuery, useGetFavouritesQuery, useAddFavouriteMutation, useRemoveFavouriteMutation, useGetVotesQuery, useAddVoteMutation, } from '../services/catApi';
import { STRINGS } from '../constants/strings';
import CatCard from '../components/CatCard';
import { Cat, Favourite } from '../types/catTypes';
import EmptyState from '../components/EmptyState';

type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    'HomeScreen'
>;

export default function HomeScreen() {
    const navigation = useNavigation<NavigationProps>();
    const [scores, setScores] = React.useState<Record<string, number>>({});
    const {
        data,
        isLoading,
        error,
    } = useGetCatsQuery();

    const { data: favourites } = useGetFavouritesQuery();
    const [addFavourite] = useAddFavouriteMutation();
    const [removeFavourite] = useRemoveFavouriteMutation();
    const { data: votes } = useGetVotesQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [addVote] = useAddVoteMutation();

    const getScore = React.useCallback(
        (imageId: string): number =>
            votes?.filter(v => v.image_id === imageId)
                .reduce((sum, v) => sum + (v.value > 0 ? 1 : -1), 0) ?? 0,
        [votes]
    );

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

    const handleVoteUp = async (imageId: string) => {
        setScores(prev => ({
            ...prev,
            [imageId]: (prev[imageId] ?? getScore(imageId)) + 1,
        }));

        try {
            await addVote({
                image_id: imageId,
                value: 1,
            });
        } catch {
            setScores(prev => ({
                ...prev,
                [imageId]: (prev[imageId] ?? getScore(imageId)) - 1,
            }));
        }
    };

    const handleVoteDown = async (imageId: string) => {
        setScores(prev => ({
            ...prev,
            [imageId]: (prev[imageId] ?? getScore(imageId)) - 1,
        }));

        try {
            await addVote({
                image_id: imageId,
                value: -1,
            });
        } catch {
            setScores(prev => ({
                ...prev,
                [imageId]: (prev[imageId] ?? getScore(imageId)) + 1,
            }));
        }
    };

    const handleToggleFavourite = async (item: Cat & { isFavourite: boolean; favouriteId: number | null }) => {
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
    };

    const renderContent = () => {

        if (isLoading) {
            return (
                <View style={styles.center}>
                    <ActivityIndicator  testID='loading-indicator' size="large" color="#00897B" />
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
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.contentContainer}
                    columnWrapperStyle={styles.colWrapper}
                    renderItem={({ item }) => (
                        <CatCard
                            item={item}
                            score={scores[item.id] ?? getScore(item.id)}
                            onVoteUp={() => handleVoteUp(item.id)}
                            onVoteDown={() => handleVoteDown(item.id)}
                            onToggleFavourite={() => handleToggleFavourite(item)}
                        />
                    )}
                />
            );
        }

        return (
            <EmptyState
                title={STRINGS.homeScreen.noCatsAdded}
                subtitle={STRINGS.homeScreen.uploadMsg}
                buttonText={STRINGS.homeScreen.uploadCat}
                onPress={() => navigation.navigate('UploadScreen')}
            />
        );
    };

    return (
        <View style={styles.container}>

            {renderContent()}

            <View style={styles.bottomNav}>

                <TouchableOpacity style={styles.navItem}>
                    <View style={styles.activeIconContainer}>
                        <FontAwesomeIcon
                            icon={faHouse}
                            size={20}
                            color="#FFF"
                        />
                    </View>
                    <Text style={styles.navText}>
                        {STRINGS.homeScreen.home}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('UploadScreen')}
                >
                    <View>
                        <FontAwesomeIcon
                            icon={faUpload}
                            size={22}
                            color="#777"
                        />
                    </View>

                    <Text style={styles.navText}>
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
    contentContainer: {
        paddingBottom: 120,
        paddingTop: 12,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    colWrapper: {
        justifyContent: 'space-between',
        marginBottom: 12,
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