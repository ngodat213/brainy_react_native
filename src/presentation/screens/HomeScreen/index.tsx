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
import { styles } from './styles';
import AudioButton from '../../components/audioButton';

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const {words, fetchRandomWords, swiperStackSize, loading, currentCardIndex, changeCurrentCardIndex} =
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
          <AudioButton audioId={wordItem.phonetic_text!} onPlay={() => {}} onStop={() => {}} />
          <AudioButton audioId={wordItem.phonetic_am_text!} onPlay={() => {}} onStop={() => {}} />
        </View>
        {wordItem.senses?.[0]?.definition && (
          <Text style={styles.definitionText}>
            {wordItem.senses[0].definition}
          </Text>
        )}
        <View style={styles.divider} />
        <View style={styles.exampleContainer}>
          {wordItem.senses?.[0]?.examples?.map(example => (
            <Text style={styles.exampleText}> - {example.x}</Text>
          ))}
        </View>
        <View style={styles.swipperButtonsContainer}>
          <View style={styles.swipperButton}>
            <TouchableOpacity style={styles.audioButton}>
              <Ionicons name="arrow_back" size={24} color={'#4FD0E9'} />
            </TouchableOpacity>
            <Text>Skip</Text>
          </View>
          <View style={styles.swipperButton}>
            <Text>Learn</Text>
            <TouchableOpacity style={styles.audioButton}>
              <Ionicons name="arrow_forward" size={24} color={'#4FD0E9'} />
            </TouchableOpacity>
          </View>
        </View>
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
          changeCurrentCardIndex(cardIndex);
        }}
        onSwipedAll={() => {
          fetchRandomWords();
        }}
        cardIndex={currentCardIndex}
        backgroundColor={'#FFFFFF'}
        stackSize={swiperStackSize}
      />
    </View>
  );
};


export default HomeScreen;
