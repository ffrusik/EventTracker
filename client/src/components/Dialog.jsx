import { createPortal } from "react-dom";

export default function Dialog({ children, ref, onClose }) {
  return createPortal(
    <dialog
      ref={ref}
      className="absolute m-auto bg-opacity-50 z-50 rounded-xl"
      onClose={onClose}
    >
      <div className="bg-white p-4 rounded shadow-lg">{children}</div>
    </dialog>,
    document.getElementById("modal"),
  );
}
