import {t} from 'i18next';
import {apiClient} from '../../core/services/apiService';
import {
  SearchWordDTO,
  WordByIdDTO,
  WordDTO,
} from '../../data/models/WordDTO';
import {IWordRepository} from '../../data/repositories/IWordRepository';
import {Word} from '../entities/word';
import {RandomWordParams} from '../usecases/word/randomWordUseCase';

export class WordRepository implements IWordRepository {
  async getRandomWords(credentials: RandomWordParams): Promise<Word[]> {
    try {
      const response = await apiClient.get<Word[]>(
        '/words/random?limit=' + credentials.limit,
      );
      const words = response;

      return words;
    } catch (error) {
      throw new Error(t('word.failedToGetRandomWords'));
    }
  }

  async getWords(): Promise<Word[]> {
    try {
      const response = await apiClient.get<WordDTO>('/words');
      const words = response.words;
      return words;
    } catch (error) {
      throw new Error(t('word.failedToGetWords'));
    }
  }

  async getWordById(credentials: string): Promise<Word> {
    try {
      const response = await apiClient.get<WordByIdDTO>(
        '/words/' + credentials,
      );
      const word = response.word;
      return word;
    } catch (error) {
      throw new Error(t('word.failedToGetWordById'));
    }
  }

  async searchWords(credentials: string): Promise<Word[]> {
    try {
      const response = await apiClient.get<SearchWordDTO>(
        '/words/search?keyword=' + credentials,
      );
      const words = response.words;
      return words;
    } catch (error) {
      throw new Error(t('word.failedToSearchWords'));
    }
  }
}
