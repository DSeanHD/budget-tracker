'use client';
type Props = {
  income: number;
  onIncomeChange: (value: number) => void;
};

export default function IncomeForm({ income, onIncomeChange }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Enter Your Income</h2>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={income}
          onChange={(e) => onIncomeChange(Number(e.target.value))}
          placeholder="Enter income"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          min={0}
        />
      </div>
    </div>
  );
}
