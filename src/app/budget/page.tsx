"use client";

import { useEffect, useState } from "react";
import BudgetForm from "@/components/BudgetForm";
import ExpenseList from "@/components/ExpenseList";
import BudgetChart from "@/components/BudgetChart";
import IncomeForm from "@/components/IncomeForm";
import IncomeVsSpendingChart from "@/components/IncomeVsSpendingChart";
import FormWrapper from "@/wrappers/FormWrapper";
import ChartWrapper from "@/wrappers/ChartWrapper";
import { v4 as uuidv4 } from "uuid";

type Expense = {
  id: string;
  name: string;
  amount: number;
};

export default function BudgetPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [income, setIncome] = useState<number>(0);
  const [budgetLimit, setBudgetLimit] = useState<number>(1000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    const storedLimit = localStorage.getItem("budgetLimit");
    const storedIncome = localStorage.getItem("income");

    if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
    if (storedLimit) setBudgetLimit(parseFloat(storedLimit));
    if (storedIncome) setIncome(parseFloat(storedIncome));

    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budgetLimit", budgetLimit.toString());
  }, [budgetLimit]);

  useEffect (() => {
    localStorage.setItem("income", income.toString());
  }, [income])

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
      <h1 className="text-3xl font-bold">💰 Budget Tracker</h1><br />

      <ChartWrapper>
        <BudgetChart data={chartData} />

        <IncomeVsSpendingChart
          income={income}
          spending={expenses.reduce((total, item) => total + item.amount, 0)}
        />
      </ChartWrapper>


      <div className="text-center">
        <FormWrapper>
          <IncomeForm income={income} onIncomeChange={setIncome} /><br />
          <label className="text-lg font-semibold mb-2">Budget Limit ($)</label>
          <input
            type="number"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={budgetLimit}
            onChange={(e) => setBudgetLimit(parseFloat(e.target.value))}
          />
        </FormWrapper>
      </div>

      <BudgetForm onAdd={handleAddExpense} />

      <ExpenseList expenses={expenses} handleDelete={handleDelete} />
      
    </main>
  );
}
