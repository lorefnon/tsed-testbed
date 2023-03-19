# About

This mini-project illustrates end-to-end integration of following technologies:

- [Koa](https://www.npmjs.com/package/koa) - HTTP Middleware Framework for Node.js
- [Ts.ED](https://tsed.io) - High level server side API framework
- [OpenAPI](https://www.openapis.org) - For contract driven RESTful API Development
- [Sqlite](https://www.sqlite.org/index.html) - self-contained embedded database engine
- [ts-sql-query](ts-sql-query.readthedocs.io) - type-safe data mapper for relational databases
- [Jotai](https://jotai.org) - Client side state management
- [React](https://react.dev) - UI management library
- [Antd](https://ant.design) - UI Component library
- [Vite](vitejs.dev/guide/) - Asset bundling
- [Typescript](https://www.typescriptlang.org) - One language to bind them all

# Running the application

A tar archive of docker image is attached in the Releases section. This can be loaded in a docker server through [docker load](https://docs.docker.com/engine/reference/commandline/load/) command.

# Architecture

- Both client side and server side code are implemented in typescript
- API server is stateless and exposes a RESTful API
- OpenAPI specification is generated from decorators applied on controllers, and acts as API contract.
- Typesafe API client is generated from this OpenAPI spec for use in client
- For database access we use a repository pattern
- Repositories abstract persistence details, and use a type-safe query builder to access the database

# Development workflow

### Database setup

First run:

```
cd modules/server
npm install
npm run db:setup # Bootstraps sqlite database
```

For updating schema:

- Append idempotent DDL statements to config/db/setup.sql
- Run `npm run db:setup`
- Ensure [tbls](https://github.com/k1LoW/tbls) is installed and present in path
- Run `npm run db:schema:dump` - Dumps database schema as a yaml file
- Run `npm run db:codegen` - Uses dumped schema to generate type-safe mappers for database access

## API server

```
cd modules/server
npm run dev # Runs development server - auto reloads on changes
npm run test # Runs unit/integration tests
```

Access swagger ui at `http://localhost:8083/doc` to test the API.

## Client side

```
cd modules/client
npm install
npm run dev # Runs vite dev server - auto reloads on changes
```

Access application ui at `http://localhost:5173/`.

There is generally no need to restart servers manually.

# Deployment

```
cd modules/client
npm run build
cd ../server
npm run build
docker build
# Use any docker compatible tools eg. AWS ECS, K8s etc.
```
