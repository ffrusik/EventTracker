import { useRef, useState } from "react";

import Dialog from "../components/Dialog";
import CreateEventForm from "../components/CreateEventForm";
import EventInfo from "../components/EventInfo";

export default function Events() {
  const [openCreateEventForm, setOpenCreateEventForm] = useState(false);
  const [openEventInfo, setOpenEventInfo] = useState(false);
  const dialog = useRef();

  function handleOpenEventInfo() {
    setOpenEventInfo(true);
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
        {openEventInfo && <EventInfo refDialog={dialog} />}
      </Dialog>

      <div className="flex flex-col w-9/12 p-2 mx-auto">
        <nav className="bg-gray-300 p-2 m-0.5">
          <ul>
            <li onClick={handleOpenEventInfo} className="cursor-pointer">
              <p className="flex justify-between">
                <span className="font-bold">Event name</span>
                <span className="text-gray-600">No new info</span>
                {/* <span className="text-green-500">New info available!</span> */}
              </p>
            </li>
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
