import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { playAudio, stopAudio } from '../store/audio/audioPlayerSlice';
import { RootState } from '../store/store';

type AudioButtonProps = {
  audioId: string;
  onPlay: () => void;
  onStop?: () => void;
  backgroundColor?: string;
};

const AudioButton: React.FC<AudioButtonProps> = ({
  audioId,
  onPlay,
  onStop,
  backgroundColor = 'blue',
}) => {
  const dispatch = useDispatch();
  const currentPlayingId = useSelector(
    (state: RootState) => state.audioPlayer.currentPlayingId
  );

  const isPlaying = currentPlayingId === audioId;

  const handlePress = () => {
    if (isPlaying) {
      dispatch(stopAudio());
      onStop?.();
    } else {
      dispatch(playAudio(audioId));
      onPlay();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.button]}>
      <Text style={styles.icon}>{isPlaying ? '⏸️' : '🔊'}</Text>
      <Text style={{fontSize: 12}}>{audioId}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 16,
    color: '#fff',
  },
});

export default AudioButton;