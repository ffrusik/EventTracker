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

      <div className="flex flex-col w-9/12 p-2 mx-auto">
        <nav className="bg-gray-300 p-2 m-0.5">
          <ul>
            {isLoading ? (
              <li>Loading...</li>
            ) : isError ? (
              <li>Error occurred while fetching events.</li>
            ) : data.events.length === 0 ? (
              <li>No events found.</li>
            ) : (
              data.events.map((event) => (
                <Event
                  key={event.id}
                  handleOpenEventInfo={() => handleOpenEventInfo(event)}
                  event={event}
                />
              ))
            )}
          </ul>
        </nav>
        <div className="text-center p-2 m-0.5">
          <button
            className="bg-green-400 text-white p-2 m-0.5 rounded hover:bg-green-500 active:bg-green-600"
            onClick={handleOpenCreateEventForm}
          >
            Create Event
          </button>
        </div>
      </div>
    </>
  );
}
