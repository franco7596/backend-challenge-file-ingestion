# Backend Microservice – Client Data Processor

## Overview

This microservice is responsible for processing large client data files and persisting valid records into a SQL Server database. It is implemented in Node.js, containerized with Docker, and designed to run in Kubernetes environments.

---

## Prerequisites

- Ensure that the input file `CLIENTES_IN_0425.dat` containing the client data to be processed is placed **prior** to execution in the following directory: data-generator/challenge/input

- Docker and Docker Compose installed on your machine.

---

## Running the Microservice

1. Open a terminal and navigate to the `microservice` directory:

```bash
cd microservice
```

## For the initial setup and build, execute:

```
docker-compose up --build
```

This command will build the Docker image and start the containerized service.

For subsequent runs, if the service has already been built, start it simply with:

```
docker-compose up
```
