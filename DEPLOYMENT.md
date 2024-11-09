# Deployment Guide

## Prerequisites

- NPM account with login (`npm login`)
- Write access to the NPM package

## Publishing Steps

1. Update and test:

```sh
git pull origin main
npm test
```

2. Bump version:

```sh
npm version patch  # for bug fixes (0.0.X)
npm version minor  # for new features (0.X.0)
npm version major  # for breaking changes (X.0.0)
```

3. Push to GitHub:

```sh
git push && git push --tags
```

GitHub Actions will automatically run tests and publish to NPM.
