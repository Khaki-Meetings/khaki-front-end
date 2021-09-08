# KhakiFrontEnd
## _The Khaki Web Application_

The front end is an Angular application. Connect to the API to use.

## Environment

Environment settings can be found in
```
khaki-front-end/src/environments
```

By default, ```environment.ts``` will be used. To change this, use ```KHAKI_ENV_CONFIG```.

## Development Setup

Run
```
yarn run watch-all-modules
```

You'll need to wait for that to finish compiling the modules. Once it's complete, in a separate shell, run
```shell
ng serve
```
to use the API or
```shell
yarn run serve-ui-with-mock
```
to use the mock.

## Development Process

Each project has a build watch, so running ```ng serve``` in one terminal and any of these (or a combination of them) in other terminals will facilitate ongoing development. These can be found in ```package.json```.

```
yarn run build-common-with-watch
yarn run build-statistics-with-watch
yarn run build-profile-with-watch
yarn run build-settings-with-watch
yarn run build-info-with-watch
yarn run build-admin-with-watch
yarn run build-teams-with-watch
```

## Modules

| Module | Purpose |
| ------ | ------ |
| Common | common functions, components, etc |
| Statistics | the main page |
| Profile | profile information |
| Settings | configuration for the organization: team members, teams, etc... |
| Info | not in use |
| Admin | functions for Khaki administrators |
| Teams | analysis for the current team |
