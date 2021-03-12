help:
	@echo '--------------------'
	@echo "\033[32m Commands: \033[0m"
	@echo '--------------------'
	@echo "make up"
	@echo "make down"
	@echo "make stage-up"
	@echo "make stage-down"
	@echo "make fe-build"
	@echo "make enter-server"
	@echo '--------------------'

up:
	cd infra && docker-compose up -d

down:
	cd infra && docker-compose down

stage-up:
	cd infra && docker-compose -f docker-compose.stage.yml up -d

stage-down:
	cd infra && docker-compose -f docker-compose.stage.yml down

fe-build:
	sh ./infra/scripts/export_env_vars.sh

enter-server:
	echo "cd projects/medcard" && ssh root@vm1066258.had.tf
