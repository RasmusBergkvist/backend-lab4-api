# Laboration 4.1 REST-API 
I denna uppgift har jag byggt ett REST-API med Express och Mongo DB. Via API:et kan nya användare registreras, logga in och valideras med JWT-tokens. Lösenord hashas innan lagring till databasen. Det går även att hämta, skapa, uppdatera och radera lopp. Routes för att skapa (POST), uppdatera (PUT) och radera (DELETE) ett lopp  är skyddade och kräver en giltig token frå användaren. Detta API kommer att integreras med en webbplats i laborationens andra del.

## Url till REST-API


## Teknik
* Databas: Mongo DB 
* Databasserver: Mongo DB Atlas 
* NPM-paket: mongoose, express, nodemon, dotenv, cors, jwtwebtokens, bcrypt

### Kom igång
* Klona ner repot.
* Kör npm install för att installera beroenden.
* Skapa en .env-fil.
* Starta med npm run start.

## API

### Skapa användare
`POST /users/register`
```
{
    "username":"Ditt användarnamn",
    "email": "din@epost.se,
    "password": "Ditt hemliga lösenord,
}
```
Statuskod vid svar:
* 201 Created: Om användare skapas.
* 400 Bad request: Om obligatoriska fält inte är ifyllda.
* 409 Conflict: Om användaren redan finns registerad
* 500 Internal Server Error

### Skapa användare
`POST /users/login`

```
{
    "username":"Ditt användarnamn",
    "password": "Ditt hemliga lösenord"
}
```
Statuskod vid svar:
* 200 OK: Vid lyckad inloggning.
* 400 Bad request: Om obligatoriska fält inte är ifyllda.
* 401 Unauthorized: Misslyckad inloggning.
* 500 Internal Server Error

### Hämta alla lagrade lopp
`GET /races`

Statuskod vid svar:
* 200 OK: Om data hämtas.
* 500 Internal Server Error.

### Hämta ett lopp
`GET /races/:id`

Statuskod vid svar:
* 200 OK: Om data hämtas.
* 400 Bad request: Om felaktigt id anges.
* 404 Not found: Om data inte hittas.
* 500 Internal Server Error.

### Lägga till lopp
`POST /races`
(Giltigt JWT-token krävs)

```
{
    "name":"Run in Älmhult",
    "date": "2026-10-15,
    "distance": 18,
    "location": "Älmhult",
    "description": "Ett eptiskt lopp med vacker natur."
}
```
Statuskod vid svar:

* 201 Created: Om datan läggs till.
* 400 Bad Request: Om obligatoriska data saknas (name, date, distance och location)
* 409 Conflict: Om datan som användare försöker lägga till redan finns inlagd.
* 500 Internal Server Error

## Uppdatera lopp
`PUT /races/:id`
(Giltigt JWT-token krävs från användare som skapat loppet)

Statuskod vid svar:
* 200 OK: Om datan uppdaterades.
* 400 Bad Request: Om obligatoriska data saknas (name, date, distance, location).
* 404 Not found: Om ingen data finns eller om användaren saknar behörighet att uppdatera den.
* 500 Internal Server Error


### Radera lopp
`DELETE /races/:id`
(Giltigt JWT-token krävs från användare som skapat loppet)

Statuskod vid svar:

* 200 OK: Om datan raderades.
* 400 Bad Request: Om felaktigt ID anges
* 404 Not found: Om ingen data finns eller om användaren saknar behörighet att radera den.
* 500 Internal Server Error