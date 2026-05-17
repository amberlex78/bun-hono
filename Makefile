SHELL := /bin/sh
.DEFAULT_GOAL := help

PROJECT := bun-hono-app
COMPOSE := docker compose -p $(PROJECT)
BASE_FILES := -f docker-compose.yml
DEV_FILES := $(BASE_FILES) -f docker-compose.dev.yml
PROD_FILES := $(BASE_FILES) -f docker-compose.prod.yml

SERVICES := postgres server client nginx

.PHONY: help doctor
.PHONY: dev dev-build dev-up dev-down dev-restart dev-logs dev-ps dev-pull dev-clean
.PHONY: prod prod-build prod-up prod-down prod-restart prod-logs prod-ps prod-pull prod-clean
.PHONY: logs ps stop clean prune

help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "Core:"
	@echo "  make doctor               Check Docker and Docker Compose availability"
	@echo "  make ps                   Show containers (dev + prod project scope)"
	@echo "  make logs s=server        Tail logs for one service (server|client|nginx|postgres)"
	@echo "  make stop                 Stop all project containers"
	@echo "  make clean                Stop all and remove volumes + orphans"
	@echo "  make prune                Docker system prune (dangerous)"
	@echo ""
	@echo "Dev:"
	@echo "  make dev                  Start dev stack (foreground)"
	@echo "  make dev-up               Start dev stack (background)"
	@echo "  make dev-build            Build and start dev stack (foreground)"
	@echo "  make dev-down             Stop dev stack"
	@echo "  make dev-restart          Restart dev stack"
	@echo "  make dev-ps               Show dev containers"
	@echo "  make dev-logs             Tail dev logs (all services or s=<service>)"
	@echo "  make dev-pull             Pull dev images"
	@echo "  make dev-clean            Stop dev stack + remove volumes + orphans"
	@echo ""
	@echo "Prod-like:"
	@echo "  make prod                 Start prod-like stack (background)"
	@echo "  make prod-up              Alias for make prod"
	@echo "  make prod-build           Build and start prod-like stack (background)"
	@echo "  make prod-down            Stop prod-like stack"
	@echo "  make prod-restart         Restart prod-like stack"
	@echo "  make prod-ps              Show prod-like containers"
	@echo "  make prod-logs            Tail prod-like logs (all services or s=<service>)"
	@echo "  make prod-pull            Pull prod-like images"
	@echo "  make prod-clean           Stop prod-like stack + remove volumes + orphans"
	@echo ""
	@echo "Examples:"
	@echo "  make dev-build"
	@echo "  make dev-logs s=nginx"
	@echo "  make prod-build"


doctor:
	@docker --version
	@$(COMPOSE) version

# Generic helpers
ps:
	@$(COMPOSE) $(DEV_FILES) ps || true
	@$(COMPOSE) $(PROD_FILES) ps || true

logs:
	@if [ -n "$(s)" ]; then \
		$(COMPOSE) $(DEV_FILES) logs -f --tail=200 $(s); \
	else \
		$(COMPOSE) $(DEV_FILES) logs -f --tail=200; \
	fi

stop:
	@$(COMPOSE) $(DEV_FILES) stop || true
	@$(COMPOSE) $(PROD_FILES) stop || true

clean:
	@$(COMPOSE) $(DEV_FILES) down -v --remove-orphans || true
	@$(COMPOSE) $(PROD_FILES) down -v --remove-orphans || true

prune:
	@docker system prune -af --volumes

# Dev
dev: doctor
	$(COMPOSE) $(DEV_FILES) up

dev-up: doctor
	$(COMPOSE) $(DEV_FILES) up -d

dev-build: doctor
	$(COMPOSE) $(DEV_FILES) up --build

dev-down:
	$(COMPOSE) $(DEV_FILES) down

dev-restart: dev-down dev-up

dev-ps:
	$(COMPOSE) $(DEV_FILES) ps

dev-logs:
	@if [ -n "$(s)" ]; then \
		$(COMPOSE) $(DEV_FILES) logs -f --tail=200 $(s); \
	else \
		$(COMPOSE) $(DEV_FILES) logs -f --tail=200; \
	fi

dev-pull:
	$(COMPOSE) $(DEV_FILES) pull

dev-clean:
	$(COMPOSE) $(DEV_FILES) down -v --remove-orphans

# Prod-like
prod: doctor
	$(COMPOSE) $(PROD_FILES) up -d

prod-up: prod

prod-build: doctor
	$(COMPOSE) $(PROD_FILES) up --build -d

prod-down:
	$(COMPOSE) $(PROD_FILES) down

prod-restart: prod-down prod-up

prod-ps:
	$(COMPOSE) $(PROD_FILES) ps

prod-logs:
	@if [ -n "$(s)" ]; then \
		$(COMPOSE) $(PROD_FILES) logs -f --tail=200 $(s); \
	else \
		$(COMPOSE) $(PROD_FILES) logs -f --tail=200; \
	fi

prod-pull:
	$(COMPOSE) $(PROD_FILES) pull

prod-clean:
	$(COMPOSE) $(PROD_FILES) down -v --remove-orphans
