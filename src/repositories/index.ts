import AppDataSource from "../data-source";

import { Addresses } from "../entities/addresses.entity";
import { Categories } from "../entities/categories.entity";
import { Properties } from "../entities/properties.entity";
import { Schedules } from "../entities/schedules.entity";
import { User } from "../entities/user.entity";

const addressesRepository = AppDataSource.getRepository(Addresses);
const categoriesRepository = AppDataSource.getRepository(Categories);
const propertiesRepository = AppDataSource.getRepository(Properties);
const schedulesRepository = AppDataSource.getRepository(Schedules);
const userRepository = AppDataSource.getRepository(User);

export {
  addressesRepository,
  categoriesRepository,
  propertiesRepository,
  schedulesRepository,
  userRepository,
};
