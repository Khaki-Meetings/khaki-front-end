import { createFeatureSelector, createSelector } from '@ngrx/store';
import {khakiStatisticsFeatureKey} from '../index';
import {meetingsTablePageableAttributeKey} from './meetings-table-pageable.reducer';

const featureSelector = createFeatureSelector(khakiStatisticsFeatureKey);

export const selectMeetingsTablePageableState = createSelector(
  featureSelector,
  state => state[meetingsTablePageableAttributeKey]
);
