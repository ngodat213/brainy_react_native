import { ColorValue } from 'react-native';

export interface Example {
  id: string;
  senseId: string;
  cf: string;
  x: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Sense {
  id: string;
  wordId: string;
  definition: string;
  examples: Example[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Word {
  id: string;
  lessonId?: string;
  word: string;
  pos: string;
  phonetic?: string;
  phoneticText?: string;
  phoneticAm?: string;
  phoneticAmText?: string;
  audioId?: string;
  imageId?: string;
  createdAt?: string;
  updatedAt?: string;
  audioUrl?: string;
  imageUrl?: string;
  lessonTitle?: string;
  senses: Sense[];
  isFavorite: boolean;
  lastReviewed?: Date;
  proficiencyLevel: string;
}

// Color mapping for parts of speech
const POS_COLORS: Record<string, ColorValue> = {
  // Full words
  'noun': '#800080', // purple
  'verb': '#0000FF', // blue
  'adjective': '#008000', // green
  'adverb': '#FFBF00', // amber
  'preposition': '#FFA500', // orange
  'conjunction': '#FF0000', // red
  'pronoun': '#008080', // teal
  'determiner': '#A52A2A', // brown
  'interjection': '#483D8B', // deepPurple

  // Abbreviations for backward compatibility
  'n': '#800080', // purple
  'v': '#0000FF', // blue
  'adj': '#008000', // green
  'adv': '#FFBF00', // amber
  'prep': '#FFA500', // orange
  'conj': '#FF0000', // red
  'pron': '#008080', // teal
  'det': '#A52A2A', // brown
  'interj': '#483D8B', // deepPurple
};

export const getPosColor = (pos: string): ColorValue => {
  // First try direct match with the lowercase pos
  const normalizedPos = pos.toLowerCase().trim();
  if (POS_COLORS[normalizedPos]) {
    return POS_COLORS[normalizedPos];
  }

  // Then try matching only the first part (e.g., "noun (plural)" → "noun")
  const firstPart = normalizedPos.split(' ')[0].split('.')[0];
  if (POS_COLORS[firstPart]) {
    return POS_COLORS[firstPart];
  }

  // Default color if no match
  return '#808080'; // grey
};

export const getPosColorWithOpacity = (pos: string, opacity: number = 0.2): string => {
  const hexColor = getPosColor(pos).toString();
  
  // Convert hex to rgb
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const createExample = (data: Partial<Example>): Example => ({
  id: data.id || '',
  senseId: data.senseId || '',
  cf: data.cf || '',
  x: data.x || '',
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});

export const createSense = (data: Partial<Sense>): Sense => ({
  id: data.id || '',
  wordId: data.wordId || '',
  definition: data.definition || '',
  examples: data.examples || [],
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});

export const createWord = (data: Partial<Word>): Word => ({
  id: data.id || '',
  lessonId: data.lessonId,
  word: data.word || '',
  pos: data.pos || '',
  phonetic: data.phonetic,
  phoneticText: data.phoneticText,
  phoneticAm: data.phoneticAm,
  phoneticAmText: data.phoneticAmText,
  audioId: data.audioId,
  imageId: data.imageId,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
  audioUrl: data.audioUrl,
  imageUrl: data.imageUrl,
  lessonTitle: data.lessonTitle,
  senses: data.senses || [],
  isFavorite: data.isFavorite || false,
  lastReviewed: data.lastReviewed,
  proficiencyLevel: data.proficiencyLevel || '0',
});

export const wordFromJson = (json: any): Word => {
  const senses = json.senses
    ? (json.senses as any[]).map(sense => ({
        ...createSense({
          id: sense.id,
          wordId: sense.word_id,
          definition: sense.definition,
          createdAt: sense.created_at,
          updatedAt: sense.updated_at,
        }),
        examples: sense.examples
          ? (sense.examples as any[]).map(example => createExample({
              id: example.id,
              senseId: example.sense_id,
              cf: example.cf,
              x: example.x,
              createdAt: example.created_at,
              updatedAt: example.updated_at,
            }))
          : [],
      }))
    : [];

  return createWord({
    id: json.id,
    lessonId: json.lesson_id,
    word: json.word,
    pos: json.pos,
    phonetic: json.phonetic,
    phoneticText: json.phonetic_text,
    phoneticAm: json.phonetic_am,
    phoneticAmText: json.phonetic_am_text,
    audioId: json.audio_id,
    imageId: json.image_id,
    createdAt: json.created_at,
    updatedAt: json.updated_at,
    audioUrl: json.audio_url,
    imageUrl: json.image_url,
    lessonTitle: json.lesson_title,
    senses,
    isFavorite: json.is_favorite,
    lastReviewed: json.last_reviewed ? new Date(json.last_reviewed) : undefined,
    proficiencyLevel: json.proficiency_level,
  });
};

export const wordToJson = (word: Word): any => ({
  id: word.id,
  lesson_id: word.lessonId,
  word: word.word,
  pos: word.pos,
  phonetic: word.phonetic,
  phonetic_text: word.phoneticText,
  phonetic_am: word.phoneticAm,
  phonetic_am_text: word.phoneticAmText,
  audio_id: word.audioId,
  image_id: word.imageId,
  created_at: word.createdAt,
  updated_at: word.updatedAt,
  audio_url: word.audioUrl,
  image_url: word.imageUrl,
  lesson_title: word.lessonTitle,
  senses: word.senses.map(sense => ({
    id: sense.id,
    word_id: sense.wordId,
    definition: sense.definition,
    created_at: sense.createdAt,
    updated_at: sense.updatedAt,
    examples: sense.examples.map(example => ({
      id: example.id,
      sense_id: example.senseId,
      cf: example.cf,
      x: example.x,
      created_at: example.createdAt,
      updated_at: example.updatedAt,
    })),
  })),
  is_favorite: word.isFavorite,
  last_reviewed: word.lastReviewed?.toISOString(),
  proficiency_level: word.proficiencyLevel,
});
