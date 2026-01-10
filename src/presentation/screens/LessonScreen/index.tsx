import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../store/hooks';
import {Lesson} from '../../../domain/entities/lesson';
import {styles} from './styles';
import {RootStackParamList} from '../../../app/navigation/AppNavigator';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
type LessonScreenRouteProp = RouteProp<RootStackParamList, 'Lesson'>;
type LessonScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Lesson'
>;

const LessonScreen = () => {
  const route = useRoute<LessonScreenRouteProp>();
  const navigation = useNavigation<LessonScreenNavigationProp>();
  const {lessons} = route.params;
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack() } style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{t('grammar.title')}</Text>
      </View>
      <FlatList
        data={lessons}
        style={styles.list}
        renderItem={({item}) => <LessonItem item={item} />}
      />
    </View>
  );
};

const LessonItem = ({item}: {item: Lesson}) => {
  const navigation = useNavigation<LessonScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Content', {lesson: item})}>
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
export default LessonScreen;
