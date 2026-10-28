# TechFest 2026 Portal - React SPA Walkthrough

The **TechFest 2026 Portal** has been successfully developed as a Single Page Application (SPA) using React, React Router v6, Axios, and Context API according to all requirements in [req.txt](file:///d:/s7cs2/experiment%203/req.txt).

## Architecture & Features Summary

### 1. SPA Routing (`React Router v6`)
- Seamless client-side navigation without full browser reloads using `<Link>` and `<NavLink>`.
- **Routes Implemented:**
  - `/` → **Home**: Hero banner, event stats counter, key highlights.
  - `/events` → **Events**: Dynamic event listing with live search, category filtering, and API fetching.
  - `/register` → **Registration**: Controlled component registration form with validation and ticket confirmation.
  - `/gallery` → **Gallery**: Filterable photo gallery of TechFest highlights.
  - `/contact` → **Contact**: Inquiry form, contact details, and helpdesk info.
  - `/cart` → **Cart**: Shared event cart listing selected events and total fee.
  - `*` → **NotFound**: Custom 404 error page for unmapped URLs.

### 2. State Management & Context API
- **`ThemeContext`**: Global Light and Dark mode toggle accessible from the Navbar button across all pages.
- **`CartContext`**: Global cart state tracking selected events, calculating total fees, and updating the cart badge count in the Navbar.

### 3. Dynamic Events & Live Seat Decrement State
- **[EventCard](file:///d:/s7cs2/experiment%203/src/components/EventCard.jsx#6-83) Component**: Reusable component managing its internal seat state (`seatsLeft`).
- Clicking "Register" decrements seat count.
- When `seatsLeft` reaches 0, the button is disabled and displays **"SOLD OUT"**.
- Live search bar and track category filter dropdown dynamically display matching events.

### 4. Controlled Registration Form
- Controlled inputs with real-time validation for Full Name, Email, 10-digit Phone Number, College, and Event Selection.
- Error alerts displayed for invalid fields.
- On valid submit, generates a unique **Ticket ID** and displays a styled confirmation pass.

### 5. API Data Integration
- [Events.jsx](file:///d:/s7cs2/experiment%203/src/pages/Events.jsx) fetches event data via `axios` in `useEffect`.
- Includes a **loading spinner** during request processing and an **error alert banner** with a retry mechanism.

---

## File Structure Overview

```
d:/s7cs2/experiment 3/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   ├── ThemeContext.jsx
    │   └── CartContext.jsx
    ├── components/
    │   ├── Navbar.jsx
    │   ├── EventCard.jsx
    │   └── Footer.jsx
    └── pages/
        ├── Home.jsx
        ├── Events.jsx
        ├── Registration.jsx
        ├── Gallery.jsx
        ├── Contact.jsx
        ├── Cart.jsx
        └── NotFound.jsx
```
