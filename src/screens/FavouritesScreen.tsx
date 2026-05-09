import React from 'react';
import { Text, View, Image, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useGetFavouritesQuery } from '../services/catApi';
import { STRINGS } from '../constants/strings';

export default function FavouritesScreen() {

    const { data: favourites, isLoading } = useGetFavouritesQuery(undefined);

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#00897B" />
            </View>
        );
    }

    return (
        <FlatList
            data={favourites}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => (
                <View style={styles.container}>
                    <Image
                        source={{
                            uri: `https://cdn2.thecatapi.com/images/${item.image_id}.jpg`,
                        }}
                        style={styles.image}
                    />
                </View>
            )}
            contentContainerStyle={{ flex: 1 }}
            ListEmptyComponent={
                <View style={styles.noData}>
                    <Text style={styles.noDataText}>
                       {STRINGS.favourites.noFavMsg}
                    </Text>
                </View>}
        />
    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        margin: 6
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10
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