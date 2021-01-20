import { createFeatureSelector, createSelector } from '@ngrx/store';
import {khakiStatisticsFeatureKey} from '../index';
import {organizersTablePageableAttributeKey} from './organizers-table-pageable.reducer';

const featureSelector = createFeatureSelector(khakiStatisticsFeatureKey);

export const selectOrganizersTablePageableState = createSelector(
  featureSelector,
  state => state[organizersTablePageableAttributeKey]
);
