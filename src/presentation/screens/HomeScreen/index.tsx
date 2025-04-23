import Swiper from 'react-native-deck-swiper';
import HomeScreenProps from './types';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useHomeViewModel} from './useHomeViewModel';
import {
  getPosColor,
  getPosColorWithOpacity,
  Word,
} from '../../../domain/entities/word';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const {words, currentCardIndex, fetchRandomWords, swiperStackSize, loading} =
    useHomeViewModel();

  const renderCard = (wordItem: Word) => {
    if (!wordItem) return null;
    const posColor = getPosColor(wordItem.pos);
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>new</Text>
          <Text
            style={[
              styles.cardHeaderText,
              {
                backgroundColor: getPosColorWithOpacity(wordItem.pos, 0.15),
                borderColor: posColor,
                color: posColor,
              },
            ]}>
            {wordItem.pos}
          </Text>
        </View>
        <Text style={styles.wordText}>{wordItem.word}</Text>
        <View style={styles.audioContainer}>
          <View style={styles.audioButton}>
            <TouchableOpacity style={styles.audioButton}>
              <Ionicons name="volume-high" size={24} color={posColor} />
            </TouchableOpacity>
            <Text style={{fontSize: 12}}>{wordItem.phoneticText}</Text>
          </View>
        </View>
        {wordItem.senses?.[0]?.definition && (
          <Text style={styles.definitionText}>
            {wordItem.senses[0].definition}
          </Text>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!words || words.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No words available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Swiper
        cards={words}
        renderCard={renderCard}
        onSwiped={cardIndex => {
          console.log(cardIndex);
        }}
        onSwipedAll={() => {
          console.log('onSwipedAll');
          fetchRandomWords();
        }}
        cardIndex={currentCardIndex}
        backgroundColor={'#4FD0E9'}
        stackSize={swiperStackSize}
      />
    </View>
  );
};

const AudioButton = ({wordItem}: {wordItem: Word}) => {
  return (
    <View style={styles.audioButton}>
      <TouchableOpacity style={styles.audioButton}>
        <Ionicons name="volume-high" size={24} />
      </TouchableOpacity>
      <Text style={{fontSize: 12}}>{wordItem.phoneticText}</Text>
    </View>
  );
};  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardHeaderText: {
    fontSize: 14,
    marginRight: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#A4D7A7',
    borderWidth: 1,
    borderColor: '#7AC47C',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: 400,
  },
  wordText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  definitionText: {
    fontSize: 18,
    lineHeight: 24,
    color: '#666',
  },
  audioContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  audioButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default HomeScreen;
