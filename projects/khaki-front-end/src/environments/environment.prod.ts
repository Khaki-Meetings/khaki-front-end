import {defaultEnvironment} from './environment-base';
import {CurrentLogLevel, LogLevel} from '@natr/historian';

CurrentLogLevel.LOG_LEVEL = LogLevel.FATAL;

export const environment = {
  ...defaultEnvironment,
  khakiBff: 'https://khaki-production-api.herokuapp.com',
  production: true
};
