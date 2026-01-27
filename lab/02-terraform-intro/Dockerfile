# ---------- Build stage ----------
FROM golang:1.25.1-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git

COPY go.mod go.sum ./
RUN go mod download

COPY src ./src

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -o app ./src

# ---------- Runtime stage ----------
FROM alpine:3.20

WORKDIR /app

COPY --from=builder /app/app .

EXPOSE 3000

CMD ["./app"]