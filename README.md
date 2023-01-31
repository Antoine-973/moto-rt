# Moto-RT

## Requirements

- Docker
- Docker Compose

## Getting Started

### 1- Fill the .env files using their .env.template, one for the backend and one for the frontend
___
The .env.template file are filed for the good of the presentation, you can change the values if you want.
___

### 2- Launch the docker stack
```bash
docker compose up -d
```

### 3- Install the front dependencies
```bash
docker compose exec vue npm i
```

### 4- Install the back dependencies
```bash
docker compose exec nodejs npm i
```

### 5- Run the Sequelize migrations for the postgres database
```bash
docker compose exec nodejs npm run migrate
```

### 6- Seed the database with sample data
```bash
docker compose exec nodejs npm run seed
```

### 7- You can now access the app at http://localhost and the API at http://localhost:3000

### 8- You have user accounts with the following credentials:

### Admin
- email: admin@motort.fr
- password: testtest

### User
- email: user@test.fr
- password: testtest

### User
- email: user2@test.fr
- password: testtest

### User
- email: user3@test.fr
- password: testtest

### User
- email: user4@test.fr
- password: testtest

## Librairies

### Front
 
- VueJS
- VeeValidate
- Axios
- Vue Router
- Pinia
- TailwindCSS
- daisyUI
- vue3-toastify
- yup
- eslint
- prettier
- socket.io-client

### Back

- Express
- Sequelize
- Socket.io
- eslint
- prettier
- bcrypt
- jsonwebtoken