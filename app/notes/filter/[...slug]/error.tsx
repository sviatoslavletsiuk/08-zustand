"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold text-red-500 mb-4">
        Помилка завантаження
      </h2>
      <p className="text-red-600 mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Спробувати ще раз
      </button>
    </div>
  );
}
