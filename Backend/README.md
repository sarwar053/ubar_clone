# Backend API Documentation

## Overview
This is a Node.js/Express backend API for a ride-hailing application (similar to Uber), supporting two main user types: **Users** (passengers) and **Captains** (drivers). The API provides authentication, registration, login, profile management, and logout functionality with JWT-based security and token blacklisting.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js (v5.1.0)
- **Database**: MongoDB with Mongoose ODM (v8.18.3)
- **Authentication**: JSON Web Tokens (jsonwebtoken v9.0.2), HTTP-only cookies or Bearer tokens
- **Security**: bcrypt for password hashing (v6.0.0), token blacklisting with TTL
- **Validation**: express-validator (v7.2.1)
- **Other**: CORS (v2.8.5), cookie-parser (v1.4.7), dotenv (v17.2.3)

See `package.json` for full dependency versions.

## Project Structure
```
Backend/
├── server.js              # HTTP server entry point
├── app.js                 # Express app setup, middleware, routes
├── .env                   # Environment variables
├── db/
│   └── db.js              # MongoDB connection
├── routes/
│   ├── user.routes.js     # User-related routes
│   └── captain.routes.js  # Captain-related routes
├── controllers/
│   ├── user.controller.js     # User request handlers
│   └── captain.controller.js  # Captain request handlers
├── services/
│   ├── user.service.js     # User creation logic
│   └── captain.service.js  # Captain creation logic
├── models/
│   ├── user.model.js           # User Mongoose schema
│   ├── captain.model.js        # Captain Mongoose schema
│   └── blacklistToken.model.js # Token blacklist schema
├── middleware/
│   └── auth.middleware.js  # Authentication middleware
└── package.json
```

## Environment Variables
Create a `.env` file in the `Backend/` directory with the following variables:

- `MONGODB_URL`: MongoDB connection string (e.g., `mongodb://127.0.0.1:27017/uber-video`)
- `JWT_PRIVATE_KEY`: Secret key for JWT signing (e.g., `robin25863`)
- `PORT`: Server port (optional, defaults to 3000)

These are loaded using `dotenv` in `app.js`.

## Installation & Running
1. Navigate to the `Backend/` directory
2. Install dependencies: `npm install`
3. Ensure MongoDB is running locally or update `MONGODB_URL` for remote DB
4. Start the server: `node server.js`
5. Server runs on `http://localhost:<PORT>` (default: `http://localhost:3000`)
6. Health check: `GET /` returns `{"message": "hello world"}`

## Authentication
- **JWT Tokens**: Generated per user/captain with 1-day expiration
- **Token Transport**:
  - Cookies: Set as `token` (HTTP-only recommended for security)
  - Headers: `Authorization: Bearer <token>`
- **Middleware**:
  - `authUser`: Protects user routes, verifies JWT and checks blacklist
  - `authCaptain`: Protects captain routes, verifies JWT and checks blacklist
- **Token Blacklisting**: Invalidated tokens stored in `BlacklistToken` collection with 24-hour TTL

## API Endpoints

### Base URL
`http://localhost:4000` (or configured PORT)

### Users (`/users`)

#### POST `/users/register`
Register a new user.

**Request Body** (JSON):
```json
{
  "fullname": {
    "firstname": "string (3-50 chars, required)",
    "lastname": "string (3-50 chars, optional)"
  },
  "email": "valid email, unique",
  "password": "string (6-50 chars)"
}
```

**Response** (201 Created):
```json
{
  "token": "jwt_token_string",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "user@example.com",
    "socketId": null
  }
}
```

**Errors**: 400 with `{ errors: [{ msg: "error message" }] }`

#### POST `/users/login`
Authenticate user login.

**Request Body** (JSON):
```json
{
  "email": "user@example.com",
  "password": "user_password"
}
```

**Response** (200 OK):
```json
{
  "token": "jwt_token_string",
  "user": {
    "_id": "user_id",
    "fullname": { "firstname": "string", "lastname": "string" },
    "email": "user@example.com",
    "socketId": null
  }
}
```
Also sets `token` cookie.

**Errors**: 400/401 with `{ errors: [{ msg: "invalid credentials" }] }`

#### GET `/users/profile`
Get authenticated user's profile.

**Headers**: `Authorization: Bearer <token>` or cookie `token`

**Response** (200 OK):
```json
{
  "user": {
    "_id": "user_id",
    "fullname": { "firstname": "string", "lastname": "string" },
    "email": "user@example.com",
    "socketId": null
  }
}
```

**Errors**: 401 `{ message: "Unauthorized" }`

#### GET `/users/logout`
Logout user and blacklist token.

**Headers**: `Authorization: Bearer <token>` or cookie `token`

**Response** (200 OK):
```json
{
  "message": "logout successfully"
}
```
Clears `token` cookie and blacklists token.

### Captains (`/captains`)

#### POST `/captains/register`
Register a new captain.

**Request Body** (JSON):
```json
{
  "fullname": {
    "firstname": "string (3-50 chars, required)",
    "lastname": "string (required)"
  },
  "email": "valid email, unique",
  "password": "string (6-50 chars)",
  "vehicle": {
    "color": "string (3+ chars)",
    "plate": "string (3+ chars)",
    "capacity": "number (>=1)",
    "vehicleType": "car|motorcycle|auto"
  }
}
```

**Response** (201 Created):
```json
{
  "token": "jwt_token_string",
  "captain": {
    "_id": "captain_id",
    "fullname": { "firstname": "string", "lastname": "string" },
    "email": "captain@example.com",
    "socketId": null,
    "status": "inactive",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": { "lat": null, "lng": null }
  }
}
```

**Errors**: 400 with `{ errors: [{ msg: "error message" }] }`

#### POST `/captains/login`
Authenticate captain login.

**Request Body** (JSON):
```json
{
  "email": "captain@example.com",
  "password": "captain_password"
}
```

**Response** (200 OK):
```json
{
  "token": "jwt_token_string",
  "captain": {
    "_id": "captain_id",
    "fullname": { "firstname": "string", "lastname": "string" },
    "email": "captain@example.com",
    "socketId": null,
    "status": "inactive",
    "vehicle": { ... },
    "location": { ... }
  }
}
```
Also sets `token` cookie.

**Errors**: 400 with `{ errors: [{ msg: "invalid credentials" }] }`

#### GET `/captains/profile`
Get authenticated captain's profile.

**Headers**: `Authorization: Bearer <token>` or cookie `token`

**Response** (200 OK):
```json
{
  "captain": {
    "_id": "captain_id",
    "fullname": { "firstname": "string", "lastname": "string" },
    "email": "captain@example.com",
    "socketId": null,
    "status": "inactive",
    "vehicle": { ... },
    "location": { ... }
  }
}
```

**Errors**: 401 `{ message: "Unauthorized" }`

#### GET `/captains/logout`
Logout captain and blacklist token.

**Headers**: `Authorization: Bearer <token>` or cookie `token`

**Response** (200 OK):
```json
{
  "message": "logout successfully"
}
```
Blacklists token.

## Models

### User Model (`models/user.model.js`)
```javascript
{
  fullname: {
    firstname: { type: String, required: true, minlength: 3, maxlength: 50 },
    lastname: { type: String, minlength: 3, maxlength: 50 }
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  socketId: { type: String }
}
```
**Methods**:
- `generateAuthToken()`: Returns JWT token
- `comparePassword(password)`: Compares hashed password

**Statics**:
- `generateHashPassword(password)`: Hashes password with bcrypt

### Captain Model (`models/captain.model.js`)
```javascript
{
  fullname: {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true }
  },
  email: { type: String, required: true, unique: true, lowercase: true, match: emailRegex },
  password: { type: String, required: true, select: false },
  socketId: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
  vehicle: {
    color: { type: String, required: true, minlength: 3 },
    plate: { type: String, required: true, minlength: 3 },
    capacity: { type: Number, required: true, min: 1 },
    vehicleType: { type: String, required: true, enum: ['car', 'motorcycle', 'auto'] }
  },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  }
}
```
**Methods**: Same as User model.

### BlacklistToken Model (`models/blacklistToken.model.js`)
```javascript
{
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 86400 }
}
```

## Validation & Errors
- **Validation**: Uses `express-validator` in route definitions
- **Error Responses**:
  - Validation errors: 400 `{ errors: [{ msg: "error message" }] }`
  - Auth errors: 401 `{ message: "Unauthorized" }`
  - Server errors: 500 (generic)

## Database
- **Connection**: `db/db.js` connects to MongoDB using `mongoose.connect(process.env.MONGODB_URL)`
- **Collections**: `users`, `captains`, `blacklisttokens`
- **Indexes**: Unique on `email` for users and captains

## Notes for Frontend Developers
- **CORS**: Enabled for cross-origin requests
- **Cookies**: Login sets HTTP-only `token` cookie; include credentials in requests
- **Token Handling**: Store token securely; send in `Authorization: Bearer <token>` header or rely on cookies
- **Error Handling**: Check for `errors` array in 400 responses, `message` in 401 responses
- **Password Security**: Minimum 6 characters; hashed server-side
- **Socket Support**: `socketId` field available for real-time features (future use)
- **Production**: Set `secure: true` for cookies, use HTTPS, validate environment variables
- **Rate Limiting**: Not implemented; consider adding for production
- **Logging**: Basic console logging; enhance for production monitoring

## Future Enhancements
- Add npm scripts (`"start"`, `"dev"` with nodemon)
- Implement refresh tokens
- Add password reset functionality
- Rate limiting and request logging
- Input sanitization beyond validation
- API versioning
- Swagger/OpenAPI documentation
