SHELL := bash

LAB_MAP_01=01-hello-world
LAB_MAP_02=02-terraform-intro
LAB_MAP_03=03-ingress
LAB_MAP_04=04-cloud-native-app
LAB_MAP_05=05-k8s-jobs
LAB_MAP_06=06-configmaps
LAB_MAP_07=07-secrets

# Resolve o diretório baseado na variável LAB
LAB_DIR := $(LAB_MAP_$(LAB))

check-lab:
	@if [ -z "$(LAB)" ]; then \
		echo "Usage: make $@ LAB=lab-01"; \
		exit 1; \
	fi
	@if [ -z "$(LAB_DIR)" ]; then \
		echo "Unknown lab: $(LAB)"; \
		exit 1; \
	fi

start: check-lab
	./_scripts/build.sh $(LAB_DIR)
	./_scripts/infra.sh $(LAB_DIR)
	./_scripts/deploy.sh $(LAB_DIR)

destroy: check-lab
	./_scripts/destroy.sh $(LAB_DIR)

build: check-lab
	./_scripts/build.sh $(LAB_DIR)

infra: check-lab
	./_scripts/infra.sh $(LAB_DIR)

deploy: check-lab
	./_scripts/deploy.sh $(LAB_DIR)

clean-all:
	./_scripts/clean-all.sh
