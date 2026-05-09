import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const numColumns = 2;

const SCREEN_WIDTH = Dimensions.get('window').width;

const ITEM_SPACING = 12;

const ITEM_SIZE =
  (SCREEN_WIDTH - 24 * 2 - ITEM_SPACING * (numColumns - 1)) /
  numColumns;

type Props = {
  item: {
    id: string;
    url: string;
    isFavourite: boolean;
    favouriteId: number | null;
  };
  onToggleFavourite: () => void;
};

export default function CatCard({
  item,
  onToggleFavourite,
}: Props) {

  return (
    <View style={styles.gridItem}>

      <Image
        source={{ uri: item.url }}
        style={styles.image}
      />

      <TouchableOpacity
        onPress={onToggleFavourite}
        style={styles.heartButton}
      >
        <FontAwesomeIcon
          icon={
            item.isFavourite
              ? solidHeart
              : regularHeart
          }
          size={18}
          color={
            item.isFavourite
              ? '#e63946'
              : '#999'
          }
        />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

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

  heartButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 6,
  },

});