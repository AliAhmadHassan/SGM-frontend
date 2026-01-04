# SGM Frontend (Materials Management System)

Single Page Application that supports a materials management workflow. It covers incoming and outgoing material flows, administration of master data, and authenticated access with role-based permissions. Built as a modular Angular 8 application with shared UI infrastructure and a clean API integration layer.

## Highlights
- Feature modules for Administration, Receivement, Output, Home, and Auth, each with its own routing and pages.
- NgRx state management for auth and shared app state, with effects for initialization, login, and shared setup.
- Centralized HTTP interceptor for JWT injection, loading indicator, and error handling.
- Reusable UI toolkit (generic table/page, modal, dialog, alerts, datepicker, live search, attach file).
- Dockerized production build with Nginx SPA routing and Traefik-ready compose files.

## Domain Areas
- Administration: users, profiles, projects, materials, suppliers, installations, branch offices, addresses, final recipients.
- Receivement: supplier deliveries, transfers between installations, returned materials, third-party materials.
- Output: RMA creation and approval, transfer documents, direct outputs to recipients or temporary custody.
- Shared: permission-based navigation and directives, standardized alerts, loading, and formatting pipes.

## Architecture and Patterns
- Angular module boundaries with lazy-loaded feature routes in `src/app`.
- NgRx Store + Effects (`src/app/auth`, `src/app/shared`) for predictable state transitions.
- Service layer for API communication; models and enums define typed request/response shapes.
- Fluent builders for the generic table/page to keep list pages consistent and configurable.
- Guards and directives enforce authentication and permissions at both routing and UI levels.

## Security and Access Control
- JWT-based authentication with token decoding and storage.
- Auth guard redirects unauthenticated users to login.
- Permission guard and directives restrict access to routes and UI actions.

## Tech Stack
- Angular 8, TypeScript 3.5, RxJS 6
- NgRx Store/Effects, Angular Router, Forms + Reactive Forms
- Bootstrap 4 + ng-bootstrap, ng-select, ngx-mask
- Karma/Jasmine for unit tests, Protractor for e2e

## Delivery and Tooling
- Multi-stage Docker build (Node build image -> Nginx runtime).
- Nginx config uses SPA fallback routing for deep links.
- GitLab CI pipeline for analysis (SonarQube), build, and deployment.
- Docker Compose targets a Traefik network for routing in deploy environments.

## Local Development
```bash
npm install
npm run start
```

## Build
```bash
npm run build
# Environment-specific builds:
# ng build --configuration staging_luxfacta
# ng build --configuration development_luxfacta
```

## Tests
```bash
npm run test
npm run e2e
```

## Project Structure
- `src/app/auth`: login, auth state, interceptors, and guards
- `src/app/administration`: admin master data pages and services
- `src/app/receivement`: inbound material flows
- `src/app/output`: outbound material flows
- `src/app/shared`: shared components, directives, pipes, and state
- `e2e`: end-to-end test scaffolding

## Notes
This repository is the frontend only. It expects a backend API URL configured via environment files in `src/environments`.
