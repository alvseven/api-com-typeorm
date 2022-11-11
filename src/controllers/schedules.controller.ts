import { Request, Response } from "express";

import {
  createScheduleService,
  listSchedulesByPropertyIdService,
} from "../services/schedules.service";

const createScheduleController = async (req: Request, res: Response) => {
  const { propertyId, date, hour } = req.body;

  const { id } = req.user;

  const newSchedule = await createScheduleService({
    userId: id,
    propertyId,
    date,
    hour,
  });

  return res.status(201).json(newSchedule);
};

const listSchedulesByPropertyIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const schedules = await listSchedulesByPropertyIdService(id);

  return res.status(200).json(schedules);
};

export { createScheduleController, listSchedulesByPropertyIdController };
