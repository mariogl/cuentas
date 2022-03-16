require("dotenv").config();
const debug = require("debug")("cuentas-api:server:controllers:categories");
const chalk = require("chalk");
const Category = require("../../database/models/Category");
const createCustomError = require("../utils/errors");

const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json({ categories });
};

const createCategory = async (req, res, next) => {
  const category = req.body;
  try {
    const createdCategory = await Category.create(category);
    res.status(201).json({ category: createdCategory });
  } catch (error) {
    debug(chalk.red(error.message));
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  const category = req.body;
  const { id } = req.params;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, category);
    res.status(200).json({ category: updatedCategory });
  } catch (error) {
    debug(chalk.red(error.message));
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      throw createCustomError("Category not found", 404);
    }
    res.status(200).json({ deleted: "ok" });
  } catch (error) {
    debug(chalk.red(error.message));
    next(error);
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
