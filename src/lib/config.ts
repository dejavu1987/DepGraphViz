const customTagsMap = localStorage.getItem('depGraphViz.tagsMap') || '{}';
const customCategoryMap =
  localStorage.getItem('depGraphViz.categoryMap') || '{}';

export const tagsMap: { [key: string]: [string, string?] } = {
  magento: ['Magento', 'orangered'],
  drupal: ['Drupal', '#139ddd'],
  backend: ['Backend', '#444'],
  ...JSON.parse(customTagsMap),
};

export const categoryMap: { [key: string]: [string, string?] } = {
  factory: ['factory', '#980034'],
  provider: ['provider', '#003775'],
  builder: ['builder', '#653211'],
  transformer: ['transformer', '#13655d'],
  datasource: ['datasource', '#464'],
  service: ['service', '#4a4'],
  resolver: ['resolver', '#838'],
  logger: ['logger', '#000'],
  ...JSON.parse(customCategoryMap),
};
