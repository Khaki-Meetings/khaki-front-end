import { createFeatureSelector, createSelector } from '@ngrx/store';
import {khakiStatisticsFeatureKey} from '../index';
import {organizersTablePageableFeatureKey} from './organizers-table-pageable.reducer';

const featureSelector = createFeatureSelector(khakiStatisticsFeatureKey);

export const selectOrganizersTablePageableState = createSelector(
  featureSelector,
  state => state[organizersTablePageableFeatureKey]
);
