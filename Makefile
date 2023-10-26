## backoffice 1.0.0
## 

.PHONY: clean run-local

help:        ## Show this help.
	@sed -ne '/@sed/!s/## //p' $(MAKEFILE_LIST)

build: clean ## Build the docker image
	docker build -t backoffice .

run: build   ## Run the docker image (and build)
	docker run --rm --name backoffice -p 8080:8080 backoffice:latest

clean:       ## Remove image 
	docker image rm -f backoffice

