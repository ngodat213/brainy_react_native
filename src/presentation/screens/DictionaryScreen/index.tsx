import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BaseInput} from '../../components/base';
import {styles} from './styles';
import {
  getPosColor,
  getPosColorWithOpacity,
  Word,
} from '../../../domain/entities/word';
import {useAppDispatch} from '../../store/hooks';
import {
  fetchAllWordsThunk,
  fetchWordsByStatusThunk,
  searchWordsThunk,
} from '../../store/dictionary/dictionaryThunks';
import {useSelector} from 'react-redux';
import {
  selectDictionaryPage,
  selectDictionaryLimit,
  selectDictionaryWords,
  selectDictionaryLoading,
  selectDictionarySearch,
  selectDictionaryWordAll,
  selectDictionaryWordLearning,
  selectDictionaryWordLearned,
  selectDictionaryWordSkipped,
  selectDictionaryStatus,
} from '../../store/dictionary/dictionarySelectors';
import {
  clearSearch,
  setStatusChange,
} from '../../store/dictionary/dictionarySlice';
import {LearningStatus} from '../../../domain/enums/searchStautsEnum';
import {
  LIMIT_WORD_DEFAULT,
  PAGE_DEFAULT,
} from '../../../core/constants/constants';
import {getColorWithOpacity} from '../../../core/utils/colorUtils';
import Dot from '../../components/dot';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

type VocabDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VocabDetail'>;

const DictionaryScreen = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const words = useSelector(selectDictionaryWords);
  const loading = useSelector(selectDictionaryLoading);
  const page = useSelector(selectDictionaryPage);
  const limit = useSelector(selectDictionaryLimit);
  const search = useSelector(selectDictionarySearch);
  const status = useSelector(selectDictionaryStatus);

  const navigation = useNavigation<VocabDetailScreenNavigationProp>();
  // Add local state for search input
  const [searchText, setSearchText] = useState('');
  // Add ref for debounce timer
  const searchTimer = useRef<NodeJS.Timeout | null>(null);

  // Handle search with debounce
  const handleSearchChange = (text: string) => {
    setSearchText(text);

    // Clear previous timer if exists
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    // Set new timer (500ms debounce)
    searchTimer.current = setTimeout(() => {
      dispatch(searchWordsThunk(text));
    }, 500);
  };

  useEffect(() => {
    dispatch(
      fetchAllWordsThunk({page: PAGE_DEFAULT, limit: LIMIT_WORD_DEFAULT}),
    );
    dispatch(
      fetchWordsByStatusThunk({
        page: PAGE_DEFAULT,
        limit: LIMIT_WORD_DEFAULT,
        status: LearningStatus.Learning,
      }),
    );
    dispatch(
      fetchWordsByStatusThunk({
        page: PAGE_DEFAULT,
        limit: LIMIT_WORD_DEFAULT,
        status: LearningStatus.Learned,
      }),
    );
    dispatch(
      fetchWordsByStatusThunk({
        page: PAGE_DEFAULT,
        limit: LIMIT_WORD_DEFAULT,
        status: LearningStatus.Skipped,
      }),
    );

    // Cleanup function for component unmount
    return () => {
      if (searchTimer.current) {
        clearTimeout(searchTimer.current);
      }
    };
  }, []);

  const statusData = [
    {
      name: 'All',
      backgroundColor: '#4FD0E9',
      color: '#008000',
      status: LearningStatus.All,
      total: useSelector(selectDictionaryWordAll)?.total,
    },
    {
      name: 'Learning',
      backgroundColor: '#4FD0E9',
      color: '#0000FF',
      status: LearningStatus.Learning,
      total: useSelector(selectDictionaryWordLearning)?.learn.total,
    },
    {
      name: 'Learned',
      backgroundColor: '#4FD0E9',
      color: '#008080',
      status: LearningStatus.Learned,
      total: useSelector(selectDictionaryWordLearned)?.learn.total,
    },
    {
      name: 'Skipped',
      backgroundColor: '#4FD0E9',
      color: '#483D8B',
      status: LearningStatus.Skipped,
      total: useSelector(selectDictionaryWordSkipped)?.learn.total,
    },
  ];

  const handleRedirectToVocabDetail = (word: Word) => {
    navigation.navigate('VocabDetail', {word});
  };  

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Oxford 3000</Text>
        <TouchableOpacity>
          <Ionicons name="arrow_forward" size={24} color={'#4FD0E9'} />
        </TouchableOpacity>
      </View>
      <BaseInput
        containerStyle={styles.searchInput}
        placeholder={t('dictionary.search')}
        prefixIcon="search"
        suffixIcon="microphone"
        onSuffixPress={() => {
          setSearchText('');
          dispatch(clearSearch());
        }}
        value={searchText}
        onChangeText={handleSearchChange}
      />
      {search !== '' && (
        <View style={styles.searchContainer}>
          <TouchableOpacity>
            <Ionicons name="search" size={16} color={'#4FD0E9'} />
          </TouchableOpacity>
          <Text style={styles.searchText}>Searching: "{search}"</Text>
        </View>
      )}
      <View style={styles.statusListContainer}>
        <FlatList
          data={statusData}
          horizontal
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => dispatch(setStatusChange(item.status))}>
              <View
                style={[
                  styles.statusContainer,
                  {
                    backgroundColor:
                      status === item.status
                        ? getColorWithOpacity(item.color, 0.15)
                        : '#FFFFFF',
                    borderColor:
                      status === item.status ? item.color : '#EFEEEA',
                    boxShadow:
                      status === item.status
                        ? `0px 0px 10px 0px 000000`
                        : 'none',
                  },
                ]}>
                <Dot isActive={status === item.status} color={item.color} />
                <Text
                  style={[
                    styles.statusText,
                    {color: status === item.name ? '#FFFFFF' : '#000000'},
                  ]}>
                  {item.name}
                </Text>
                <Text style={styles.statusTotal}>{item.total}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.name}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : words.length > 0 ? (
        <FlatList
          data={words}
          style={styles.wordList}
          renderItem={({item}) => {
            const posColor = getPosColor(item.pos);
            return (
              <TouchableOpacity onPress={() => handleRedirectToVocabDetail(item)}>
                <View style={styles.wordItem}>
                  <View style={styles.wordHeader}>
                    <Text style={styles.wordTitle}>{item.word}</Text>
                    <Text
                    style={[
                      styles.wordPos,
                      {
                        backgroundColor: getPosColorWithOpacity(item.pos, 0.15),
                        borderColor: posColor,
                        color: posColor,
                      },
                    ]}>
                    {item.pos}
                  </Text>
                </View>
                <Text style={styles.wordDefinition}>
                    {item.senses[0].definition}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <Text style={styles.noWordsFound}>No words found</Text>
      )}
    </View>
  );
};

export default DictionaryScreen;
