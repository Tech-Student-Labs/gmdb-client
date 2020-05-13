# GMDB Client

This project contains an Angular client to front the GMDB microservices API.

* Service API: 
* Documentation:

**Features**

- Search movie database
- Create account
- Leave reviews
- Leave comments

## Student Setup

1. Open `environment.prod.ts`
2. Change the value of `apiUrl` to the URL for your api service.
3. Build with docker as usual.

## Setup

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

**Docker Instructions**

1. Ensure gmdb-bridge network is created `docker network inspect gmdb-bridge`
1. Ensure gmdb-gateway is running on gmdb-bridge network `docker network inspect gmdb-gateway` look for gmdb-bridge network
1. Build the docker image `docker build -t gmdb/ui`
1. Run the image `docker run -d -p 4200:4200 --name gmdb-ui --network gmdb-bridge gmdb/ui`

> NOTE: To change docker port, you must change it in `Dockerfile` and `server.js`.  To change local port, change just the first port number.

**Node Instructions**
1. Download or clone this repo.
2. Inside the gmdb-ui folder, run: `npm install`
3. Run the server: `npm start`


## Deployment

1. Run: `npm build`
2. Upload the `dist/gmdb-ui/` folder to your server


## DEVELOPMENT TODOs

- [x] Navigation
- [x] Search bar
- [x] Login form
- [ ] Registration form
- [x] Movie list
- [x] Movie detail
- [x] Review form
- [x] Movie service
- [x] Search service
- [x] Review service
  * Movie detail: Get reviews by movie id
  * User detail: Get reviews by user id
- [x] Star ratings
- [x] Promo/Landing page service (random movie search)
- [x] Fix search (currently can't search from a results page)
- [ ] Change breadcrumb: should navigate home from search results
- [x] JWT authentication and authorization.
- [x] Use localstorage for data persistence on all services.
- [ ] OPTIONAL: User profile
