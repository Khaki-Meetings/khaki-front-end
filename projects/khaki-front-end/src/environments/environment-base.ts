
export interface EnvironmentBase {
  production: boolean;
  khakiBff?: string;
}

export const defaultEnvironment: EnvironmentBase = {
  production: false,
};
