import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LearningStatus } from '../../domain/enums/searchStautsEnum';
import { Word } from '../../domain/entities/word';
import { fetchAllWordsThunk, fetchWordsByStatusThunk } from '../store/dictionary/dictionaryThunks';
import { 
  selectDictionaryWords, 
  selectDictionaryLoading, 
  selectDictionaryWordAll,
  selectDictionaryWordLearned,
  selectDictionaryWordLearning,
  selectDictionaryWordSkipped
} from '../store/dictionary/dictionarySelectors';

type UseDictionaryParams = {
  initialStatus?: LearningStatus;
  pageSize?: number;
};

/**
 * Custom hook để quản lý từ vựng trong ứng dụng
 * 
 * @param initialStatus - Trạng thái ban đầu để lọc từ vựng (mặc định: tất cả)
 * @param pageSize - Số lượng từ mỗi trang (mặc định: 10)
 * @returns Các giá trị và hàm để xử lý từ vựng
 */
export const useVocabulary = ({ 
  initialStatus = LearningStatus.All, 
  pageSize = 10 
}: UseDictionaryParams = {}) => {
  const dispatch = useDispatch();
  const words = useSelector(selectDictionaryWords);
  const loading = useSelector(selectDictionaryLoading);
  const allWords = useSelector(selectDictionaryWordAll);
  const learnedWords = useSelector(selectDictionaryWordLearned);
  const learningWords = useSelector(selectDictionaryWordLearning);
  const skippedWords = useSelector(selectDictionaryWordSkipped);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Tải dữ liệu từ vựng
  const loadWords = useCallback(async () => {
    // Tải tất cả các từ
    await dispatch(fetchAllWordsThunk({ page: currentPage, limit: pageSize }));
    
    // Tải từ theo các trạng thái khác nhau
    await dispatch(fetchWordsByStatusThunk({
      page: currentPage,
      limit: pageSize,
      status: LearningStatus.Learning
    }));
    
    await dispatch(fetchWordsByStatusThunk({
      page: currentPage,
      limit: pageSize,
      status: LearningStatus.Learned
    }));
    
    await dispatch(fetchWordsByStatusThunk({
      page: currentPage,
      limit: pageSize,
      status: LearningStatus.Skipped
    }));
  }, [dispatch, currentPage, pageSize]);
  
  // Tải dữ liệu khi component mount
  useEffect(() => {
    loadWords();
  }, [loadWords]);
  
  // Thay đổi trạng thái
  const changeStatus = useCallback((status: LearningStatus) => {
    setCurrentStatus(status);
  }, []);
  
  // Tìm kiếm từ
  const searchWords = useCallback((term: string) => {
    setSearchTerm(term);
    // Logic tìm kiếm sẽ được xử lý ở Redux thunk
  }, []);
  
  // Tải thêm từ vựng (phân trang)
  const loadMoreWords = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);
  
  // Lấy thống kê từ vựng
  const getVocabularyStats = useCallback(() => {
    return {
      total: allWords?.total || 0,
      learned: learnedWords?.learn?.total || 0,
      learning: learningWords?.learn?.total || 0,
      skipped: skippedWords?.learn?.total || 0,
    };
  }, [allWords, learnedWords, learningWords, skippedWords]);
  
  // Tìm một từ cụ thể theo ID
  const findWordById = useCallback((id: string): Word | undefined => {
    return words.find(word => word.id === id);
  }, [words]);
  
  return {
    words,
    loading,
    currentStatus,
    searchTerm,
    stats: getVocabularyStats(),
    changeStatus,
    searchWords,
    loadMoreWords,
    loadWords,
    findWordById,
    currentPage,
  };
}; 