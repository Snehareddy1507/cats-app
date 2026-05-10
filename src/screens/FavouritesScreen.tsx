import React from 'react';
import { Text, View, Image, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useGetFavouritesQuery } from '../services/catApi';
import { STRINGS } from '../constants/strings';

export default function FavouritesScreen() {

    const { data: favourites, isLoading, refetch } = useGetFavouritesQuery();
    const [refreshing, setRefreshing] = React.useState(false);

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator testID='loading' size="large" color="#00897B" />
            </View>
        );
    }

  const onRefresh = async () => {
        try {
            setRefreshing(true);
            await refetch();
        } finally {
            setRefreshing(false);
        }
    };
    
    return (
        <View style={styles.container}>
            <FlatList
                data={favourites ?? []}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image
                            source={{
                                uri: `https://cdn2.thecatapi.com/images/${item.image_id}.jpg`,
                            }}
                            style={styles.image}
                        />
                    </View>
                )}
                refreshing={refreshing}
                onRefresh={onRefresh}
                contentContainerStyle={{ flex: 1 }}
                ListEmptyComponent={
                    <View style={styles.noData}>
                        <Text style={styles.noDataText}>
                            {STRINGS.favourites.noFavMsg}
                        </Text>
                    </View>}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 6,
        backgroundColor: '#E8F5E9',
    },
    itemContainer: {
        flex: 1,
        margin: 6,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        fontSize: 16,
        fontFamily: 'Roboto',
        textAlign: 'center'
    }
});