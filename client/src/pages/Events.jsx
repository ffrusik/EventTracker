import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Dialog from "../components/Dialog";
import CreateEventForm from "../components/CreateEventForm";
import EventInfo from "../components/EventInfo";
import Event from "../components/Event";

import { getEvents } from "../util/http";

export default function Events() {
  const [openCreateEventForm, setOpenCreateEventForm] = useState(false);
  const [openEventInfo, setOpenEventInfo] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const dialog = useRef();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  function handleOpenEventInfo(event) {
    setOpenEventInfo(true);
    setSelectedEvent(event);
    dialog.current.showModal();
  }

  function handleOpenCreateEventForm() {
    setOpenCreateEventForm(true);
    dialog.current.showModal();
  }

  function clearDialog() {
    setOpenCreateEventForm(false);
    setOpenEventInfo(false);
  }

  return (
    <>
      <Dialog ref={dialog} onClose={clearDialog}>
        {openCreateEventForm && <CreateEventForm refDialog={dialog} />}
        {openEventInfo && (
          <EventInfo refDialog={dialog} event={selectedEvent} />
        )}
      </Dialog>

      <main className="min-h-[80vh] w-11/12 max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-blue-600 mb-2">
              YOUR DASHBOARD
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Your Events
            </h1>

            <p className="mt-2 text-gray-500">
              Track the topics you're interested in and stay up to date.
            </p>
          </div>

          <button
            onClick={handleOpenCreateEventForm}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 active:bg-blue-800"
          >
            + Create Event
          </button>
        </div>

        {/* Events */}
        <section>
          {isLoading ? (
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
              <p className="text-gray-500">Loading your events...</p>
            </div>
          ) : isError ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
              <p className="font-medium text-red-600">
                Error occurred while fetching events.
              </p>
            </div>
          ) : data.events.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl text-blue-600">
                +
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-900">
                No events yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-gray-500">
                You aren't tracking anything yet. Create your first event to
                start receiving updates.
              </p>

              <button
                onClick={handleOpenCreateEventForm}
                className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Create Your First Event
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {data.events.map((event) => (
                <Event
                  key={event.id}
                  handleOpenEventInfo={() => handleOpenEventInfo(event)}
                  event={event}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
