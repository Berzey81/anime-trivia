import { useState, useRef, useEffect } from "react";
import "./MusicPlayer.css";

const tracks = [
  { name: "Attack on Titan OST", src: "/assets/music/track1.mp3" },
  { name: "Naruto Theme", src: "/assets/music/track2.mp3" },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  // Initialize audio and handle track changes
  useEffect(() => {
    audioRef.current = new Audio(tracks[currentTrackIndex].src);
    audioRef.current.volume = volume;
    audioRef.current.onended = playRandomTrack;

    return () => {
      audioRef.current.pause();
    };
  }, [currentTrackIndex]);

  const playRandomTrack = () => {
    const newIndex = Math.floor(Math.random() * tracks.length);
    setCurrentTrackIndex(newIndex);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player">
      <button onClick={togglePlay}>{isPlaying ? "⏸ Pause" : "▶️ Play"}</button>
      <button onClick={playRandomTrack}>🔀 Shuffle</button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => {
          setVolume(e.target.value);
          audioRef.current.volume = e.target.value;
        }}
      />
      <span>{tracks[currentTrackIndex].name}</span>
    </div>
  );
}
