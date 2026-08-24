export default function buildCategoryTree(categories) {
  const map = new Map();
  const roots = [];

  for (const category of categories) {
    map.set(category.id, { ...category, children: [] });
  }

  for (const category of categories) {
    const node = map.get(category.id);

    if (category.parent_id === null) {
      roots.push(node);
    } else {
      map.get(category.parent_id)?.children.push(node); // pushes to roots as well because it's just a linked reference
    }
  }
  return roots;
}
