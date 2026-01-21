.PHONY: up down restart logs logs-backend logs-frontend build clean help

help:
	@echo "Comandos disponíveis:"
	@echo "  make up              - Inicia frontend e backend"
	@echo "  make down            - Para os containers"
	@echo "  make restart         - Reinicia os containers"
	@echo "  make logs            - Mostra logs de todos os containers"
	@echo "  make logs-backend    - Mostra logs do backend"
	@echo "  make logs-frontend   - Mostra logs do frontend"
	@echo "  make build           - Faz build das imagens Docker"
	@echo "  make clean           - Remove containers e imagens"

up:
	docker compose up

down:
	docker compose down

restart: down up

logs:
	docker compose logs -f

logs-backend:
	docker compose logs -f backend

logs-frontend:
	docker compose logs -f frontend

build:
	docker compose build

clean:
	docker compose down -v
	docker rmi pub-backend pub-frontend 2>/dev/null || true
