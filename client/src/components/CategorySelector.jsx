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

      return [...new Set([...prev, ...ids])]; // Use Set to avoid duplicates
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          selectedCategories={selectedCategories}
          onCheck={handleCategoryChange}
        />
      ))}
    </div>
  );
}
