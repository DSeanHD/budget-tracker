'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

type Props = {
  income: number;
  spending: number;
};

export default function IncomeVsSpendingChart({ income, spending }: Props) {
  const data = [
    {
      name: 'Income',
      income,
      spending,
    },
  ];

  return (
    <div className="flex-1 min-w-[300px] h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value: number) => `$${value}`} />
          <Legend />
          <Bar dataKey="income" fill="#22C55E" name="Income" />
          <Bar dataKey="spending" fill="#EF4444" name="Spending" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
