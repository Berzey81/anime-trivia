import { useState, useRef, useEffect } from "react";
import "./MusicPlayer.css";

const tracks = [
  { name: "Blue Exorcist Opening", src: "assets/music/Ao No Exorcist Opening 1 - CORE PRIDE_default.mp3" },
  { name: "Black Clover Opening" , src:"assets/music/Black Clover Opening 3 - Black Rover_default.mp3"},
  { name: "Bleach Opening", src: "assets/music/Bleach Opening 1 - Asterisk_default.mp3" },
  { name: "My Hero Academia Opening", src: "assets/music/Boku no Hero Academia Opening 1 - THE DAY_default.mp3" },
  { name: "Bungo Stray Dogs Opening", src: "assets/music/Bungo Stray Dogs Opening - TRASH CANDY_tv.mp3" },
  { name: "Chainsaw Man Opening", src: "assets/music/Chainsaw Man Opening - KICK BACK_tv.mp3" },
  { name: "Death Note Opening", src: "assets/music/Death Note Opening 1 - The World_default.mp3" },
  { name: "Dororo Opening", src: "assets/music/Dororo Opening - Kaen_tv.mp3" },
  { name: "Durarara Opening", src: "assets/music/Durarara Opening 1 - Uragiri no Yuuyake_default.mp3" },
  { name: "Erased Opening", src: "assets/music/Erased Opening - ReRe_default.mp3" },
  { name: "Fullmetal Alchemist Brotherhood Opening", src: "assets/music/Fullmetal Alchemist Brotherhood Opening 1 - Again_default.mp3" },
  { name: "Fullmetal Alchemist Brotherhood Opening 2", src: "assets/music/Fullmetal Alchemist Brotherhood Opening 4 - Chemistry - Period_default.mp3" },
  { name: "Haikyuu Opening", src: "assets/music/Haikyuu 2 Opening 2 - Fly High_default.mp3" },
  { name: "Hunter x Hunter Opening", src: "assets/music/Hunter x Hunter Opening 1 - Departure_default.mp3" },
  { name: "Jujutsu Kaisen Opening", src: "assets/music/Jujutsu Kaisen Opening - Kaikai Kitan_default.mp3" },
  { name: "Jujutsu Kaisen Opening 2", src: "assets/music/Jujutsu Kaisen Opening 2 - VIVID VICE_tv.mp3" },
  { name: "Mob Psycho 100 Opening", src: "assets/music/Mob Psycho 100 Opening - 99_default.mp3" },
  { name: "Naruto Shippuden Opening", src: "assets/music/No Game No Life Opening - This game_default.mp3" },
  { name: "No Game No Life Opening", src: "assets/music/One Piece Opening 1 - We Are_default.mp3" },
  { name: "Noragami Aragoto Opening", src: "assets/music/Noragami Aragoto Opening - Kyouran Hey Kids_default.mp3" },
  { name: "Overlord Opening", src: "assets/music/Overlord Opening - Clattanoia_default.mp3" },
  { name: "Parasyte the Maxim Opening", src: "assets/music/Parasyte the maxim Opening - Let Me Hear_tv.mp3" },
  { name: "Re Zero Opening", src: "assets/music/Re Zero Kara Hajimeru Isekai Seikatsu Opening 1 - Redo_tv.mp3" },
  { name: "Sword Art Online Opening", src: "assets/music/Sword Art Online Opening - Crossing Field_default.mp3" },
  { name: "Tokyo Ghoul Opening", src: "assets/music/Tokyo Ghoul Opening 1 - Unravel_default.mp3" },
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
