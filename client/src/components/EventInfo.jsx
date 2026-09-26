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
    <div className="w-full max-w-2xl p-2">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          Tracked Topic
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">{event.query}</h2>

        <p className="mt-2 text-sm text-gray-500">
          Tracking since {new Date(event.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Information */}
      <div className="py-5">
        <h3 className="mb-4 text-lg font-bold text-gray-900">
          Latest Information
        </h3>

        {isLoading ? (
          <div className="rounded-lg bg-gray-50 p-5 text-center">
            <p className="text-gray-500">Loading information...</p>
          </div>
        ) : isError ? (
          <div className="rounded-lg bg-red-50 p-5">
            <p className="text-sm text-red-600">
              Error loading event info. {error.message}
            </p>
          </div>
        ) : data.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
            <p className="font-medium text-gray-700">
              No information found yet.
            </p>

            <p className="mt-1 text-sm text-gray-500">
              EventTracker will show relevant updates here when they are found.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((info) => (
              <article
                key={info.id}
                className="rounded-xl border border-gray-200 bg-gray-50 p-5"
              >
                <h4 className="font-semibold text-gray-900">{info.title}</h4>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {info.info}
                </p>

                <div className="mt-4 border-t border-gray-200 pt-3 text-sm">
                  <p className="text-gray-500">
                    Source:{" "}
                    <span className="font-medium text-gray-700">
                      {info.source}
                    </span>
                  </p>

                  <p className="mt-1 text-gray-500">
                    Date: {new Date(info.created_at).toLocaleString()}
                  </p>

                  <a
                    className="mt-2 inline-block font-medium text-blue-600 hover:text-blue-700 hover:underline"
                    href={info.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read source →
                  </a>
                </div>
              </article>
            ))}

            <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
              You subscribed to this event on{" "}
              {new Date(event.created_at).toLocaleString()}.
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-5">
        <form action={deleteEventAction}>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="rounded-lg px-4 py-2 font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
          >
            {mutation.isPending ? "Unsubscribing..." : "Unsubscribe"}
          </button>
        </form>

        <button
          onClick={handleClose}
          className="rounded-lg bg-gray-900 px-5 py-2 font-medium text-white transition hover:bg-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}
