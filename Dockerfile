#---
FROM golang:latest AS buildGO
WORKDIR /tmp/server
COPY server ./
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-w" -a -o ./main .

#---
FROM node:10.16.3-alpine AS buildApp

WORKDIR /tmp/app

COPY package*.json ./
COPY .babelrc ./
COPY src ./src/

RUN npm install
RUN npm run build-prod

#---
FROM alpine:latest

RUN apk --no-cache add ca-certificates

COPY --from=buildGO /tmp/server/main ./
COPY --from=buildApp /tmp/app/dist ./web

RUN chmod +x ./main

EXPOSE 8080

CMD ./main
