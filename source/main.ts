export * as Filter from './Domain/Filter';
export * as Update from './Domain/Update';
import { filter as filterFunction } from './Domain/Filter';
import { update as updateFunction } from './Domain/Update';

export const filter = filterFunction;
export const update = updateFunction;
