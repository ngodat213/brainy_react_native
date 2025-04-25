import { Word } from "../../domain/entities/word";

export interface WordDTO {
  items: Word[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface WordByStatusDTO {
  learn: WordStatusDTO;
}

export interface WordStatusDTO {
  items: Word[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
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
