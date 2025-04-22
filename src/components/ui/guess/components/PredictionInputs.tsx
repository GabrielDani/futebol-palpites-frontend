import { useEffect, useState } from "react";

type PredictionInputsProps = {
  homeScore?: number;
  awayScore?: number;
  onScoreChange?: (team: "home" | "away", value?: number) => void;
};

export const PredictionInputs = ({
  homeScore,
  awayScore,
  onScoreChange,
}: PredictionInputsProps) => {
  const formatValue = (value?: number) => {
    return value !== undefined ? value.toString() : "";
  };

  // Estado local para armazenar valores temporários
  const [tempValues, setTempValues] = useState({
    home: formatValue(homeScore),
    away: formatValue(awayScore),
  });

  // Atualiza estado local quando recebe novos props
  useEffect(() => {
    setTempValues({
      home: formatValue(homeScore),
      away: formatValue(awayScore),
    });
  }, [homeScore, awayScore]);

  const handleBlur = (team: "home" | "away") => {
    const value = tempValues[team];
    const numValue = parseInt(value);
    onScoreChange?.(
      team,
      value === ""
        ? undefined
        : isNaN(numValue)
        ? undefined
        : Math.min(10, Math.max(0, numValue))
    );
  };

  const handleTempChange = (team: "home" | "away", value: string) => {
    setTempValues((prev) => ({
      ...prev,
      [team]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          max="10"
          value={tempValues.home}
          onChange={(e) => handleTempChange("home", e.target.value)}
          onBlur={() => handleBlur("home")}
          className="w-12 h-10 bg-gray-800 rounded-lg text-center text-yellow-400 
           border-2 border-gray-600 focus:border-yellow-500
           appearance-none outline-none transition-all
           /* Novas regras para remover setas */
           [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 
           [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none 
           [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="text-gray-400">x</span>
        <input
          type="number"
          min="0"
          max="10"
          value={tempValues.away}
          onChange={(e) => handleTempChange("away", e.target.value)}
          onBlur={() => handleBlur("away")}
          className="w-12 h-10 bg-gray-800 rounded-lg text-center text-yellow-400 
           border-2 border-gray-600 focus:border-yellow-500
           appearance-none outline-none transition-all
           /* Novas regras para remover setas */
           [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 
           [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none 
           [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <span className="text-xs text-gray-400 mt-1">Seu Palpite</span>
    </div>
  );
};
