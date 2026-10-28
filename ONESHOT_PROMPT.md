# ONE-SHOT PROMPT: copy everything below this line into Antigravity

---

Build **Experiment 4 ONLY** of my Web Technology Lab (23CSB40B, TechFest 2026 Portal): a REST API with Node.js, Express and MongoDB (Mongoose) with bcrypt + JWT auth, integrated with a React frontend (MERN). Do everything in ONE GO, following this whole message. Do not ask questions and do not build any other experiment.

## 0. RULES (strict)
**Code style:** write it like a 7th-semester B.Tech student. Simple CommonJS (`require`) backend, `async/await` with basic `try/catch`, simple names, short functions, a few easy comments. No TypeScript, no extra libraries, no controller/service layers (logic stays inside route files), no design patterns. UI is plain React with one `index.css` (about 80 lines), with no UI libraries or animations.

**Credit saving (do not waste credits):**
- Use the minimum steps and tokens. Everything you need is in this message; do not re-read it or any file you just wrote.
- Create files in big batches. Do not explain or summarise each file.
- Do NOT open a browser, take screenshots, use a browser sub-agent, or search the web. I handle screenshots and record work myself.
- CODE ONLY. Do NOT create any README, record notes, screenshot checklists, documentation or other .md files. No refactoring, no extra features, no extra tests.
- One `npm install` command per project.
- Run ONLY these checks: start `node server.js`, run `node seed.js` once, run `node smoke-test.js` once. If something fails, fix with at most 2 retries, then stop and tell me the exact error.
- If MongoDB is not running at `mongodb://127.0.0.1:27017`, stop and tell me; do not try to install it.
- Final reply: max 6 lines (how to run, admin login).

## 1. THE 10 QUESTIONS (all must be satisfied)
1. Design collections for users, events, registrations.
2. RESTful CRUD APIs.
3. User registration and login with encrypted password storage.
4. Secure protected routes with authentication.
5. Connect backend to MongoDB using Mongoose.
6. Validate incoming requests and handle errors.
7. Integrate the React frontend with the backend APIs.
8. Authenticated users can register for events and view their registrations.
9. Middleware for logging requests and handling exceptions.
10. Demonstrate the full workflow from user registration to event registration.

Expected output: all CRUD endpoints return correct status codes and a consistent JSON shape; passwords stored only as bcrypt hashes; protected routes reject missing, expired and non-admin tokens; React frontend is fully driven by the backend, including login and admin operations.

## 2. BACKEND: folder `techfest-backend/` (separate from the React project)
```
techfest-backend/
  .env  .gitignore(node_modules, .env)  server.js  seed.js  smoke-test.js
  models/ User.js Event.js Registration.js
  routes/ auth.js events.js registrations.js
  middleware/ auth.js logger.js errorHandler.js
  views/ index.ejs
```
Setup: `npm init -y`, then `npm install express mongoose bcrypt jsonwebtoken dotenv cors ejs`. Add the script `"start":"node server.js"`.

`.env`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/techfest
JWT_SECRET=mysecretkey
```

**Response shape everywhere:** success `{success:true, message, data}`; failure `{success:false, message}`.

**server.js** (in this order): `dotenv.config()`, app, `cors()`, `express.json()`, logger, `GET /` renders `index.ejs` (a tiny "TechFest API running" page listing the endpoints), mount `/api/auth`, `/api/events`, `/api/registrations`, 404 handler (`{success:false,message:"Route not found"}`), `errorHandler` LAST. Then `mongoose.connect(MONGO_URI)` and log "MongoDB connected"; `app.listen(PORT)` and log "Server running on port 5000".

**models**
- Event: name (String, required), category (enum: technical, cultural, workshop, sports; required), fee (Number, required, min 0), seats (Number, required, min 0), date (Date, required).
- User: name (required), email (required, unique, lowercase), password (required, minlength 6, stores the bcrypt hash), role (enum user/admin, default user).
- Registration: user (ObjectId ref User, required), event (ObjectId ref Event, required), createdAt (default now). Unique compound index on {user, event}.

**middleware**
- logger.js: logs method, url and time, then `next()`.
- auth.js exports `verifyToken` and `isAdmin`. `verifyToken` reads `Authorization: Bearer <token>`; missing header gives 401 "No token"; `jwt.verify` failure (invalid or expired) gives 401 "Invalid or expired token"; success sets `req.user={id,role}`. `isAdmin` gives 403 "Admin only" if role is not admin.
- errorHandler.js `(err,req,res,next)`: logs the error; ValidationError and CastError give 400; otherwise `err.status||500`; responds with the failure shape.

**routes/auth.js**
- `POST /signup`: validate name, email (simple regex) and password (at least 6 chars), else 400. Duplicate email gives 409. `bcrypt.hash(password,10)`. Role is ALWAYS `user` (never read from the body). Returns 201 with {id,name,email,role}.
- `POST /login`: missing fields give 400. User not found or `bcrypt.compare` fails gives 401 "Invalid credentials". `jwt.sign({id,role},JWT_SECRET,{expiresIn:"1h"})`. Returns 200 with `data:{token,user:{id,name,email,role}}`.

**routes/events.js**: `GET /` (public, 200), `GET /:id` (public, 200 or 404), `POST /` (verifyToken, isAdmin, validate, 201), `PUT /:id` (verifyToken, isAdmin, `findByIdAndUpdate` with `{new:true,runValidators:true}`, 200 or 404), `DELETE /:id` (verifyToken, isAdmin, also deletes that event's registrations, 200 or 404).

**routes/registrations.js** (all use verifyToken)
- `POST /` with body {eventId}. Checks in order: eventId given (else 400), event exists (404), seats > 0 (400 "No seats available"), not already registered (409 "Already registered"). Then create the Registration, `event.seats -= 1`, save, and return 201 "Registered successfully".
- `GET /my` returns the user's registrations with `.populate("event")` (200).
- `DELETE /:id` cancels the user's own registration (404 if not found or not theirs), seats +1, 200.

**seed.js**: connect; remove old events and the old admin; create admin `admin@techfest.com` / `admin123` (bcrypt hashed, role admin) and 5 events (Coding Contest, Web Design, Robotics Workshop, Hackathon, Cultural Night) with sensible fee, seats and future dates; print "Seeded"; exit.

**smoke-test.js**: one script using built-in `fetch` against `http://localhost:5000`, printing PASS/FAIL per check: (1) signup a random-email user, 201; (2) same email again, 409; (3) login with wrong password, 401; (4) login correctly, 200, keep the token; (5) GET events, 200; (6) POST event with the user token, 403; (7) POST event with no token, 401; (8) admin login, then POST event 201, PUT 200, DELETE 200; (9) user registers for a seeded event, 201, and seats dropped by 1; (10) register again, 409; (11) GET /registrations/my, 200 and contains the event; (12) GET /api/events/123, 400; GET /unknownroute, 404.

## 3. FRONTEND: folder `techfest-react/`
If it already exists in the workspace (from Experiment 3), only add or edit the files below and delete nothing. Otherwise create it: `npm create vite@latest techfest-react -- --template react`, then ONE install: `npm install react-router-dom axios`.

- `src/api.js`: axios instance with baseURL `http://localhost:5000/api`; a request interceptor adds `Authorization: Bearer <token>` from `localStorage` key `token`.
- `src/App.jsx`: Router + Navbar + routes: `/` and `/events` -> Events, `/login`, `/signup`, `/my-registrations`, `/admin`, and `*` -> "Page Not Found".
- `components/Navbar.jsx`: links Events, My Registrations, Admin (only for admin role). Logged out shows Login and Signup; logged in shows "Hi, name" and Logout (clears `token` and `user` from localStorage, goes to /login). User info is stored in `localStorage` key `user`.
- `pages/Signup.jsx`: controlled form (name, email, password), basic checks, `POST /auth/signup`, shows the SERVER's message (green for success, red for error), navigates to /login on success.
- `pages/Login.jsx`: controlled form, `POST /auth/login`, stores `token` and `user`, shows server error messages, navigates to /events.
- `pages/Events.jsx`: `useEffect` fetches `GET /events` (replacing any sample data) with "Loading..." and an error message; search box + category dropdown; event cards (name, category, fee, date, seats left, Register button). Register: not logged in goes to /login, otherwise `POST /registrations {eventId}`, shows the server message and reloads events so seats go down. Seats = 0 gives a disabled "SOLD OUT" button.
- `pages/MyRegistrations.jsx`: `GET /registrations/my` shown as a table (event, date, fee, registered on) with a Cancel button; redirect to /login if not logged in; "no registrations" message if empty.
- `pages/AdminEvents.jsx`: admin only (otherwise "Admins only"); form to add an event, table of events with Edit (fills the form, then PUT) and Delete; shows server messages.
- `src/index.css`: simple navbar, card grid, forms, table, `.success` (green) and `.error` (red).
- No Vite proxy needed; CORS is handled by the backend.

## 4. DONE WHEN
- `node server.js` prints both startup lines and `node smoke-test.js` shows all PASS.
- React on localhost:5173 can sign up, log in, list events, register (seats go down) and show my registrations; the admin can add, edit and delete events.
- No plain-text password anywhere; `.env` and `node_modules` are in `.gitignore`.
- No documentation or .md files were created.

Start now and finish everything in one go.
