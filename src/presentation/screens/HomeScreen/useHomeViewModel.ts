import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  LIMIT_WORD_DEFAULT,
  STACK_SIZE_SWIPER_DEFAULT,
} from '../../../core/constants/constants';
import {useAppDispatch} from '../../store/hooks';
import {fetchRandomWordsThunk} from '../../store/home/homeThunks';
import {
  selectWords,
  selectWordLoading,
  selectCurrentCardIndex,
} from '../../store/home/homeSelectors';
import {setCurrentCardIndex} from '../../store/home/homeSlice';

export const useHomeViewModel = () => {
  const swiperStackSize = STACK_SIZE_SWIPER_DEFAULT;
  const dispatch = useAppDispatch();

  // Get state from Redux
  const words = useSelector(selectWords);
  const currentCardIndex = useSelector(selectCurrentCardIndex);
  const loading = useSelector(selectWordLoading);

  const fetchRandomWords = async () => {
    try {
      await dispatch(
        fetchRandomWordsThunk({
          limit: LIMIT_WORD_DEFAULT,
        }),
      );
    } catch (error) {
      console.error('Error fetching random words:', error);
    }
  };

  const changeCurrentCardIndex = (index: number) => {
    dispatch(setCurrentCardIndex(index));
  };

  useEffect(() => {
    fetchRandomWords();
  }, []);

  return {
    words,
    loading,
    fetchRandomWords,
    changeCurrentCardIndex,
    currentCardIndex,
    swiperStackSize,
  };
};
