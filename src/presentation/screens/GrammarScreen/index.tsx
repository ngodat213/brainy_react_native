import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  selectGrammarError,
  selectGrammarLoading,
} from '../../store/grammar/grammarSelectors';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../store/hooks';
import {selectGrammar} from '../../store/grammar/grammarSelectors';
import {fetchGrammar} from '../../store/grammar/grammarThunks';
import {Lesson} from '../../../domain/entities/lesson';
import { styles } from './styles';

const GrammarScreen = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const grammar = useSelector(selectGrammar);
  const loading = useSelector(selectGrammarLoading);
  const error = useSelector(selectGrammarError);

  useEffect(() => {
    dispatch(fetchGrammar({with_lessons: true}));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('grammar.title')}</Text>
      <FlatList
        data={grammar}
        renderItem={({item}) => <GrammarItem item={item} />}
      />
    </View>
  );
};

const GrammarItem = ({item}: {item: Lesson}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.lessonOrderIndex}>{item.orderIndex}</Text>
      <View style={styles.lessonTitleContainer}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.lessonDescription}>
          {item.description}
        </Text>
      </View>
    </View>
  );
};
export default GrammarScreen;
