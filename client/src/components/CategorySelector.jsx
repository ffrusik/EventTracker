import CategoryItem from "./CategoryItem";

export default function CategorySelector({
  categories,
  selectedCategories,
  setSelectedCategories,
}) {
  function getAllCategoryIds(category) {
    const ids = [category.id];

    if (category.children) {
      for (const child of category.children) {
        ids.push(...getAllCategoryIds(child));
      }
    }

    return ids;
  }

  function handleCategoryChange(category) {
    const ids = getAllCategoryIds(category);

    setSelectedCategories((prev) => {
      const isChecked = prev.includes(category.id);

      if (isChecked) {
        return prev.filter((id) => !ids.includes(id));
      }

      return [...new Set([...prev, ...ids])];
    });
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
      <div className="space-y-2">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            selectedCategories={selectedCategories}
            onCheck={handleCategoryChange}
          />
        ))}
      </div>
    </div>
  );
}
