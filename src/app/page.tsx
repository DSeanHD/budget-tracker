import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">🏠 Budget Tracker</h1>
        <p className="text-gray-600 mb-6">
          Welcome to your personal finance app. Track your expenses and stay in control.
        </p>
        <Link
          href="/budget"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go to Budget Page
        </Link>
      </div>
    </main>
  );
}
