"use client";

import { useEffect, useState } from "react";
import BudgetForm from "@/components/BudgetForm";
import ExpenseList from "@/components/ExpenseList";
import BudgetChart from "@/components/BudgetChart";
import { v4 as uuidv4 } from "uuid";

type Expense = {
  id: string;
  name: string;
  amount: number;
};

export default function BudgetPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgetLimit, setBudgetLimit] = useState<number>(1000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    const storedLimit = localStorage.getItem("budgetLimit");

    if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
    if (storedLimit) setBudgetLimit(parseFloat(storedLimit));

    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budgetLimit", budgetLimit.toString());
  }, [budgetLimit]);

  const handleAddExpense = (name: string, amount: number) => {
    const newExpense = {
      id: uuidv4(),
      name,
      amount,
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const remaining = budgetLimit - totalSpent;

  const chartData = [
    { name: "Spent", value: totalSpent },
    { name: "Remaining", value: remaining >= 0 ? remaining : 0 },
  ];

  if (loading) {
    return <p className="text-gray-600 text-center mt-10 animate-pulse">Loading...</p>;
  }

  return (
    <main className="flex flex-col items-center p-6 space-y-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">💰 Budget Tracker</h1>

      <div className="text-center">
        <label className="block text-gray-700 mb-2">Budget Limit ($)</label>
        <input
          type="number"
          className="border p-2 rounded w-40 text-center"
          value={budgetLimit}
          onChange={(e) => setBudgetLimit(parseFloat(e.target.value))}
        />
      </div>

      <BudgetChart data={chartData} />

      <BudgetForm onAdd={handleAddExpense} />

      <ExpenseList expenses={expenses} handleDelete={handleDelete} />
      
    </main>
  );
}
