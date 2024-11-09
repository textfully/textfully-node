# Textfully Node.js SDK

[![Code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Build](https://github.com/gtfol/textfully-node/actions/workflows/node.yml/badge.svg)
[![codecov](https://codecov.io/gh/gtfol/textfully-node/branch/main/graph/badge.svg)](https://codecov.io/gh/gtfol/textfully-node)
[![npm version](https://badge.fury.io/js/textfully.svg)](https://www.npmjs.com/package/textfully)
[![Node Version](https://img.shields.io/node/v/textfully)](https://www.npmjs.com/package/textfully)

---

The official Node.js SDK for [Textfully](https://textfully.dev) - The Open Source Twilio Alternative.

## Installation

```bash
npm install textfully
# or
yarn add textfully
# or
pnpm add textfully
```

## Setup

First, you need to generate an API key from the [Textfully Dashboard](https://textfully.dev/dashboard/api/keys).

## Quick Start

```ts
import { Textfully } from "textfully";

// Set your API key
const textfully = new Textfully("tx_apikey");

// Send a message
await textfully.send(
  "+16175555555", // verified phone number
  "Hello, world!"
);
```

Check out example implementations in the [examples](./examples) directory.

## Deployment

This repository includes a GitHub Actions workflow that automatically publishes the package to NPM when a new release is created.

To publish a new version:

```sh
# Update version in package.json
npm version patch  # or minor, or major

# Push changes and tags
git push && git push --tags
```

## Contributing

Contributing to the Node.js library is a great way to get involved with the Textfully community. Reach out to us on [Discord](https://discord.gg/Ct6FDCpFBU) or through email at [textfully@gtfol.inc](mailto:textfully@gtfol.inc) if you want to get involved.
