import { AppError } from "../error/appError";

import {
  addressesRepository,
  categoriesRepository,
  propertiesRepository,
} from "../repositories";

import {
  IAddressRequest,
  IPropertyRequest,
} from "../interfaces/properties/index";

const createPropertyService = async ({
  value,
  size,
  address,
  categoryId,
}: IPropertyRequest) => {
  const category = await categoriesRepository.findOneBy({
    id: categoryId,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  if (address.zipCode.length > 8) {
    throw new AppError("Invalid zip code");
  }

  if (address.state.length !== 2) {
    throw new AppError("Invalid state");
  }

  const addressAlreadyExists = await addressesRepository.findOneBy({
    number: address.number,
    zipCode: address.zipCode,
  });

  if (addressAlreadyExists) {
    throw new AppError("Address already exists");
  }

  const createNewAdress: IAddressRequest = {
    city: address.city,
    district: address.district,
    state: address.state,
    zipCode: address.zipCode,
    number: address.number,
  };

  const newAddress = await addressesRepository.save(createNewAdress);

  const newProperty = await propertiesRepository.save({
    value,
    size,
    category,
    address: newAddress,
  });

  return newProperty;
};

const listPropertiesService = async () => {
  const properties = propertiesRepository.find();

  return properties;
};

export { createPropertyService, listPropertiesService };
