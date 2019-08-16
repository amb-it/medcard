# Medcard


To start app:
```
cp .env.dist .env
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
- to refresh database
```
http POST localhost:8080/dev/db/refresh
```

---

#### Tasks:

- env variables in React (delete config.js ?)
- pictures (files) handling
    - api endpoint
    - fe correct request
- Redux implement
- separate users:
    - api
- make lib to be as a part of common files (css as styles.css) etc.
- redirect to main page if there is no card
- dev routes available only for dev env