# K8s Initial lab

The main objective of this lab is to provide a hands-on example of how to deploy an application on Kubernetes using core components such as Deployments and Services.

The application is a simple API server exposed on port 3000, providing a basic greeting endpoint.

## K8s components

### Deployment

The Deployment spec is a declarative YAML object where you describe the desired state of a stateless app. You give that to Kubernetes where the Deployment controller implements and manages it. The controller aspect is highly-available and operates as a background loop reconciling observed state with desired state.

### Service

The Service object in Kubernetes provides stable networking for Pods. Just like a Pod, ReplicaSet, or Deployment, a Kubernetes Service is a REST object in the API that you define in a manifest and post to the API server.

## Running project

### Build Docker image

```bash
docker build -t greetings-api:v1 .
```

### Run project with Kubernetes

```bash
kubectl apply -f infra
```

### Verify result

```bash
curl http://localhost:3000/greetings
```

## References

- [**The Kubernetes Book - Nigel-Poulton**](https://www.amazon.com.br/Kubernetes-Book-Nigel-Poulton/dp/1916585000)