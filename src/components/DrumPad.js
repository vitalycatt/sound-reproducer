import { useEffect, useState } from "react";
import classnames from "classnames";

import DrySound from "../assets/sounds/dry.wav";
import HitSound from "../assets/sounds/hit.wav";
import AppearSound from "../assets/sounds/appear.wav";
import HorrorSound from "../assets/sounds/horror.wav";

const padData = [
  {
    dataKey: "65",
    keyName: "A",
    soundName: "hit",
    soundUrl: `${HitSound}`,
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
  const [isActive, setIsActive] = useState(false);

  const playSound = (soundUrl) => {
    const audio = new Audio(soundUrl);
    audio.play();
  };

  const onPress = (e) => {
    padData.forEach((item) => {
      if (item.dataKey === String(e.keyCode)) {
        playSound(item.soundUrl);
        setIsActive(item);
      }
    });

    setTimeout(() => setIsActive(false), 700);
  };

  useEffect(() => {
    window.addEventListener("keydown", onPress);

    return () => window.removeEventListener("keydown", onPress);
  }, []);

  return (
    <ul className="flex items-center justify-center gap-4">
      {padData.map((item) => (
        <PadButton
          key={item.dataKey}
          item={item}
          playSound={playSound}
          isActive={isActive}
        />
      ))}
    </ul>
  );
};

const PadButton = ({ item, playSound, isActive }) => (
  <li
    data-key={item.dataKey}
    onClick={() => playSound(item.soundUrl)}
    className={classnames(
      "w-[80px] h-[80px] flex flex-col items-center justify-center gap-2 border border-solid border-black rounded-lg cursor-pointer active:scale-125 transition-all duration-300 active:bg-red-500",
      { "scale-125 bg-red-500": isActive && isActive.dataKey === item.dataKey }
    )}
  >
    <kbd className="text-2xl">{item.keyName}</kbd>

    <span className="text-sm">{item.soundName}</span>
  </li>
);
