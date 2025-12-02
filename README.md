# kube-lab-app (minimal todo)

Run locally:
1. npm install
2. npm start
Open http://localhost:8080

Docker:
docker build -t kube-lab-app:v1 .
docker run -p 8080:8080 kube-lab-app:v1

Kubernetes:
k8s/deployment.yaml and k8s/service.yaml provided (NodePort 30080).
