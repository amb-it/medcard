# Medcard

To start app in DEV env:
```
cd infra
```
```
cp .env.local .env
```
```
docker-compose up
```

---

React App (frontend) will be available:

http://localhost:5000

---
Node App (api) will be available:

http://localhost:8080

---

## API

available commands:
- to migrate (or to refresh) database (with HTTPie CLI tool)
```
http POST localhost:8080/dev/db/refresh
```

- to get access to auth-required endpoints
```
http localhost:8080/-endpoint- 'Authorization:Bearer -token-'
```
