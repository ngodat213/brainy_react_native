import {t} from 'i18next';
import {apiClient} from '../../core/services/apiService';
import {
  SearchWordDTO,
  WordByIdDTO,
  WordByStatusDTO,
  WordDTO,
} from '../../data/models/WordDTO';
import {IWordRepository} from '../../data/repositories/IWordRepository';
import {Word} from '../entities/word';
import {RandomWordParams} from '../usecases/word/randomWordUseCase';
import {GetAllWordParams} from '../usecases/word/getAllWordUseCase';
import { GetWordByStatusParams } from '../usecases/word/getWordByStatusUseCase';
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

  async getWordPagnation(credentials: GetAllWordParams): Promise<WordDTO> {
    try {
      const response = await apiClient.get<WordDTO>('/words/paginated?page=' + credentials.page + '&limit=' + credentials.limit);
      return response;
    } catch (error) {
      throw new Error(t('word.failedToGetWords'));
    }
  }

  async getWordByStatus(credentials: GetWordByStatusParams): Promise<WordByStatusDTO> {
    try {
      const response = await apiClient.get<WordByStatusDTO>('/learn/status?status=' + credentials.status + '&page=' + credentials.page + '&limit=' + credentials.limit);
      return response;
    } catch (error) {
      throw new Error(t('word.failedToGetWordsByStatus'));
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
