# 📸 Image Feed App

A fullstack image posting and feed application. Users can upload images with captions, stored via **ImageKit**, and browse them in a scrollable feed. Built with a **React** frontend and a **Node.js/Express** backend connected to **MongoDB**.

---

## Tech Stack

### Frontend
- **React** (Vite)
- **React Router DOM** — client-side routing
- **Axios** — HTTP requests
- **CSS** — custom responsive styles

### Backend
- **Node.js** + **Express**
- **MongoDB** via Mongoose
- **Multer** — in-memory file handling
- **ImageKit** — cloud image storage
- **CORS** — cross-origin support
- **dotenv** — environment variable management

---

## Project Structure

```
my-project/
├── README.md
│
├── backend/
│   ├── app.js                    # Express app, route definitions
│   ├── db.js                     # MongoDB connection
│   ├── models/
│   │   └── post.model.js         # Post schema (image URL, caption)
│   └── services/
│       └── storage.services.js   # ImageKit upload logic
│
└── frontend/
    ├── src/
    │   ├── main.jsx              # React entry point
    │   ├── App.jsx               # Router setup
    │   ├── index.css             # Global styles
    │   └── pages/
    │       ├── createPost.jsx    # Post creation form
    │       └── feed.jsx          # Post feed display
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- ImageKit account

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
MONGO_URI=your_mongodb_connection_string
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
PORT=3000
```

Make sure your server entry point calls `connectdb()` before listening:

```js
const app = require('./app');
const connectdb = require('./db');

connectdb().then(() => {
  app.listen(3000, () => console.log('Server running on port 3000'));
});
```

Start the server:

```bash
node server.js
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and expects the backend at `http://localhost:3000`.

---

## API Reference

Base URL: `http://localhost:3000`

| Method | Endpoint       | Description               |
|--------|----------------|---------------------------|
| POST   | `/create-post` | Upload image with caption |
| GET    | `/posts`       | Fetch all posts           |

### POST `/create-post`

Send as `multipart/form-data`:

| Field     | Type   | Description          |
|-----------|--------|----------------------|
| `image`   | File   | Image file to upload |
| `caption` | String | Caption for the post |

**Response:**
```json
{
  "message": "post created",
  "post": {
    "_id": "...",
    "image": "https://ik.imagekit.io/...",
    "caption": "My caption"
  }
}
```

### GET `/posts`

**Response:**
```json
{
  "message": "post fetched",
  "posts": [
    {
      "_id": "...",
      "image": "https://ik.imagekit.io/...",
      "caption": "My caption"
    }
  ]
}
```

---

## Pages

### `/create-post`
A form where users select an image and enter a caption. On success, the post is saved and the user is redirected to the feed.

### `/feed`
Displays all posts as cards with the uploaded image and caption. Data is fetched from the backend on page load.

---

## Data Model

### Post

| Field     | Type   | Description                        |
|-----------|--------|------------------------------------|
| `image`   | String | ImageKit URL of the uploaded image |
| `caption` | String | Caption text for the post          |

---

## Notes & Known Issues

- **`GET /posts`** returns status `201` — should be `200` for a read/fetch operation.
- **`connectdb()`** must be called in the server entry file before `app.listen()` — it is not called inside `app.js`.
- **`feed.jsx`** initializes state with a hardcoded placeholder post that flashes briefly before real data loads. Consider starting with `[]` and showing a loading spinner instead.
- **ImageKit** always saves uploads as `"image.jpg"` — use `Date.now()` or the original filename to prevent file collisions.
- No `try/catch` error handling on backend routes — recommended before deploying to production.
