import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import z from "zod";

import { createEvent, getCategories } from "../util/http";
import buildCategoryTree from "../util/buildCategoryTree";

import Label from "./Label";
import Input from "./Input";
import CategorySelector from "./CategorySelector";

const eventSchema = z.object({
  name: z.string().min(1).max(255),
});

export default function CreateEventForm({ refDialog }) {
  const [errors, setErrors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const queryClient = useQueryClient();

  const { data: allCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const mutation = useMutation({
    mutationFn: createEvent,
  });

  function handleClose() {
    refDialog.current.close();
  }

  function createEventAction(formData) {
    setErrors([]);

    const enteredEventName = formData.get("name")?.trim();

    const result = eventSchema.safeParse({
      name: enteredEventName,
    });

    if (!result.success) {
      setErrors(result.error.issues);
      return;
    }

    mutation.mutate(
      {
        eventName: result.data.name,
        categories: selectedCategories,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["events"] });
          refDialog.current.close();
        },
      },
    );
  }

  return (
    <div className="w-full max-w-lg p-2">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          New Subscription
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          Create an Event
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Choose a topic you want EventTracker to keep an eye on.
        </p>
      </div>

      <form action={createEventAction}>
        <div className="space-y-5">
          <div>
            <Label htmlFor="name">Event Name</Label>

            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. React 20"
            />
          </div>

          <div>
            <Label>Categories</Label>

            <p className="mb-3 text-sm text-gray-500">
              Select categories related to your event.
            </p>

            <CategorySelector
              categories={buildCategoryTree(allCategories || [])}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
        </div>

        {errors.length > 0 && (
          <div className="mt-5 rounded-lg bg-red-50 px-4 py-3">
            {errors.map((error, index) => (
              <p key={index} className="text-sm text-red-600">
                {error.message}
              </p>
            ))}
          </div>
        )}

        {mutation.isError && (
          <div className="mt-5 rounded-lg bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">
              {mutation.error.message || "An error occurred."}
            </p>
          </div>
        )}

        <div className="mt-7 flex justify-end gap-3 border-t border-gray-200 pt-5">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg px-4 py-2 font-medium text-gray-600 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {mutation.isPending ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </form>
    </div>
  );
}
