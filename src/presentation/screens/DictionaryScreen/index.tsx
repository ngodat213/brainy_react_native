import React, {useEffect} from 'react';
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
} from '../../../domain/entities/word';
import {useAppDispatch} from '../../store/hooks';
import {
  fetchAllWordsThunk,
  fetchWordsByStatusThunk,
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
  setSearch,
  setStatusChange,
} from '../../store/dictionary/dictionarySlice';
import {LearningStatus} from '../../../domain/enums/searchStautsEnum';
import {
  LIMIT_WORD_DEFAULT,
  PAGE_DEFAULT,
} from '../../../core/constants/constants';
const DictionaryScreen = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const words = useSelector(selectDictionaryWords);
  const loading = useSelector(selectDictionaryLoading);
  const page = useSelector(selectDictionaryPage);
  const limit = useSelector(selectDictionaryLimit);
  const search = useSelector(selectDictionarySearch);
  const status = useSelector(selectDictionaryStatus);

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
  }, []);

  const statusData = [
    {
      name: 'All',
      backgroundColor: '#4FD0E9',
      color: '#FFFFFF',
      status: LearningStatus.All,
      total: useSelector(selectDictionaryWordAll)?.total,
    },
    {
      name: 'Learning',
      backgroundColor: '#4FD0E9',
      color: '#FFFFFF',
      status: LearningStatus.Learning,
      total: useSelector(selectDictionaryWordLearning)?.learn.total,
    },
    {
      name: 'Learned',
      backgroundColor: '#4FD0E9',
      color: '#FFFFFF',
      status: LearningStatus.Learned,
      total: useSelector(selectDictionaryWordLearned)?.learn.total,
    },
    {
      name: 'Skipped',
      backgroundColor: '#4FD0E9',
      color: '#FFFFFF',
      status: LearningStatus.Skipped,
      total: useSelector(selectDictionaryWordSkipped)?.learn.total,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text>Oxford 3000</Text>
        <TouchableOpacity>
          <Ionicons name="arrow_forward" size={24} color={'#4FD0E9'} />
        </TouchableOpacity>
      </View>
      <BaseInput
        containerStyle={styles.searchInput}
        placeholder={t('dictionary.search')}
        prefixIcon="search"
        suffixIcon="microphone"
        value={search}
        onChangeText={text => dispatch(setSearch(text))}
      />
      <View style={styles.statusListContainer}>
        <FlatList
          data={statusData}
          horizontal
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => dispatch(setStatusChange(item.status))}>
              <View style={styles.statusContainer}>
                <Text
                  style={[
                    styles.statusText,
                    {color: status === item.name ? item.color : '#FFFFF'},
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
            );
          }}
        />
      ) : (
        <Text>No words found</Text>
      )}
    </View>
  );
};

export default DictionaryScreen;
