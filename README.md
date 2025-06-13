# Liquide Assignment - Stock Trade API

This project provides a secure authentication API built with Node.js, Express, and MongoDB. It supports user registration, login, JWT-based authentication with access and refresh tokens, and includes trade management APIs.

## Auth Endpoints

### Register a New User

- **POST** `/api/v1/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourPassword"
  }
  ```
- **Success:** `201 Created`  
  Returns user info (without password).

### Login

- **POST** `/api/v1/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourPassword"
  }
  ```
- **Success:** `200 OK`  
  Sets `accessToken` and `refreshToken` cookies, returns user info and access token.

### Refresh Access Token

- **POST** `/api/v1/auth/refresh-token`
- **Body or Cookie:**
  ```json
  {
    "refreshToken": "yourRefreshToken"
  }
  ```
- **Success:** `200 OK`  
  Sets new `accessToken` cookie, returns new access token.

## Trade Endpoints

### Create a New Trade

- **POST** `/api/v1/trades/create-trade`
- **Body:**
  ```json
  {
    "symbol": "AAPL",
    "quantity": 10,
    "price": 150.25,
    "type": "buy", // or "sell"
    "user": 123
  }
  ```
- **Success:** `201 Created`  
  Returns the created trade object.
- **Error** `400 Bad Request`

---

### Get All Trades

- **GET** `/api/v1/trades/get-all-trades`
- **Query Parameters:**
  - `type` (optional): Filter trades by type (`buy` or `sell`)
  - `user_id` (optional): Filter trades by user ID
  - You can provide either parameter, both, or none.
- **Success:** `200 OK`  
  Returns an array of all trades for the authenticated user, filtered by the provided parameters if present.
- **Error:** `400 Bad Request`
---

### Get a Trade by ID

- **GET** `/api/v1/trades/get-trade/:id`
- **Success:** `200 OK`  
  Returns the trade object with the specified ID.
- **Error:** `404 Not Found`  
  If the trade does not exist.

---

### Update or Delete a Trade

- **PUT** `/api/v1/trades/update-trade/:id`
- **PATCH** `/api/v1/trades/update-trade/:id`
- **DELETE** `/api/v1/trades/delete-trade/:id`
- **Response:** `405 Method Not Allowed`  
  The API does not allow deleting or modifying trades for any id value.

## Running the Project

### 1. Create a `.env` file with:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_ACCESS_SECRET=your_access_token_secret
JWT_ACCESS_EXPIRES_IN=expiry_time
JWT_REFRESH_EXPIRES_IN=expiry_time
```
### 2. Build the Docker Image
```sh
docker-compose build
or 
npm run docker:build
```

### 3. Run the Docker Container
```sh
docker-compose up
or 
npm run docker:up
```
`The API will available at localhost:3000`

## Stopping the Project

### 1. Stop the containers(but keep them built)
```sh
docker-compose stop
```

### 2. Stop and remove the containers(but keep them built)
```sh
docker-compose down
```

## Postman Collection

You can find the complete Postman collection for testing all API endpoints here:  
[Liquide Assignment Postman Collection](https://drive.google.com/file/d/1POwMWUuOoS1ISOkIVx-j_hg5VlxTLlIR/view?usp=sharing)