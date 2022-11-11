import { AppError } from "../error/appError";

import { categoriesRepository } from "../repositories";

import { ICategoryRequest } from "../interfaces/categories/index";

const createCategoryService = async ({ name }: ICategoryRequest) => {
  const categoryAlreadyExists = await categoriesRepository.findOneBy({ name });

  if (categoryAlreadyExists) {
    throw new AppError("Category already exists");
  }

  const createdCategory = await categoriesRepository.save({ name });

  return createdCategory;
};

const listCategoriesService = async () => {
  const categories = await categoriesRepository.find();

  return categories;
};

const listPropertiesByCategoryIdService = async (id: string) => {
  const properties = await categoriesRepository.findOne({
    where: { id },
    relations: {
      properties: true,
    },
  });

  if (!properties) {
    throw new AppError("Invalid category id", 404);
  }

  return properties;
};

export {
  createCategoryService,
  listCategoriesService,
  listPropertiesByCategoryIdService,
};
