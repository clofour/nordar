FROM dhi.io/node:26.2.0-debian13-dev AS build
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Remove certificate generation code from vite.config.ts
RUN npm run build

FROM dhi.io/nginx:1.30.1-debian13 AS run
WORKDIR /app
COPY --from=build /app /usr/share/nginx/html
