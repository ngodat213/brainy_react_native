import { RandomWordParams } from "../../domain/usecases/word/randomWordUseCase";
import { Word } from "../../domain/entities/word";

export interface IWordRepository {
  getRandomWords(credentials: RandomWordParams): Promise<Word[]>;
  getWords(): Promise<Word[]>;
  getWordById(credentials: string): Promise<Word>;
  searchWords(credentials: string): Promise<Word[]>;
}