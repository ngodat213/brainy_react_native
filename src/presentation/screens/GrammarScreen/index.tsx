import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../store/hooks';
import {selectGrammar} from '../../store/grammar/grammarSelectors';
import {fetchGrammar} from '../../store/grammar/grammarThunks';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../app/navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Category } from '../../../domain/entities/category';
const GrammarScreen = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const grammar = useSelector(selectGrammar);

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

const GrammarItem = ({item}: {item: Category}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('Lesson', {lessons: item.lessons || []});
    }}>
      <View style={styles.item}>
        <Text style={styles.lessonOrderIndex}>{item.orderIndex}</Text>
        <View style={styles.lessonTitleContainer}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.lessonDescription}>
          {item.description}
        </Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};
export default GrammarScreen;
