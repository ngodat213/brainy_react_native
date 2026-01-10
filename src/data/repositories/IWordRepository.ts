import { RandomWordParams } from "../../domain/usecases/word/randomWordUseCase";
import { Word } from "../../domain/entities/word";
import { GetAllWordParams } from "../../domain/usecases/word/getAllWordUseCase";
import { WordByStatusDTO, WordDTO } from "../models/WordDTO";
import { GetWordByStatusParams } from "../../domain/usecases/word/getWordByStatusUseCase";
export interface IWordRepository {
  getRandomWords(credentials: RandomWordParams): Promise<Word[]>;
  getWordPagnation(credentials: GetAllWordParams): Promise<WordDTO>;
  getWordById(credentials: string): Promise<Word>;
  searchWords(credentials: string): Promise<Word[]>;
  getWordByStatus(credentials: GetWordByStatusParams): Promise<WordByStatusDTO>;
}