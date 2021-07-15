import { createFeatureSelector, createSelector } from '@ngrx/store';
import { teamsFeatureKey} from '../index';
import {meetingsTablePageableAttributeKey} from './meetings-table-pageable.reducer';

const featureSelector = createFeatureSelector(teamsFeatureKey);

export const selectMeetingsTablePageableState = createSelector(
  featureSelector,
  state => state[meetingsTablePageableAttributeKey]
);
