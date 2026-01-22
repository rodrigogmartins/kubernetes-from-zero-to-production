# ---------- Build stage ----------
FROM golang:1.25.1-alpine AS builder

WORKDIR /app

COPY go.mod main.go ./

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o app

# ---------- Runtime stage ----------
FROM alpine:3.20

WORKDIR /app

COPY --from=builder /app/app .

EXPOSE 3000

CMD ["./app"]
