.PHONY: dev up down logs build db-migrate

dev:
	docker-compose -f docker-compose.yml up -d postgres redis traefik
	@echo "Local infra started. Run 'make api' or 'make web' to run services."

up:
	docker-compose -f docker-compose.yml up -d --build

down:
	docker-compose -f docker-compose.yml down

logs:
	docker-compose -f docker-compose.yml logs -f

build:
	docker-compose -f docker-compose.yml build

api:
	cd apps/api && go run cmd/server/main.go

worker:
	cd apps/worker && go run cmd/worker/main.go

web:
	cd apps/web && pnpm dev

db-migrate:
	@echo "TODO: Add Goose or golang-migrate commands here"
