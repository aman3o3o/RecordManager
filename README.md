# Record Management System (MERN)

A web app where users can signup, login and manage their own records using CRUD operations.

## Features
- User registration and login
- CRUD operations for dataset
- JWT authentication
- Password encryption
- Forgot password via email
- Dedicated ADMIN panel, where only ADMIN can view all registered Users and their Data in the database
- MVC folder structure
- Button click loader for user friendly

## Technologies used
- MongoDB | Express | React | Node
- Jwt | Axios | bcrypt | Nodemailer


## How to run from Docker
- Frontend Docker image link - [click here](https://hub.docker.com/repository/docker/aman3o3o/frontend_image) | use `docker pull aman3o3o/frontend_image` for fetching frontend image

- Backend Docker image link - [click here](https://hub.docker.com/repository/docker/aman3o3o/backend_image) | use `docker pull aman3o3o/backend_image` for fetching backend image

- docker-compose.yml - [view compose file](./docker-compose.yml) (click here to view the frontend , backend compose file) | To run the project using compose file please use `docker compose up -d` command

- backend env file - [view backend env file](./backend/.env.example) (click here to view backend env file)

## How to run from github
- cd RecordManager_file -> git clone https://github.com/aman3o3o/RecordManager.git .(gitbash)

- cd server_file -> npm install -> npm start
- cd client_file -> npm install -> npm run dev