# Dockerfile for SynergiFlow Frontend (Vite)
FROM node:20-slim AS development

WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json ./
# Remove old lock file to avoid conflicts with new stack
# COPY package-lock.json ./ 

RUN npm install

# Copy source
COPY . .

# Vite default port is handled by environment variable in compose
EXPOSE 4000

CMD ["npm", "run", "dev"]
