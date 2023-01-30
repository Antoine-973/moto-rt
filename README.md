# Moto-RT

## Requirements

- Docker
- Docker Compose

## Getting Started

### 1- Fill the .env files using their .env.template, one for the backend and one for the frontend

### 2- Launch the docker stack
```bash
docker compose up -d
```

### 3- Run the Sequelize migrations for the postgres database
```bash
docker compose exec node npm run migrate
```

### 3- Seed the database with sample data
```bash
docker compose exec node npm run seed
```