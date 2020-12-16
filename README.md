
[![Build | Lint | Test](https://github.com/fredmoreira/phone-book-graphql/workflows/Build%20%7C%20Lint%20%7C%20Test/badge.svg)](https://github.com/fredmoreira/phone-book-graphql/actions?query=workflow%3A%22Build+%7C+Lint+%7C+Test%22)
# Chalkboard Challenge - Phone Book GraphQL API 📱📘

A simple GraphQL API for a phone book.

## Requirements
* Docker
* Node
* npm

## Quickstart setup

These instructions will get you a copy of of the project up and running in development mode on your local machine.

Clone repository:

```bash
git clone https://github.com/matheuseabra/chalkboard-phone-book
cd chalkboard-phone-book
```

Install dependencies:

```bash
npm i
```

### Running a MongoDB instance locally with Docker

**If you don't have a local MongoDB instance installed on your machine, run it via a Docker container (must have Docker installed).**

```bash
docker run -d -p 27017:27017 -p 28017:28017 -e AUTH=no mongo
```

### Start the API

```bash
npm run dev
```

Open the browser at http://localhost:4000/ to view the GraphiQL UI.

## Runing tests

```bash
npm test
```

### Lint

```bash
npm run code:lint
```
### Code check

```bash
npm run code:check
```

### Prettier

```bash
npm run code:prettier
```
### Check vulnerabilities in dependencies

```bash
npm run snyk-protect
```

The *precommit* is done by *git hooks* by package [husky](https://github.com/typicode/husky). Whenever a *commit* is done, the following script will be executed:

```bash
npm run code:lint && npm run code:prettier
```

### Continuous Integration

Open the "Actions" tab of this repository to view the CI pipeline for each commit.

## Technologies/tools

* Node.js
* Apollo Server
* GraphQL
* Mongoose
* MongoDB
* supertest
* Mocha
* Chai
* ESLint
* Prettier
* Husky
* snyk
* GitHub Actions

## Lincense
This project is lincensed under the MIT License.