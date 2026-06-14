FROM dhi.io/node:26.2.0-debian13-dev AS build
ARG VITE_API_ORIGIN
ENV VITE_API_ORIGIN=$VITE_API_ORIGIN
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build -- --outDir /app

FROM dhi.io/nginx:1.30.1-debian13 AS run
COPY --from=build /app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
