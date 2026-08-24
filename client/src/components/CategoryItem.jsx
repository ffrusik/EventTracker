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
    <>
      <div className="bg-gray-200 text-gray-800 py-1 px-2 rounded-md text-sm">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheck(category)}
        />
        <span onClick={toggleOpen}>{category.name} </span>
      </div>

      {open && hasChildren && (
        <div className="ml-6">
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
    </>
  );
}
