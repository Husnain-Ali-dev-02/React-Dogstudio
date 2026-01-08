import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = "/audio/bg-music.mp3";
    audio.loop = true;
    audio.volume =1;

    const playMusic = async () => {
      try {
        await audio.play();
        console.log("Music playing!");
      } catch {
        console.log("Autoplay blocked, waiting for interaction...");
      }
    };

    // Try to autoplay on load
    playMusic();

    // Fallback: play on first click anywhere
    const handleInteraction = () => {
      audio.play().catch(() => {});
      document.removeEventListener("click", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);

    // Pause music when user leaves tab
    const handleVisibility = () => {
      if (document.hidden) {
        audio.pause();
      } else {
        audio.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("visibilitychange", handleVisibility);
      audio.pause();
    };
  }, []);

  return <audio ref={audioRef} />;
}
