import ajax from './ajax.js';

const BASE=''

// GET category list
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', {parentId})

// ADD category
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')

// UPDATE category
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')