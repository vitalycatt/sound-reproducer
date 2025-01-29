import { useEffect } from "react";

import DrySound from "../assets/sounds/dry.wav";
import HitSound from "../assets/sounds/hit.wav";
import AppearSound from "../assets/sounds/appear.wav";
import HorrorSound from "../assets/sounds/horror.wav";

import telegramAudio from "../assets/telegram/audio/2025-01-29 17.44.52.ogg";
import telegramVideo from "../assets/telegram/video/2025-01-29 17.44.03.mp4";

const padData = [
  {
    dataKey: "65",
    keyName: "A",
    soundName: "hit",
    soundUrl: `${telegramVideo}`,
  },
  {
    dataKey: "83",
    keyName: "S",
    soundName: "appear",
    soundUrl: `${AppearSound}`,
  },
  {
    dataKey: "68",
    keyName: "D",
    soundName: "horror",
    soundUrl: `${HorrorSound}`,
  },
  {
    dataKey: "70",
    keyName: "F",
    soundName: "dry",
    soundUrl: `${DrySound}`,
  },
];

export const DrumPad = () => {
  const playSound = (soundUrl) => {
    const audio = new Audio(soundUrl);
    audio.play();
  };

  const onPress = (e) => {
    padData.forEach((item) => {
      if (item.dataKey === String(e.keyCode)) {
        playSound(item.soundUrl);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", onPress);

    return () => window.removeEventListener("keydown", onPress);
  }, []);

  return (
    <ul className="flex items-center justify-center gap-4">
      {padData.map((item) => (
        <PadButton key={item.dataKey} item={item} playSound={playSound} />
      ))}
    </ul>
  );
};

const PadButton = ({ item, playSound }) => (
  <li
    data-key={item.dataKey}
    onClick={() => playSound(item.soundUrl)}
    className="w-[80px] h-[80px] flex flex-col items-center justify-center gap-2 border border-solid border-black rounded-lg cursor-pointer hover:scale-125"
  >
    <kbd className="text-2xl">{item.keyName}</kbd>

    <span className="text-sm">{item.soundName}</span>
  </li>
);
