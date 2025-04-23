import {useState, useEffect} from 'react';

import {Word} from '../../../domain/entities/word';
import {WordRepository} from '../../../domain/repositories/wordRepository';
import {
  LIMIT_WORD_DEFAULT,
  STACK_SIZE_SWIPER_DEFAULT,
} from '../../../core/constants/constants';
import { RandomWordUseCase } from '../../../domain/usecases/word/randomWordUseCase';

export const useHomeViewModel = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const swiperStackSize = STACK_SIZE_SWIPER_DEFAULT;

  //Initialize use case
  const wordRepository = new WordRepository();
  const randomWordUseCase = new RandomWordUseCase(wordRepository);

  const fetchRandomWords = async () => {
    try {
      setLoading(true);
      const words = await randomWordUseCase.execute({
        limit: LIMIT_WORD_DEFAULT,
      });
      setWords(words);
    } catch (error) {
      console.error('Error fetching random words:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomWords();
  }, []);

  return {
    words,
    loading,
    currentCardIndex,
    fetchRandomWords,
    swiperStackSize,
  };
};
