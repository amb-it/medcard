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

- pictures (files) handling
    - move styles from Card component to App.scss
- Redux implement
- implement users
- make lib to be as a part of common files (css as styles.css) etc.
- API deprecations of Mongoose (to see description - add card via FE
    and to see in terminal)
- styles to snake case, to differentiate from boostrap classes
- add Makefile
- redirect to main page if there is no card
- dev routes available only for dev env
