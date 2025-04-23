import { Word } from "../../domain/entities/word";

export interface WordDTO {
  words: Word[];
}

export interface RandomWordDTO {
  words: Word[];
}

export interface WordByIdDTO {
  word: Word;
}

export interface SearchWordDTO {
  words: Word[];
}
