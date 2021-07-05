import { categoryMap, tagsMap } from './config';

export const extractTags = (name: string): [string, string?][] => {
  let tags = [];
  for (let pattern in tagsMap) {
    if (name.match(new RegExp(pattern, 'i'))) {
      tags.push(tagsMap[pattern]);
    }
  }

  return tags;
};

export const extractCategories = (name: string): [string, string?][] => {
  let categories = [];
  for (let pattern in categoryMap) {
    if (name.match(new RegExp(pattern, 'i'))) {
      categories.push(categoryMap[pattern]);
    }
  }

  return categories;
};
