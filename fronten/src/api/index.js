import ajax from "./ajax.js";

const BASE = "";

// GET category list
export const reqCategorys = parentId =>
  ajax(BASE + "/manage/category/list", { parentId });

// ADD category
export const reqAddCategory = (categoryName, parentId) =>
  ajax(BASE + "/manage/category/add", { categoryName, parentId }, "POST");

// UPDATE category
export const reqUpdateCategory = ({ categoryId, categoryName }) =>
  ajax(BASE + "/manage/category/update", { categoryId, categoryName }, "POST");

// GET PRODUCT LIST WITH PAGE
export const reqProducts = (pageNum, pageSize) =>
  ajax(BASE + "/manage/product/list", { pageNum, pageSize });

/*
SEARCH products (name/description)
searchType: productName/productDesc
 */
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchName,
  searchType
}) =>
  ajax(BASE + "/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName
  });

// GET category 
export const reqCategory = categoryId =>
  ajax(BASE + "/manage/category/info", { categoryId });
