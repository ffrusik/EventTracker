import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import z from "zod";

import { createEvent, getCategories } from "../util/http";
import buildCategoryTree from "../util/buildCategoryTree";

import Label from "./Label";
import Input from "./Input";
import CategorySelector from "./CategorySelector";

// Define Zod schemas for validation
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
  console.log(allCategories);

  const mutation = useMutation({
    mutationFn: createEvent,
  });

  function handleClose() {
    refDialog.current.close();
  }

  function createEventAction(formData) {
    const enteredEventName = formData.get("name")?.trim();

    const result = eventSchema.safeParse({ name: enteredEventName });

    if (!result.success) {
      console.log(result.error);
      setErrors(result.error.issues);
      return;
    }

    mutation.mutate(
      { eventName: result.data.name, categories: selectedCategories },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["events"] });

          refDialog.current.close();
        },
      },
    );
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-2">Create Event</h2>
      <form action={createEventAction}>
        <div className="mb-2">
          <Label htmlFor="name">Event Name</Label>
          <Input id="name" name="name" type="text" placeholder="Event Name" />
          <Label className="mt-2">Categories</Label>
          <CategorySelector
            categories={buildCategoryTree(allCategories || [])}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-1 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Subscribing..." : "Subscribe to an event"}
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-1 rounded focus:outline-none focus:shadow-outline"
            onClick={handleClose}
          >
            Close
          </button>
        </div>

        {mutation.isError && (
          <div className="mt-2">
            <p className="text-red-500">
              {mutation.error.message || "An error occurred."}
            </p>
          </div>
        )}
        {errors.length > 0 && (
          <div className="mt-2">
            {errors.map((error, index) => (
              <p key={index} className="text-red-500">
                {error.message}
              </p>
            ))}
          </div>
        )}
      </form>
    </>
  );
}
