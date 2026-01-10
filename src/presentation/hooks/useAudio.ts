import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { playAudio, stopAudio } from '../store/audio/audioPlayerSlice';

/**
 * Custom hook để quản lý việc phát âm thanh của từ vựng
 * 
 * @param audioId - ID của audio cần phát
 * @returns Các giá trị và hàm để xử lý audio
 */
export const useAudio = (audioId: string | undefined) => {
  const dispatch = useDispatch();
  const currentPlayingId = useSelector((state: RootState) => state.audioPlayer.currentPlayingId);
  const isPlaying = currentPlayingId === audioId;
  
  // Phát âm thanh
  const play = useCallback(() => {
    if (!audioId) return;
    dispatch(playAudio(audioId));
  }, [dispatch, audioId]);
  
  // Dừng phát âm thanh
  const stop = useCallback(() => {
    dispatch(stopAudio());
  }, [dispatch]);
  
  // Chuyển đổi giữa phát và dừng
  const toggle = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  }, [isPlaying, play, stop]);
  
  // Tự động dừng khi component unmount
  useEffect(() => {
    return () => {
      if (isPlaying) {
        stop();
      }
    };
  }, [isPlaying, stop]);
  
  return {
    isPlaying,
    play,
    stop,
    toggle
  };
}; 