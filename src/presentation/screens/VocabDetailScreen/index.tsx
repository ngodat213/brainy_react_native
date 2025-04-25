import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Word } from '../../../domain/entities/word';
import { vocabDetailStyles } from './styles';
import AudioButton from '../../components/audioButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/AppNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

type VocabDetailScreenRouteProp = RouteProp<RootStackParamList, 'VocabDetail'>;
type VocabDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VocabDetail'>;


const WordDetailsScreen = () => {
  const route = useRoute<VocabDetailScreenRouteProp>();
  const navigation = useNavigation<VocabDetailScreenNavigationProp>();
  const { word } = route.params;

  return (
    <View style={vocabDetailStyles.container}>
      <View style={vocabDetailStyles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        {/* {!isMastered && (
          <TouchableOpacity onPress={onMastered}>
            <Text style={useStyles.masteredButton}>Mastered</Text>
          </TouchableOpacity>
        )} */}
      </View>
      <ScrollView contentContainerStyle={vocabDetailStyles.content}>
        <Text style={vocabDetailStyles.word}>{word.word}</Text>

        <Text style={vocabDetailStyles.label}>A. Class: {word.pos}</Text>

        <Text style={vocabDetailStyles.label}>B. Phonetic</Text>
        {word.phonetic_text && (
          <View style={vocabDetailStyles.audioRow}>
            <AudioButton
              audioId={word.phonetic_text!}
              onPlay={() => {}} 
              onStop={() => {}}
            />
          </View>
        )}
        {word.phonetic_am_text && (
          <View style={vocabDetailStyles.audioRow}>
            <AudioButton
              audioId={word.phonetic_am_text!}
              onPlay={() => {}}
              onStop={() => {}}
            />
          </View>
        )}

        <Text style={vocabDetailStyles.label}>C. Definition</Text>
        {word.senses.map((sense, index) => (
          <View key={index} style={vocabDetailStyles.senseBlock}>
            <Text style={vocabDetailStyles.definition}>
              {index + 1}. {sense.definition}
            </Text>
            {sense.examples.length > 0 && (
              <>
                <Text style={vocabDetailStyles.examplesTitle}>Examples:</Text>
                {sense.examples.map((example, exIndex) => (
                  <Text key={exIndex} style={vocabDetailStyles.example}>
                    {exIndex + 1}.
                    {example.cf ? ` (${example.cf})` : ''} {example.x}
                  </Text>
                ))}
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default WordDetailsScreen;