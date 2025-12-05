# Step 1: Build React App
FROM node:22 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

COPY .env.docker .env

RUN npm run build

# Step 2: Use Nginx to serve the build files
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy React build output to Nginx folder
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

