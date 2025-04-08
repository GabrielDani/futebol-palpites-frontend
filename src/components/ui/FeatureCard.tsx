type FeatureCardProps = {
  title: string;
  description: string;
  highlightColor?: string;
};

export const FeatureCard = ({
  title,
  description,
  highlightColor = "text-yellow-400",
}: FeatureCardProps) => {
  return (
    <div className="bg-gray-700 rounded-2xl p-6 shadow-lg">
      <h2 className={`text-xl font-semibold ${highlightColor} mb-2`}>
        {title}
      </h2>
      <p className="text-zinc-300 text-sm">{description}</p>
    </div>
  );
};
