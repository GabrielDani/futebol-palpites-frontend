import { ChevronLeft, ChevronRight } from "lucide-react";

type RoundControlsProps = {
  currentRound: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
};

export const RoundControls = ({
  currentRound,
  onPrev,
  onNext,
  className,
}: RoundControlsProps) => (
  <div className={`flex justify-between items-center ${className}`}>
    <h2 className="text-xl font-semibold">Rodada {currentRound}</h2>
    <div className="flex gap-4">
      <button
        onClick={onPrev}
        disabled={currentRound === 1}
        className="p-2 rounded-full bg-gray-700 disabled:opacity-50"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={onNext}
        disabled={currentRound === 38}
        className="p-2 rounded-full bg-gray-700 disabled:opacity-50"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);
