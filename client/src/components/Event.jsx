export default function Event({ handleOpenEventInfo, event }) {
  return (
    <button
      onClick={handleOpenEventInfo}
      className="group w-full rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            Tracked Topic
          </p>

          <h2 className="mt-2 text-xl font-bold text-gray-900 group-hover:text-blue-600">
            {event.query}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Click to view the latest information
          </p>
        </div>

        <span className="text-xl text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-500">
          →
        </span>
      </div>
    </button>
  );
}
