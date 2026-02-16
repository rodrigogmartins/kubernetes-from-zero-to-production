# Ingress Hands-on Lab

This lab demonstrates how to expose an application running on Kubernetes using **Ingress**, providing HTTP routing based on hostnames.

The goal is to understand the basic flow:  
Client → Ingress → Service → Pod

## Prerequisites

- Kubernetes cluster (Kind, Minikube, or similar)
- kubectl configured to access the cluster

## 1. Install Helm

Helm is used to install the Ingress Controller.

### macOS (Homebrew)

```bash
brew install helm
```

### Linux

```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

Verify installation:

```bash
helm version
```

### Windows (Powershell)

```bash
choco install kubernetes-helm
```

## 2. Install NGINX Ingress Controller

Add the Helm repository:

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
```

Install the Ingress Controller:

```bash
helm install nginx-ingress ingress-nginx/ingress-nginx --namespace ingress-nginx --create-namespace
  
```

Wait until the controller is ready:

```bash
kubectl get pods -n ingress-nginx
```

## 3. Generate Docker images

### Greetings Application

```bash
docker build -t greetings-app-api:v1 ./greetings-app
```

### FizzBuzz Application

```bash
docker build -t fizzbuzz-app-api:v1 ./fizzbuzz-app
```

## 4. Run the Application

Apply the application manifests:

```bash
kubectl apply -f ./infra -R
```

Verify resources:

```bash
kubectl get pods
kubectl get services
kubectl get ingress
```

## 5. Describe Ingress Details

```bash
kubectl describe ing sandbox-all
```

## 6. Update your Hosts file

To access the application using a hostname, update your local /etc/hosts file.

Find the Ingress external IP:

```bash
kubectl get ingress
```

In my case the value is `localhost`.

Add the entries:

```text
127.0.0.1 sandbox.com
127.0.0.1 fizz.sandbox.com
127.0.0.1 greetings.sandbox.com
```

If you are using Kind or Minikube, the IP is usually 127.0.0.1.

## 7. Test application

### Test routing by path /greetings

```bash
curl --request GET --url http://sandbox.com/greetings
```

Expected result:

```json
{
  "message": "Hello, welcome to the Greetings API!"
}
```

### Test routing by path /fizz

```bash
curl --request GET --url http://sandbox.com/fizz
```

Expected result:

```json
{
  "message": "BUZZ!"
}
```

### Test routing by subdomain greetings.sandbox.com

```bash
curl --request GET --url http://greetings.sandbox.com/
```

Expected result:

```json
{
  "message": "Hello, welcome to the Greetings API!"
}
```

### Test routing by subdomain fizz.sandbox.com

```bash
curl --request GET --url http://fizz.sandbox.com/
```

Expected result:

```json
{
  "message": "BUZZ!"
}
```

## 8. Cleanup

Remove application resources:

```bash
kubectl delete -f ./infra -R
```

## Notes

- This lab focuses on Ingress basics, not production hardening.
- TLS, authentication, and advanced routing are intentionally out of scope.
