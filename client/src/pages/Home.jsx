import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen w-11/12 max-w-6xl mx-auto px-6 py-4">
      {/* Hero */}
      <section className="flex flex-col items-center text-center py-16">
        <span className="mb-4 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
          Track what matters to you
        </span>

        <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-gray-900">
          Stay Updated on <span className="text-blue-600">What Matters</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          Track topics you care about and get the latest information from
          trusted sources — all in one place.
        </p>

        <p className="mt-2 max-w-2xl text-gray-500">
          Stop checking the same websites over and over again. Let EventTracker
          do the searching for you.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            to="/signup"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="rounded-lg border border-gray-400 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-3 text-gray-500">
            Three simple steps to stay informed.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-600">
              1
            </div>

            <h3 className="text-xl font-bold text-gray-900">
              Subscribe to a Topic
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              Create an event for anything you want to follow.
            </p>

            <p className="mt-4 text-sm font-semibold text-gray-500">Examples</p>

            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>- React 20</li>
              <li>- New AI releases</li>
              <li>- Apple announcements</li>
              <li>- Cybersecurity news</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-600">
              2
            </div>

            <h3 className="text-xl font-bold text-gray-900">
              We Track the Sources
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              EventTracker regularly checks selected news and information
              sources for new content related to your events.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-600">
              3
            </div>

            <h3 className="text-xl font-bold text-gray-900">
              Get the Information
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              When something relevant is found, it is added to your event so you
              can see the latest updates without searching multiple websites
              yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="my-16 rounded-2xl bg-gray-900 px-8 py-14 text-center text-white">
        <h2 className="text-3xl font-bold">Stop Searching. Start Tracking.</h2>

        <p className="mx-auto mt-4 max-w-xl text-gray-400">
          Follow the topics that matter to you and let EventTracker keep an eye
          on the latest updates.
        </p>

        <Link
          to="/signup"
          className="mt-7 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          Create Your Account
        </Link>
      </section>
    </div>
  );
}
