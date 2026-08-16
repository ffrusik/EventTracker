import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getEventInfo, deleteEvent } from "../util/http";

export default function EventInfo({ refDialog, event }) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["eventInfo", event.id],
    queryFn: () => getEventInfo(event.id),
  });

  const mutation = useMutation({
    mutationFn: deleteEvent,
  });

  function handleClose() {
    refDialog.current.close();
  }

  function deleteEventAction() {
    mutation.mutate(event.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["events"] });

        refDialog.current.close();
      },
    });
  }

  return (
    <div className="flex flex-col p-2 mx-auto">
      <h2 className="text-xl font-bold mb-2">{event.query}</h2>
      <ul className="list-disc list-inside mb-2">
        {isLoading ? (
          <li>Loading...</li>
        ) : isError ? (
          <li>Error loading event info. {error.message}</li>
        ) : data.length === 0 ? (
          <li className="mb-2">
            You subscribed to this event <br />
            Date: {new Date(event.created_at).toLocaleString()}
          </li>
        ) : (
          <>
            {data.map((info) => (
              <li className="mb-2" key={info.id}>
                {info.title} <br />
                {info.info} <br />
                Source: "{info.source}" <br />
                URL:{" "}
                <a
                  className="text-blue-500 hover:underline"
                  href={info.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {info.url}
                </a>{" "}
                <br />
                Date: {new Date(info.created_at).toLocaleString()}
              </li>
            ))}
            <li className="mb-2">
              You subscribed to this event <br />
              Date: {new Date(event.created_at).toLocaleString()}
            </li>
          </>
        )}
      </ul>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <form action={deleteEventAction}>
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Unsubscribe
            </button>
          </form>
          <button className="bg-blue-500 text-white py-2 px-4 rounded mr-1 hover:bg-blue-600">
            Edit
          </button>
        </div>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded ml-1 hover:bg-gray-600 justify-end"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
