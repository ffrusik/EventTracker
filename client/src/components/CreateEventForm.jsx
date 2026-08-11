export default function CreateEventForm({ refDialog }) {
  function handleClose() {
    refDialog.current.close();
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-2">Create Event</h2>
      <form>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Event Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Event Name"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-1 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Subscribe to an event
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-1 rounded focus:outline-none focus:shadow-outline"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </form>
    </>
  );
}
