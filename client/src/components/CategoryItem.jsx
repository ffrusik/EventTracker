import { useState } from "react";

export default function CategoryItem({
  category,
  onCheck,
  selectedCategories,
}) {
  const [open, setOpen] = useState(false);

  const hasChildren = category.children?.length > 0;
  const isChecked = selectedCategories.includes(category.id);

  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  return (
    <div>
      <div
        className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
          isChecked
            ? "bg-blue-50 text-blue-700"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => onCheck(category)}
            className="h-4 w-4 accent-blue-600"
          />

          <span className="font-medium">{category.name}</span>
        </label>

        {hasChildren && (
          <button
            type="button"
            onClick={toggleOpen}
            className="px-2 text-gray-400 transition hover:text-gray-700"
          >
            {open ? "−" : "+"}
          </button>
        )}
      </div>

      {open && hasChildren && (
        <div className="ml-5 mt-2 space-y-2 border-l border-gray-200 pl-3">
          {category.children.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              onCheck={onCheck}
              selectedCategories={selectedCategories}
            />
          ))}
        </div>
      )}
    </div>
  );
}
