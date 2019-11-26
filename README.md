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
- to migrate (or to refresh) database
```
http POST localhost:8080/dev/db/refresh
```

- to get access to auth-required endpoints
```
http localhost:8080/-endpoint- 'Authorization:Bearer -token-'
```

---

#### Tasks:

(current sprint):

- implement users
- add Makefile
- implement "edit card" feature

(backlog):
- Redux implement
- make lib to be as a part of common files (css as styles.css) etc.
- API deprecations of Mongoose (to see description - add card via FE
    and to see in terminal)
- redirect to main page if there is no card
- dev routes available only for dev env
- use try..catch. Especially in production
