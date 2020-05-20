help:
	@echo '--------------------'
	@echo "\033[32m Commands: \033[0m"
	@echo '--------------------'
	@echo "make up"
	@echo "make down"
	@echo "make stage-preset-mongo"
	@echo "make stage-build"
	@echo "make stage-up"
	@echo "make stage-down"
	@echo '--------------------'

up:
	cd infra && docker-compose up

down:
	cd infra && docker-compose down

stage-up:
	cd infra && docker-compose -f docker-compose.stage.yml up -d

stage-down:
	cd infra && docker-compose -f docker-compose.stage.yml down

stage-build:
	cd frontend && npm install && npm run build

stage-preset-mongo:
	sudo chown -R 1001 mongo/database