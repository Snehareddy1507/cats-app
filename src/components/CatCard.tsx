import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart as solidHeart, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const numColumns = 2;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_SPACING = 12;
const ITEM_SIZE = (SCREEN_WIDTH - 24 * 2 - ITEM_SPACING * (numColumns - 1)) / numColumns;

type Props = {
  item: {
    id: string;
    url: string;
    isFavourite: boolean;
    favouriteId: number | null;
  };
  onToggleFavourite: () => void;
  score: number;
  onVoteUp: () => void;
  onVoteDown: () => void;
};

export default function CatCard({
  item,
  onToggleFavourite,
  score,
  onVoteUp,
  onVoteDown,
}: Props) {
 
  return (
    <View style={styles.cardContainer}>
      <View style={styles.gridItem}>
        <Image
          source={{ uri: item.url }}
          style={styles.image}
        />

        <TouchableOpacity
          onPress={onToggleFavourite}
          style={styles.heartButton}
        >
          <FontAwesomeIcon icon={
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

      {/* Bottom white section */}
      <View style={styles.footer}>

        <TouchableOpacity
          style={styles.voteButton}
          onPress={onVoteUp}
        >
          <FontAwesomeIcon
            icon={faThumbsUp}
            size={12}
            color="#FFF"
          />
        </TouchableOpacity>

        <Text style={styles.scoreText}>
          {score}
        </Text>

        <TouchableOpacity
          style={styles.voteButton}
          onPress={onVoteDown}
        >
          <FontAwesomeIcon
            icon={faThumbsDown}
            size={12}
            color="#FFF"
          />
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  cardContainer: {
    width: ITEM_SIZE,
    margin: 6,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    elevation: 3,
  },
  gridItem: {
    width: '100%',
    height: ITEM_SIZE,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  voteButton: {
    backgroundColor: '#00897B',
    padding: 10,
    borderRadius: 20,
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