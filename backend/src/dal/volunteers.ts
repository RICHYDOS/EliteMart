import { Volunteer } from '../models/volunteers';
import { volunteerInput } from '../models/volunteers';

export const createVolunteer = async (payload: volunteerInput): Promise<volunteerInput> => {
  const volunteer = await Volunteer.create(payload)
  return volunteer;
};

export const findVolunteer = async (email: string ): Promise<volunteerInput|null> => {
  const volunteer = await Volunteer.findOne({email});
  return volunteer;
};
