import { AppError } from "../error/appError";

import {
  propertiesRepository,
  schedulesRepository,
  userRepository,
} from "../repositories";

import { IScheduleRequest } from "../interfaces/schedules";

const createScheduleService = async ({
  userId,
  propertyId,
  date,
  hour,
}: IScheduleRequest) => {
  const property = await propertiesRepository.findOneBy({
    id: propertyId,
  });

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  const scheduleAlreadyExists = await schedulesRepository.findOneBy({
    hour,
    date,
    property: {
      id: propertyId,
    },
  });

  if (scheduleAlreadyExists) {
    throw new AppError(
      `There is already a schedule for this property at ${date} ${hour}`
    );
  }

  const user = await userRepository.findOneBy({
    id: userId,
  });

  const scheduleDate = new Date(`${date} ${hour}`);
  const scheduleHour = scheduleDate.getHours();
  const scheduleMinutes = scheduleDate.getMinutes();
  const scheduleDay = scheduleDate.getDay();

  if (
    scheduleHour > 18 ||
    scheduleHour < 8 ||
    (scheduleHour === 18 && scheduleMinutes > 0)
  ) {
    throw new AppError("Invalid schedule hour");
  }

  if (scheduleDay === 0 || scheduleDay === 6) {
    throw new AppError("Invalid schedule day");
  }

  await schedulesRepository.save({
    hour,
    date,
    user: user!,
    property: property,
  });

  return {
    message: `Schedule created successfully at ${hour} on ${date}`,
  };
};

const listSchedulesByPropertyIdService = async (id: string) => {
  const schedulesOfProperty = await propertiesRepository.findOne({
    where: { id },
    relations: {
      schedules: {
        user: true,
      },
    },
  });

  if (!schedulesOfProperty) {
    throw new AppError("Schedule of property not found", 404);
  }

  return schedulesOfProperty;
};

export { createScheduleService, listSchedulesByPropertyIdService };
