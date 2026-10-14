# Live Chat Application

Real-time chat built on the MERN stack with Socket.IO — instant messaging and
user presence over a persistent WebSocket connection, with JWT-authenticated
REST endpoints behind it.

## Stack

Node.js · Express · MongoDB (Mongoose) · Socket.IO · JWT · bcrypt · React

## What it does

- **Messaging over WebSockets.** Socket.IO handles delivery and presence; the
  connection survives reconnects rather than polling for new messages.
- **Authentication.** Registration and login issue a JWT; bcrypt hashes
  passwords; middleware guards the protected routes.
- **Persistence.** Mongoose schemas for users and messages, so history survives
  a reload.

## Layout

```
index.js         server entry
connection.js    MongoDB connection
routes/          REST endpoints
controller/      request handlers
model/           Mongoose schemas
middleware/      JWT verification
Socket/          Socket.IO event handlers
frontend/        React client
```

## Running it

```bash
npm install
cp .env.example .env     # fill in MONGO_URI and JWT_SECRET_KEY
npm run dev
```

> Written while learning the stack. The WebSocket and auth layers are the parts
> worth reading.
