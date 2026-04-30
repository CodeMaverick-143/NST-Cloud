# NST-Cloud

NST-Cloud is a self-hosted internal deployment platform for NST that allows students to deploy applications on the college server through a web interface instead of manually handling ports, reverse proxy rules, and server process management. The platform is designed to feel similar to Railway or Render for internal college use, while keeping control of compute, routing, security, and operational policies inside the institute.

The core idea is simple: a student signs in, connects a GitHub repository or enters deployment details, configures build and start settings, and NST-Cloud deploys the application to the NST server. The system then assigns internal runtime configuration, provisions a public route through a reverse proxy, tracks deployment status, and keeps the service running with restart policies and health checks.

## Objectives

- Remove the need for students to manually manage ports.
- Remove the need for students to write Nginx configuration.
- Standardize application deployment on the NST server.
- Provide a GitHub-connected deployment flow.
- Keep student backends running reliably without sleep-based shutdown behavior.
- Add admin controls for quotas, auditability, and operational safety.
- Make deployment simple enough for non-DevOps users.

## Core Use Case

A student wants to deploy a project to the college server.

Instead of doing the following manually:
- SSH into the server
- Clone the repository
- Install dependencies
- Find an open port
- Start the process
- Write reverse proxy rules
- Restart services after crashes
- Diagnose deployment errors from raw terminal logs

The student will use NST-Cloud to:
- Sign in
- Create a new project
- Connect GitHub or provide repository details
- Choose runtime settings
- Add environment variables
- Click Deploy
- Receive a live URL and logs from the dashboard

## Product Scope

NST-Cloud is an internal platform-as-a-service for NST.

### Supported responsibilities

- Authentication and user onboarding
- GitHub integration
- Project creation and deployment configuration
- Deployment queue and build pipeline
- Runtime provisioning using containers
- Reverse proxy routing and subdomain management
- Logs, health checks, and restarts
- Admin controls for governance and safety

### Non-goals for the first version

- Kubernetes
- Multi-region deployment
- Complex service meshes
- Automatic database provisioning for all students
- Production-grade autoscaling
- Billing system
- Team collaboration workflows
- Full enterprise CI/CD feature parity

## High-Level Architecture

NST-Cloud is split into three major layers:

1. User layer
2. Control layer
3. Runtime layer

### 1. User layer

This is the interface used by students and administrators.

It includes:
- Web dashboard
- Login and account management
- Project creation flow
- Deployment form
- Build logs and runtime logs
- Project settings
- Admin controls

### 2. Control layer

This is the internal brain of the system.

It includes:
- API server
- Authentication service
- GitHub OAuth handler
- Webhook receiver
- Deployment queue
- Worker service
- Project metadata storage
- Audit logging

### 3. Runtime layer

This is where user applications actually run.

It includes:
- Docker engine
- Per-project containers
- Reverse proxy such as Traefik
- Internal Docker networks
- Health checks
- Restart policies
- Resource limits

## Recommended Deployment Model

The recommended first version is to host the NST-Cloud backend and worker on the same NST server that will run deployed student applications.

This simplifies the architecture because:
- The platform backend can directly control Docker locally.
- There is no need to expose the Docker daemon remotely.
- There is no need to use SSH for each deployment action.
- Runtime and control remain in the same trusted environment.

The platform should interact with Docker through the local Unix socket on the NST server using controlled server-side access.

## How Deployment Works

When a student submits deployment details, the system should follow this sequence:

1. Student signs in to NST-Cloud.
2. Student creates a project.
3. Student connects GitHub or provides repository information.
4. Student selects branch, build command, start command, runtime, and environment variables.
5. The API stores the project configuration in the database.
6. The API creates a deployment job.
7. The worker picks the deployment job from the queue.
8. The worker fetches the repository source code.
9. The worker builds a container image.
10. The worker starts a container with internal networking and runtime policies.
11. The reverse proxy exposes the application on a subdomain.
12. Health checks verify that the service is working.
13. Logs and deployment status are shown in the dashboard.

## Suggested Features

### Student-facing features

- Sign up and login
- Connect GitHub account
- Import repository
- Create deployment project
- Choose branch
- Select runtime preset
- Define build command
- Define start command
- Add environment variables
- Trigger deploy and redeploy
- View deployment history
- View build logs
- View runtime logs
- Restart service
- Stop service
- Delete project
- View public URL

### Admin-facing features

- Approve users or restrict access to NST members
- Set maximum projects per student
- Set CPU and memory quotas
- Set storage quotas
- Monitor deployments
- Suspend abusive or broken projects
- View audit logs
- Inspect server resource usage
- Manage wildcard subdomain configuration
- Manage runtime presets and templates

## Suggested Technology Stack

### Frontend

- Next.js
- React
- Tailwind CSS
- TypeScript

### Backend

- Node.js
- Express.js or NestJS
- TypeScript

### Infrastructure

- Docker
- Docker Compose
- Traefik or Nginx
- PostgreSQL
- Redis

### Integrations

- GitHub OAuth
- GitHub Webhooks

### Optional future improvements

- Background workers using BullMQ
- OpenTelemetry for observability
- Prometheus and Grafana for metrics

## Suggested File Structure

```text
nst-cloud/
├── README.md
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── turbo.json
├── apps/
│   ├── web/
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── login/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── projects/
│   │   │   │   └── admin/
│   │   │   ├── components/
│   │   │   ├── lib/
│   │   │   └── styles/
│   │   └── public/
│   ├── api/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── app.ts
│   │   │   ├── config/
│   │   │   ├── modules/
│   │   │   │   ├── auth/
│   │   │   │   ├── users/
│   │   │   │   ├── projects/
│   │   │   │   ├── deployments/
│   │   │   │   ├── github/
│   │   │   │   ├── logs/
│   │   │   │   ├── health/
│   │   │   │   └── admin/
│   │   │   ├── middleware/
│   │   │   ├── utils/
│   │   │   └── types/
│   └── worker/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── index.ts
│           ├── jobs/
│           ├── docker/
│           ├── github/
│           ├── health/
│           └── utils/
├── packages/
│   ├── ui/
│   ├── config/
│   ├── types/
│   └── eslint-config/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── infra/
│   ├── traefik/
│   │   ├── traefik.yml
│   │   └── dynamic/
│   ├── docker/
│   ├── scripts/
│   │   ├── deploy-project.sh
│   │   ├── cleanup-project.sh
│   │   ├── stream-logs.sh
│   │   └── health-check.sh
│   └── templates/
│       ├── node/
│       ├── python/
│       ├── static/
│       └── nextjs/
└── docs/
    ├── architecture.md
    ├── api.md
    ├── deployment-flow.md
    ├── security.md
    └── operations.md
```

## Folder Responsibilities

### `apps/web`
Contains the main dashboard UI for students and admins.

### `apps/api`
Contains the backend API, authentication logic, GitHub integration, webhook handlers, project management logic, and deployment orchestration endpoints.

### `apps/worker`
Contains background job processing for deployments, redeployments, health checks, cleanup, and log aggregation.

### `packages/ui`
Contains shared UI components used across the web app.

### `packages/config`
Contains shared config helpers, runtime constants, and environment validation.

### `packages/types`
Contains shared TypeScript types and interfaces.

### `prisma`
Contains the database schema and migrations.

### `infra`
Contains deployment, reverse proxy, runtime templates, and operational scripts.

### `docs`
Contains additional technical and operational documentation.

## Core Data Models

The project should include at least the following entities.

### User
- id
- name
- email
- role
- githubId
- createdAt
- updatedAt

### Project
- id
- userId
- name
- slug
- repoUrl
- branch
- runtime
- buildCommand
- startCommand
- rootDirectory
- publicDomain
- internalPort
- status
- createdAt
- updatedAt

### Deployment
- id
- projectId
- commitSha
- triggerType
- status
- startedAt
- finishedAt
- logsPath
- imageTag
- containerId

### EnvironmentVariable
- id
- projectId
- key
- valueEncrypted
- createdAt

### ServerQuota
- id
- userId
- cpuLimit
- memoryLimit
- storageLimit
- maxProjects

### AuditLog
- id
- actorId
- projectId
- action
- metadata
- createdAt

## API Design

The backend should expose clear and limited APIs.

### Auth
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/session`
- `GET /auth/github/connect`
- `GET /auth/github/callback`

### Projects
- `GET /projects`
- `POST /projects`
- `GET /projects/:id`
- `PATCH /projects/:id`
- `DELETE /projects/:id`

### Deployments
- `POST /projects/:id/deploy`
- `POST /projects/:id/redeploy`
- `GET /projects/:id/deployments`
- `GET /deployments/:id`
- `GET /deployments/:id/logs`
- `POST /deployments/:id/restart`
- `POST /deployments/:id/stop`

### GitHub
- `POST /github/webhook`
- `GET /github/repos`

### Admin
- `GET /admin/users`
- `PATCH /admin/users/:id/quota`
- `PATCH /admin/projects/:id/suspend`
- `GET /admin/audit-logs`
- `GET /admin/server-metrics`

## Runtime Presets

To reduce risk and improve user experience, NST-Cloud should support templates instead of fully unrestricted command execution for the initial version.

### Node.js preset
- Detect `package.json`
- Build using `npm install && npm run build` if build script exists
- Start using `npm start` or custom start command

### Python preset
- Detect `requirements.txt` or `pyproject.toml`
- Install dependencies
- Start using a defined command such as `gunicorn app:app` or `python main.py`

### Static site preset
- Build project if needed
- Serve generated static output through a lightweight web server such as Nginx

### Next.js preset
- Install dependencies
- Build with `next build`
- Start with `next start`

## Security Requirements

NST-Cloud runs untrusted user workloads, so security must be a first-class concern.

### Minimum security practices

- Run each student application in its own container.
- Do not run containers as root unless absolutely required.
- Apply CPU, memory, and storage limits.
- Separate internal networking from public ingress.
- Never expose raw internal ports publicly.
- Store environment variables securely.
- Validate GitHub webhooks.
- Maintain audit logs for deployment actions.
- Restrict admin actions through role-based access control.
- Sanitize all user-provided deployment settings.

### Operational guardrails

- Limit maximum number of active applications per user.
- Require health endpoint support for backend presets.
- Automatically restart failed containers with sensible restart policies.
- Mark repeated crash loops as failed deployments.
- Support manual suspension by admins.

## Reliability Requirements

To prevent student backends from sleeping or disappearing unexpectedly, the system should include:

- Long-running containers
- Docker restart policies
- Health checks
- Reverse proxy routing
- Runtime status tracking
- Deployment history
- Failure detection and restart rules

## Logging and Monitoring

NST-Cloud should provide at least the following operational visibility:

- Build logs
- Runtime logs
- Deployment events
- Health check status
- CPU and memory usage per project
- Admin-level system overview

Recommended future improvements:
- Metrics dashboards
- Alerting for repeated failures
- Container lifecycle analytics

## Environment Variables

An example `.env.example` should include variables such as:

```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/nst_cloud
REDIS_URL=redis://localhost:6379
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_WEBHOOK_SECRET=
SESSION_SECRET=
ENCRYPTION_KEY=
DOCKER_SOCKET_PATH=/var/run/docker.sock
TRAEFIK_DOMAIN=nstcloud.local
WILDCARD_BASE_DOMAIN=apps.nstcloud.local
```

## Local Development Setup

### Prerequisites

- Node.js
- pnpm or npm
- Docker
- Docker Compose
- PostgreSQL
- Redis

### Steps

1. Clone the repository.
2. Copy `.env.example` to `.env`.
3. Install dependencies.
4. Start PostgreSQL and Redis.
5. Start the API server.
6. Start the worker.
7. Start the web application.
8. Start Traefik if testing full deployment locally.

## Example Development Commands

```bash
git clone <repo-url>
cd nst-cloud
pnpm install
cp .env.example .env
pnpm dev
```

If using multiple apps in a monorepo:

```bash
pnpm --filter web dev
pnpm --filter api dev
pnpm --filter worker dev
```

## Docker Compose Responsibilities

The root `docker-compose.yml` can be used to boot local infrastructure such as:

- PostgreSQL
- Redis
- Traefik
- API service
- Worker service
- Web service

This helps contributors run the whole stack locally.

## Deployment Strategy for NST Server

A typical initial production deployment can look like this:

- Deploy NST-Cloud web, API, worker, database, Redis, and Traefik on the NST server.
- Connect the API and worker to the local Docker engine.
- Use Traefik for wildcard subdomain routing.
- Store logs and deployment metadata persistently.
- Restrict platform access to NST-approved users.

## Example Student Deployment Lifecycle

A student creates a project called `my-api`.

NST-Cloud should:
- Save project settings
- Build a runtime image
- Start the container on a private network
- Assign or detect the internal service port
- Create routing for `my-api.apps.nstcloud.local`
- Monitor health
- Show deployment status in dashboard

## Known Risks

- Arbitrary command execution can be abused.
- Unrestricted container permissions can affect the host.
- Excessive student workloads can exhaust server resources.
- Misconfigured environment variables can break deployments.
- Improper webhook validation can trigger unauthorized deployments.
- Weak admin controls can make abuse hard to contain.

## First Version Priorities

The first version should focus on the following:

1. Authentication
2. GitHub integration
3. Project creation
4. Deployment queue
5. Container build and run
6. Reverse proxy routing
7. Logs and status tracking
8. Health checks
9. Admin quotas
10. Documentation and operations

## Future Roadmap

Possible future improvements include:

- Preview deployments per branch
- Team workspaces
- Managed database add-ons
- One-click templates
- Usage analytics
- Better rollback support
- Persistent storage per project
- CLI for advanced users
- Auto-detected framework configuration

## Suggested Initial Documentation in `docs/`

### `docs/architecture.md`
Should explain the control plane, runtime layer, reverse proxy model, and deployment flow.

### `docs/api.md`
Should document all REST endpoints, request shapes, response shapes, and auth rules.

### `docs/deployment-flow.md`
Should explain how project creation, repo fetch, build, run, and routing work.

### `docs/security.md`
Should document multi-tenant safety rules, permissions, webhook validation, and secret management.

### `docs/operations.md`
Should explain monitoring, restart policy behavior, cleanup jobs, quota management, and failure handling.

## Contribution Guidelines

Contributors should:
- Follow the project folder structure.
- Keep deployment logic in the worker or infrastructure layer.
- Avoid placing runtime orchestration logic inside UI components.
- Write clear types and validation for project settings.
- Document infrastructure changes under `docs/`.
- Add tests for deployment-critical flows where possible.

## Naming Conventions

- Repository name: `nst-cloud`
- Product name: `NST-Cloud`
- Project slugs: lowercase and hyphen-separated
- Domains: `<project-slug>.<base-domain>`
- Internal services: predictable and machine-readable names

## License

Choose a license based on whether NST-Cloud will remain internal or become open source.

Examples:
- MIT for open source flexibility
- Apache-2.0 for patent clarity
- Proprietary for internal institute-only control

## Summary

NST-Cloud is an internal deployment platform for NST that simplifies student app hosting on a shared college server. It provides a controlled interface for repository-based deployment, containerized runtime management, automated routing, logs, health checks, and admin governance.

The project should prioritize safety, simplicity, reliability, and maintainability over infrastructure complexity in the first version.
