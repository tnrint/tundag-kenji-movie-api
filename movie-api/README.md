# Movie Collection API

A simple Movie Collection REST API built with Node.js + Express, using an in-memory
JavaScript array as temporary storage.

> **Note:** There is no database. Any movies you add will disappear when the server restarts.

## Setup

```bash
npm install
npm start
```

Server runs at `http://localhost:3000`. Open that URL in your browser to use the
frontend (`public/index.html`), which lists movies, lets you add one via a form,
and talks to the API with `fetch()`.

## Endpoints

| Method | Route              | Description                          |
|--------|--------------------|---------------------------------------|
| GET    | `/api/movies`      | Retrieve all movies                   |
| GET    | `/api/movies/:id`  | Retrieve a single movie by id         |
| POST   | `/api/movies`      | Add a new movie (id assigned by server)|

### Movie shape

```json
{ "id": 1, "title": "Inception", "genre": "Sci-Fi", "year": 2010 }
```

### POST /api/movies

Body (JSON):

```json
{ "title": "Dune", "genre": "Sci-Fi", "year": 2021 }
```

- `title`, `genre`, and `year` are required. Missing any of them returns a `400`
  with an `error` message listing what's missing.
- `id` is assigned automatically by the server — don't send it.

### Example responses

**GET /api/movies/2**
```json
{ "id": 2, "title": "The Dark Knight", "genre": "Action", "year": 2008 }
```

**GET /api/movies/99** (not found)
```json
{ "error": "Movie with id 99 not found." }
```

**POST /api/movies** with missing fields
```json
{ "error": "Missing required field(s): genre, year" }
```
