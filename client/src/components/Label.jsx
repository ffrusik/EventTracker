export default function Label({ htmlFor, children, ...props }) {
  if (props.className) {
    props.className += " block text-gray-700 text-sm font-bold mb-2";
  } else {
    props.className = "block text-gray-700 text-sm font-bold mb-2";
  }

  return (
    <label htmlFor={htmlFor} {...props}>
      {children}
    </label>
  );
}
