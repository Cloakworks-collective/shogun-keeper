# Acurast App that acts as Shogun's Decentralized Keeper

This project acts as decentralized keeper for shogun game. It calls `tick_tick()` public entry function

## App Runtime Environment

Acurast processors run **Node.js v18.17.1**.

It's important to ensure that any app deployed to the processors is compatible with this version of Node.js. Please make sure that your apps adhere to this requirement to ensure proper execution within the Acurast environment.

## Overview

The project is a simple [TypeScript](https://www.typescriptlang.org/) app that depends on the [aptos-ts-sdk](https://github.com/aptos-labs/aptos-ts-sdk) library. It uses [webpack](https://webpack.js.org/) to transpile TypeScript to JavaScript and bundle the code with its dependencies so that it can be deployed on Acurast processors.

#### Files
- `src/index.ts`: main file

## Usage

To deploy the app:

1. Set your API endpoint in `src/index.ts` by replacing the placeholder:
```typescript
const KEEPER_PK = 'KEEPER_PRIVATE_KEY_HERE';
```

The app will use this wallet to send transacion to Shogun Smart Contract. - We need to make sure that this account has APT tokens for gas fees.


2. Bundle the project:
```bash
$ npm run bundle
```

3. Navigate to `./dist` and copy the contents of `index.bundle.js`.

4. Use the copied content to create an Acurast deployment with [Acurast Console](https://console.acurast.com/).

