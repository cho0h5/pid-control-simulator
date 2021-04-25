FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /static
COPY . .
