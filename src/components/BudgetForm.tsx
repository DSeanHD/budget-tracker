"use client";
import { useState } from "react";

export default function BudgetForm({ onAdd }: { onAdd: (name: string, amount: number) => void }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !amount) return;
    onAdd(name.trim(), parseFloat(amount));
    setName("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="Expense name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        min="0"
        step="0.01"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Expense</button>
    </form>
  );
}
