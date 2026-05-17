SHELL := /bin/sh

DOCKER_DEV  = docker compose -f docker-compose.yml -f docker-compose.dev.yml
DOCKER_PROD = docker compose -f docker-compose.yml -f docker-compose.prod.yml

# Змінна для вказівки конкретного сервісу, наприклад: make dev-logs s=php
s ?=

.PHONY: help dev-up dev-build dev-down dev-restart restart dev-logs prod-up prod-build prod-down prod-logs clean clean-all

help: ## Показати цю довідку
	@grep -E '(^[a-zA-Z0-9\./_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —————————————————————————————————————————————————————————————————————————————
## DEVELOPMENT (Local)
## —————————————————————————————————————————————————————————————————————————————
dev-up: ## Підняти проект
	$(DOCKER_DEV) up

dev-down: ## Зупинити проект
	$(DOCKER_DEV) down --remove-orphans

dev-build: ## Зібрати образи для розробки
	$(DOCKER_DEV) down --remove-orphans
	$(DOCKER_DEV) build $(s)
	$(DOCKER_DEV) up

dev-restart: dev-down dev-up ## Перезапуск проекту

restart: dev-restart ## Перезапуск проекту (alias)

dev-logs: ## Перегляд логів у реальному часі
	$(DOCKER_DEV) logs -f --tail=200 $(s)


## —————————————————————————————————————————————————————————————————————————————
## PRODUCTION (Deployment)
## —————————————————————————————————————————————————————————————————————————————
prod-up: ## Підняти проект
	$(DOCKER_PROD) up --detach

prod-down: ## Зупинити проект
	$(DOCKER_PROD) down --remove-orphans

prod-build: ## Зібрати образи та оновити продакшн без довгого простою
	$(DOCKER_PROD) build $(s)
	$(DOCKER_PROD) up --detach --remove-orphans

db-push: ## Синхронізувати схему БД (Drizzle)
	$(DOCKER_DEV) exec server bun run db:push

prod-logs: ## Перегляд логів у реальному часі
	$(DOCKER_PROD) logs -f --tail=200 $(s)


## —————————————————————————————————————————————————————————————————————————————
## SYSTEM / CLEANUP
## —————————————————————————————————————————————————————————————————————————————
clean-cache: ## Очистити кеш збірки Docker (безпечно)
	@docker builder prune -f

prune: ## ПОВНЕ ОЧИЩЕННЯ (Dev): видаляє локальні образи та volume (БД)
	@printf "\033[31mУВАГА: Це видалить дані БД розробки. Ви впевнені? [y/N]\033[0m "
	@read ans && if [ "$${ans:-N}" = "y" ] || [ "$${ans:-N}" = "Y" ]; then \
		$(DOCKER_DEV) down --rmi local --volumes --remove-orphans; \
	else \
		echo "\033[32mСкасовано.\033[0m"; \
	fi
