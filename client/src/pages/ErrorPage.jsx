export default function Error({ error }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">{error.status}</h1>
      <p className="text-lg text-gray-600">{error.message}</p>
    </div>
  );
}
