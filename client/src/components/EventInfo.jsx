export default function EventInfo({ refDialog }) {
  function handleClose() {
    refDialog.current.close();
  }

  return (
    <div className="flex flex-col p-2 mx-auto">
      <h2 className="text-xl font-bold mb-2">Event name</h2>
      <ul className="list-disc list-inside mb-2">
        {/* Populate this event with info when it was created from the db, and new info discovered from the worker and then from db */}

        <li className="mb-2">
          Seems like new version will be available in 2 weeks. <br />
          Date: 17:55pm 09/08/2026 <br />
          <a href="#" className="text-blue-500 underline">
            Link
          </a>
        </li>
        <li className="mb-2">
          You subscribed to this event <br />
          Date: 17:52pm 09/08/2026
        </li>
      </ul>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <form method="DELETE" action="/api/events/:id">
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Unsubscribe
            </button>
          </form>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Edit
          </button>
        </div>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 justify-end"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
