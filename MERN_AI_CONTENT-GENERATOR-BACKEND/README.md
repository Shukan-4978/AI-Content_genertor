# MERN AI Content Generator — Backend (Fixed)

## Setup

```bash
npm install
# fill in .env values, then:
npm run server   # dev (nodemon)
# or
npm start
```

`.env`:
```
NODE_ENV=development
PORT=8090
MONGO_URI=mongodb://localhost:27017/masync-mern-ai
CLIENT_URL=http://localhost:3000
JWT_SECRET=replace_this_with_a_long_random_string
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_test_...
```

## Bugs fixed

1. `app.listen` callback was `console.log(...)` (executed immediately) → now a function.
2. Monthly cron jobs used 6-field expressions that ran daily at 1 AM → fixed to `0 0 1 * *` (1st of each month).
3. `checkApiRequestLimit` left `requestLimit = 0` for Free/Basic/Premium users → all paid users were blocked. Now uses `user.monthlyRequestCount` for any plan.
4. `isAuthenticated` only read the cookie → now also accepts `Authorization: Bearer <token>` (great for Thunder Client / Postman).
5. `login` now returns `token` in the response body too (still sets the cookie).
6. `openAIController` rethrew `new Error(error)` (became `[object Object]`) → now surfaces the real OpenAI error message.
7. `verifyPayment` had no response when `subscriptionPlan` was neither Basic nor Premium → request hung. Now always responds.
8. `connectDB` had a hardcoded local Mongo URI → uses `process.env.MONGO_URI` with local fallback.
9. CORS origin uses `process.env.CLIENT_URL`.
10. `checkAuth` no longer crashes when the cookie/header is missing.

## Thunder Client quick test

Base URL: `http://localhost:8090/api/v1`

1. `POST /users/register`
   ```json
   { "username": "test", "email": "test@example.com", "password": "secret123" }
   ```

2. `POST /users/login`
   ```json
   { "email": "test@example.com", "password": "secret123" }
   ```
   Copy the `token` field from the response.

3. For every protected route, add header:
   ```
   Authorization: Bearer <token>
   ```

   - `GET /users/profile`
   - `GET /users/auth/check`
   - `POST /openai/generate-content`
     ```json
     { "prompt": "Write a short tagline for a coffee shop" }
     ```
   - `POST /stripe/checkout`
     ```json
     { "amount": 10, "subscriptionPlan": "Basic" }
     ```
   - `POST /stripe/free-plan`
   - `POST /stripe/verify-payment/:paymentId`
