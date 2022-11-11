import { Request, Response } from "express";

import {
  createCategoryService,
  listCategoriesService,
  listPropertiesByCategoryIdService,
} from "../services/categories.service";

const createCategoryController = async (req: Request, res: Response) => {
  const { name } = req.body;

  const newCategory = await createCategoryService({ name });

  return res.status(201).json(newCategory);
};

const listCategoriesController = async (req: Request, res: Response) => {
  const categories = await listCategoriesService();

  return res.status(200).json(categories);
};

const listPropertiesByCategoryIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const properties = await listPropertiesByCategoryIdService(id);

  return res.status(200).json(properties);
};

export {
  createCategoryController,
  listCategoriesController,
  listPropertiesByCategoryIdController,
};
