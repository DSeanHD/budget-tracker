"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function BudgetChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  const COLORS = ["#EF4444", "#22C55E"];

  return (
    <div className="w-full md:w-3/4 h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, value }) => `${name}: $${value}`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`$${value}`, name]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
