import React, { useEffect, useState } from 'react';
import { View, ScrollView, Linking, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Markdown from 'react-native-markdown-display';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../../../app/navigation/AppNavigator';
import { Lesson } from '../../../domain/entities/lesson';
import { styles } from './styles';
import { useTheme } from '../../../core/theme/ThemeContext';

type ContentScreenRouteProp = RouteProp<RootStackParamList, 'Content'>;
type ContentScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Content'>;

const ContentScreen = () => {
  const route = useRoute<ContentScreenRouteProp>();
  const navigation = useNavigation<ContentScreenNavigationProp>();
  const { lesson } = route.params;
  const { theme } = useTheme();
  const [markdownContent, setMarkdownContent] = useState<string>('');

  useEffect(() => {
    if (lesson && lesson.content) {
      setMarkdownContent(lesson.content);
    }
  }, [lesson]);

  const handleLinkPress = (url: string): boolean => {
    Linking.openURL(url).catch((err) => {
      console.error('Failed to open URL:', err);
    });
    return true;
  };

  // Markdown styling to match Flutter implementation
  const markdownStyles = {
    body: {
      fontFamily: 'Roboto',
      color: theme.colors.text,
      padding: 16,
    },
    heading1: {
      fontWeight: 'bold' as const,
      fontSize: 18,
      fontFamily: 'Roboto',
      color: theme.colors.primary,
      marginTop: 10,
      marginBottom: 5,
    },
    heading2: {
      fontWeight: 'bold' as const,
      fontSize: 15,
      fontFamily: 'Roboto',
      color: theme.colors.primary,
      marginTop: 10,
      marginBottom: 5,
    },
    heading3: {
      fontWeight: 'bold' as const,
      fontSize: 13,
      fontFamily: 'Roboto',
      marginTop: 8,
      marginBottom: 3,
    },
    heading4: {
      fontWeight: 'bold' as const,
      fontSize: 12,
      fontFamily: 'Roboto',
      marginTop: 6,
      marginBottom: 2,
    },
    paragraph: {
      fontSize: 12,
      fontFamily: 'Roboto',
      marginTop: 4,
      marginBottom: 4,
      lineHeight: 18,
    },
    strong: {
      fontWeight: 'bold' as const,
      fontSize: 12,
      fontFamily: 'Roboto',
    },
    blockquote: {
      fontStyle: 'italic' as const,
      color: '#757575', // equivalent to Colors.grey[700]
      fontSize: 12,
      fontFamily: 'Roboto',
      paddingLeft: 10,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.border,
      marginVertical: 5,
    },
    code_inline: {
      backgroundColor: '#EEEEEE', // equivalent to Colors.grey[200]
      fontSize: 12,
      fontFamily: 'monospace',
      padding: 2,
      borderRadius: 3,
    },
    code_block: {
      backgroundColor: '#EEEEEE', // equivalent to Colors.grey[200]
      fontFamily: 'monospace',
      padding: 10,
      borderRadius: 8,
      marginVertical: 5,
    },
    table: {
      borderWidth: 1,
      borderColor: '#E0E0E0', // equivalent to Colors.grey[300]
      borderRadius: 3,
      marginVertical: 10,
    },
    thead: {
      backgroundColor: theme.colors.background,
    },
    th: {
      fontWeight: 'bold' as const,
      fontSize: 13,
      color: theme.colors.primary,
      fontFamily: 'Roboto',
      padding: 8,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#E0E0E0',
    },
    td: {
      fontSize: 12,
      color: theme.colors.text,
      fontFamily: 'Roboto',
      padding: 8,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#E0E0E0',
    },
    hr: {
      backgroundColor: '#E0E0E0', // equivalent to Colors.grey[300]
      height: 1,
      marginVertical: 16,
    },
    link: {
      color: theme.colors.primary,
      textDecorationLine: 'underline' as const,
    },
    image: {
      marginVertical: 8,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            {lesson?.title || 'Lesson Content'}
          </Text>
        </View>
      </View>
      
      <ScrollView 
        style={styles.contentContainer}
        bounces={true}
        showsVerticalScrollIndicator={false}
      >
        <Markdown
          style={markdownStyles}
          onLinkPress={handleLinkPress}
        >
          {markdownContent}
        </Markdown>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContentScreen;
