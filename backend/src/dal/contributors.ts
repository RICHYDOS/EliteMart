import { Document } from 'mongoose';
import { Contributor } from '../models/contributors';
import { contibutorInput } from '../models/contributors';

export const createContributor = async (payload: contibutorInput): Promise<Document> => {
  const contributor = await Contributor.create(payload)
  return contributor;
};

export const findContributor = async (query: { email: string }): Promise<Document|null> => {
  const contributor = await Contributor.findOne({
    query
  });
  return contributor;
};

export const updateContributor = async (payload: contibutorInput, query: { email: string } | { id: string }): Promise<void> => {
  await Contributor.findOneAndUpdate(query, payload, {new: true});
};

export const deleteContributor = async (query: { email: string } | { id: string }): Promise<void> => {
  await Contributor.deleteOne({query});
};