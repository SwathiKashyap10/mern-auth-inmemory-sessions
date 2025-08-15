# Session-Based Authentication (Node.js + Express)

## 📌 Overview
This project demonstrates **session-based authentication** in Node.js using a **simple in-memory session store** (JavaScript object / hash map).  
The project uses `uuid` to generate unique session IDs, stores them in memory, and uses them to authenticate users for protected routes.

⚠️ **Note:** This implementation is for **learning/demo purposes only**.  
In **production**, sessions should be stored in a **persistent store** like **Redis** or **MongoDB**, not in memory.

---

## 🚀 Features
- User login with credentials
- Session creation using `uuidv4`
- In-memory session storage (hash map)
- Protected routes requiring authentication
- Session validation middleware

---

## 🛠 Tech Stack
- **Node.js** (Backend runtime)
- JavaScript (Language)
- Express.js (Framework)
- HTML (frontend)

---

## 🔄 Flow of Authentication
1. **User Login**
   - User sends login credentials to `/login`.
   - If credentials are valid:
     - A unique `sessionId` is generated using `uuidv4`.
     - The session is stored in a **hash map** in the server memory:
       ```js
       sessions[sessionId] = userData;
       ```
     - The `sessionId` is sent back to the client as a **cookie**.

2. **Session Validation**
   - For every protected route, middleware checks:
     - If a cookie with `sessionId` exists.
     - If that `sessionId` is present in the in-memory session store.
   - If valid → request proceeds.
   - If not → user is redirected to `/login`.

3. **Logout**
   - Session entry in the hash map is deleted.
   - Cookie is cleared.

---


## ⚠️ Limitations of In-Memory Session Store
While storing sessions in a JavaScript object (hash map) works for development, it has major drawbacks:

1. **Server Restart = All Sessions Lost**  
   - Since sessions are stored in RAM, they disappear when the server restarts.

2. **Not Scalable for Multiple Servers**  
   - In a production environment with multiple servers, each server would have a different memory store.  
     → User might log in on Server A but their session won’t exist on Server B.

3. **Memory Leaks Risk**  
   - If sessions aren’t properly cleared, they will consume memory indefinitely.

---

