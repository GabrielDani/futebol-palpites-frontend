type Props = {
  value: string | number;
  onChange: (value: string) => void;
};

export const GuessInput = ({ value, onChange }: Props) => {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-12 text-center border rounded p-1"
      min={0}
    />
  );
};
