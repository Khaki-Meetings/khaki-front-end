
export interface EnvironmentBase {
  production: boolean;
  uiOnly: boolean;
  khakiBff?: string;
}

export const defaultEnvironment: EnvironmentBase = {
  production: false,
  uiOnly: true
};
