import { Trophy, Check, Award } from "lucide-react";
import { RankingEntry } from "../../../../types/group";
import { Card } from "../../../../components/ui/Card";

interface UserPerformanceCardProps {
  performance: RankingEntry;
  position: number | null;
}

export const UserPerformanceCard = ({
  performance,
  position,
}: UserPerformanceCardProps) => {
  return (
    <Card variant="default" padding="md" className="relative overflow-hidden">
      <div className="absolute right-4 top-4">
        {position === 1 ? (
          <Trophy className="h-8 w-8 text-yellow-400" />
        ) : position && position <= 3 ? (
          <Award className="h-8 w-8 text-gray-400" />
        ) : (
          <Check className="h-8 w-8 text-green-400" />
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="bg-gray-600 rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
            {position || "-"}
          </div>
          <div>
            <h3 className="text-lg font-bold">{performance.user.nickname}</h3>
            <p className="text-yellow-400 font-bold text-xl">
              {performance.points} pontos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-800/50 p-3 rounded-lg">
            <p className="text-sm text-gray-400">Palpites</p>
            <p className="font-bold">{performance.totalGuesses}</p>
          </div>
          <div className="bg-gray-800/50 p-3 rounded-lg">
            <p className="text-sm text-gray-400">Exatos</p>
            <p className="font-bold text-green-400">{performance.exactHits}</p>
          </div>
          <div className="bg-gray-800/50 p-3 rounded-lg">
            <p className="text-sm text-gray-400">Acertos</p>
            <p className="font-bold text-blue-400">
              {performance.correctPredictions}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
