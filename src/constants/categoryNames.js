export const categoryNameMap = {
  '主食': { en: 'RICE/SALAD', ja: '主食' },
  '主菜': { en: 'MAIN', ja: '主菜' },
  '副菜': { en: 'SIDE', ja: '副菜' },
  'ドレッシング': { en: 'DRESSING', ja: 'ドレッシング' },
  'その他': { en: 'EXTRAS', ja: 'その他' },
  'SOUP': { en: 'SOUP', ja: 'スープ' },
  'DRINK': { en: 'DRINK', ja: 'ドリンク' },
};

export const getCategoryNames = (category) => {
  return categoryNameMap[category] || { en: category.toUpperCase(), ja: category };
};