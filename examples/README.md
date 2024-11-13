# Textfully Examples

This directory contains example implementations of the Textfully Node.js SDK.

## Prerequisites

1. Install packages:

```sh
npm install
# or
yarn install
# or
pnpm install
# or
bun install
# or
deno install
```

2. Generate an API key from the [Textfully Dashboard](https://textfully.dev/dashboard/api/keys)

3. Create a `.env` file in the examples directory by copying `.env.example`:

```sh
cp .env.example .env
```

4. Update the `.env` file with your API key from step 2:

```sh
TEXTFULLY_API_KEY=your-textfully-api-key
```

5. Update the `toNumber` variable in `sendText.ts` with your verified phone number:

```ts
const toNumber = "your-verified-phone-number"; // Include international code (e.g. +1 for US/Canada)
```

### Running the Example

```sh
npx ts-node sendText.ts
```
