// components/ui/ScoreboardInput.tsx
import { useState, useEffect } from "react";
import { InputScore } from "./InputScore";

interface Props {
  initialScoreHome?: number | undefined;
  initialScoreAway?: number | undefined;
  onChange: (home: number | undefined, away: number | undefined) => void;
  min?: number;
  max?: number;
  className?: string;
}

export const ScoreboardInput = ({
  initialScoreHome,
  initialScoreAway,
  onChange,
  min = 0,
  max = 99,
  className = "",
}: Props) => {
  const [scoreHome, setScoreHome] = useState<number | undefined>(
    initialScoreHome
  );
  const [scoreAway, setScoreAway] = useState<number | undefined>(
    initialScoreAway
  );

  useEffect(() => {
    setScoreHome(initialScoreHome);
    setScoreAway(initialScoreAway);
  }, [initialScoreHome, initialScoreAway]);

  const handleHomeChange = (value: number | undefined) => {
    setScoreHome(value);
    onChange(value, scoreAway);
  };

  const handleAwayChange = (value: number | undefined) => {
    setScoreAway(value);
    onChange(scoreHome, value);
  };

  return (
    <div className={`grid grid-cols-3 items-center ${className}`}>
      <InputScore
        initialValue={initialScoreHome}
        onChange={handleHomeChange}
        min={min}
        max={max}
      />
      <span className="text-lg font-semibold text-gray-700 text-center">x</span>
      <InputScore
        initialValue={initialScoreAway}
        onChange={handleAwayChange}
        min={min}
        max={max}
      />
    </div>
  );
};

ScoreboardInput.displayName = "ScoreboardInput";
