# Variables

DOCKER_COMPOSE = docker compose

start:
	@echo "🐳 Starting Docker containers..."
	$(DOCKER_COMPOSE) up -d

stop:
	@echo "🐳 Stopping Docker containers..."
	$(DOCKER_COMPOSE) down

logs_app:
	@echo "📜 Displaying Docker container logs..."
	$(DOCKER_COMPOSE) logs -f app

logs_db:
	@echo "📜 Displaying Database container logs..."
	$(DOCKER_COMPOSE) logs -f postgres

ps:
	@echo "📋 Listing Docker containers..."
	$(DOCKER_COMPOSE) ps

web:
	@echo "🐚 Accessing Webapp container shell..."
	$(DOCKER_COMPOSE) exec app sh

logs_adminer:
	@echo "📜 Displaying Adminer container logs..."
	$(DOCKER_COMPOSE) logs adminer

adminer:
	@echo "🐚 Accessing adminer container shell..."
	$(DOCKER_COMPOSE) exec -it adminer sh