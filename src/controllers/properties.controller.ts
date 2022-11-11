import { Request, Response } from "express";

import {
  createPropertyService,
  listPropertiesService,
} from "../services/properties.service";

const createPropertyController = async (req: Request, res: Response) => {
  const { value, size, address, categoryId } = req.body;

  const newProperty = await createPropertyService({
    value,
    size,
    address,
    categoryId,
  });

  return res.status(201).json(newProperty);
};

const listPropertiesController = async (req: Request, res: Response) => {
  const properties = await listPropertiesService();
  return res.status(200).json(properties);
};

export { createPropertyController, listPropertiesController };
