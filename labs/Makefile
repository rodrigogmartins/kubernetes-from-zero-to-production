LAB_MAP_lab-01=01-hello-world
LAB_MAP_lab-02=02-terraform-intro
LAB_MAP_lab-03=03-ingress
LAB_MAP_lab-04=04-cloud-native-app
LAB_MAP_lab-05=05-k8s-jobs
LAB_MAP_lab-06=06-configmaps
LAB_MAP_lab-07=07-secrets

start:
	@if [ -z "$(word 2,$(MAKECMDGOALS))" ]; then \
		echo "Usage: make start lab-01"; \
		exit 1; \
	fi
	$(eval LAB_KEY=$(word 2,$(MAKECMDGOALS)))
	$(eval LAB_DIR=$(LAB_MAP_$(LAB_KEY)))
	@if [ -z "$(LAB_DIR)" ]; then \
		echo "Unknown lab: $(LAB_KEY)"; \
		exit 1; \
	fi
	./_scripts/build.sh $(LAB_DIR)
	./_scripts/deploy.sh $(LAB_DIR)

%:
	@:

destroy:
	bash _scripts/destroy.sh $(LAB)

build:
	bash _scripts/build.sh $(LAB)

infra:
	bash _scripts/infra.sh $(LAB)

deploy:
	bash _scripts/deploy.sh $(LAB)

clean-all:
	bash _scripts/clean-all.sh
