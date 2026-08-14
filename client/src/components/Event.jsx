export default function Event({ handleOpenEventInfo, event }) {
  return (
    <li onClick={handleOpenEventInfo} className="cursor-pointer">
      <p className="flex justify-between border border-gray-400 p-2 hover:bg-gray-100">
        <span className="font-bold">{event.query}</span>
        {/* <span className="text-gray-600">No new info</span> */}
        <span className="text-green-500">New info available!</span>
      </p>
    </li>
  );
}
