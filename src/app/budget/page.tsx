'use client';

import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#FF6B6B', '#4CAF50'];

type Expense = {
  id: number;
  name: string;
  amount: number;
};

export default function BudgetPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [budgetLimit, setBudgetLimit] = useState<number>(0);

  useEffect(() => {
    const stored = localStorage.getItem('budgetLimit');
    if (stored) {
      setBudgetLimit(JSON.parse(stored));
    }
  }, []);

  // Load expenses from localStorage
  useEffect(() => {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
    setLoading(false);
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Save budget limit
  const handleSetBudgetLimit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('budgetLimit', JSON.stringify(budgetLimit));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const parsedAmount = parseFloat(amount);

    if (!trimmedName || isNaN(parsedAmount) || parsedAmount <= 0) return;

    const newExpense = {
      id: Date.now(),
      name: trimmedName,
      amount: parsedAmount,
    };

    setExpenses([...expenses, newExpense]);
    setName('');
    setAmount('');
  };

  const handleDelete = (id: number) => {
    const updated = expenses.filter((expense) => expense.id !== id);
    setExpenses(updated);
  };

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = Math.max(budgetLimit - totalSpent, 0);

  const chartData = [
    { name: 'Spent', value: totalSpent },
    { name: 'Remaining', value: remaining },
  ];

  return (
    <main className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">💰 Budget Tracker</h1>

      <div className="w-full max-w-md">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Budget Limit Form */}
      <form onSubmit={handleSetBudgetLimit} className="mb-6">
        <label className="block mb-2 font-medium">Set Budget Limit:</label>
        <input
          type="number"
          value={budgetLimit}
          onChange={(e) => setBudgetLimit(parseFloat(e.target.value))}
          className="border px-3 py-2 rounded w-64"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Save
        </button>
      </form>

      {/* Budget Summary */}
      <div className="mb-6 text-center">
        <p className="text-lg">
          <span className="font-semibold">Total Spent:</span> ${totalSpent.toFixed(2)}
        </p>
        <p className={`text-lg ${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
          <span className="font-semibold">Remaining:</span> ${remaining.toFixed(2)}
        </p>
      </div>

      {/* Add Expense */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2 items-end">
        <div>
          <label className="block mb-1">Expense Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-3 py-2 rounded"
            placeholder="e.g. Coffee"
          />
        </div>

        <div>
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border px-3 py-2 rounded"
            placeholder="e.g. 4"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
        >
          Add
        </button>
      </form>

      {/* Expense List */}
      {loading ? (
        <p className="text-gray-500 italic">Loading...</p>
      ) : (
        <ul className="mt-6 w-96 space-y-3">
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm"
            >
              <span>
                {expense.name}: ${expense.amount}
              </span>
              <button
                onClick={() => handleDelete(expense.id)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
