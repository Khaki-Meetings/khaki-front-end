
export interface EnvironmentBase {
  production: boolean;
  khakiBff?: string;
  gtagConfig?: string;
}

export const defaultEnvironment: EnvironmentBase = {
  production: false,
};
