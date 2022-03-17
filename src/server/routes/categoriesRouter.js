const express = require("express");
const { validate } = require("express-validation");
const {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categories");
const { categorySchema } = require("../schemas/categoriesSchemas");

const categoriesRouter = express.Router();

categoriesRouter.get("/", getCategories);
categoriesRouter.post("/", validate(categorySchema), createCategory);
categoriesRouter.put("/:id", validate(categorySchema), updateCategory);
categoriesRouter.delete("/:id", deleteCategory);

module.exports = categoriesRouter;
