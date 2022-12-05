# Getting Started

## Before the start
You need to add a `/packages/client/src/keys` folder containing the `index.ts` to your project

### `index.ts`:
````
type KeysTypes = {
    API: string,
    localStorageName: string
};

export const keys: KeysTypes = {
  API: '00000000-0000-0000-0000-000000000000',
  localStorageName: 'storageName',
};
````

## Start
`yarn start` in the root folder to start the project

