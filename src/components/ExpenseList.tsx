"use client";
type Expense = {
  id: string;
  name: string;
  amount: number;
};

export default function ExpenseList({
  expenses,
  handleDelete,
}: {
  expenses: Expense[];
  handleDelete: (id: string) => void;
}) {
  if (!expenses.length) {
    return <p className="text-gray-500 mt-4">No expenses yet.</p>;
  }

  return (
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
  );
}
