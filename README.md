# Medcard


To start app:
```
cp .env.dist .env
```
```
docker-compose up
```

-------------------

React App (frontend) will be available:

http://localhost:5000

---
Node App (api) will be available:

http://localhost:8080

---

#### Tasks:

- make consistent list of fields 
    - make cardTypes logic
        - FE: set requested cardTypes to corresponding input
        - make on API correct cardType saving
        - put on FE cardType to request
    - database design
    - api design
    - list of FE fields
    - make it all consistent
- env variables in React (delete config.js ?)
- Pictures (files) handling
    - api endpoint
    - fe correct request
- Redux implement
- Separate users:
    - api