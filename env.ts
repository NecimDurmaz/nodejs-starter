/* eslint-disable no-process-env */
import * as dotenv from 'dotenv';
dotenv.config();

export class EnvironmentVariables {
  PORT: number = process.env.PORT ? +process.env.PORT : 8000;
  TIMEOUTDURATION = process.env.TIMEOUTDURATION
    ? +process.env.TIMEOUTDURATION
    : 90_000;
}

let _environmentVariables: EnvironmentVariables;
export const env = <T extends keyof EnvironmentVariables>(
  envName: T
): EnvironmentVariables[T] => {
  if (!_environmentVariables) {
    _environmentVariables = new EnvironmentVariables();
  }
  return _environmentVariables[envName];
};
