const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---- Temporary in-memory data storage ----
// NOTE: This is NOT a database. All added records disappear when the
// server restarts, since everything lives in this plain JS array.
let movies = [
  { id: 1, title: 'Inception', genre: 'Sci-Fi', year: 2010 },
  { id: 2, title: 'The Dark Knight', genre: 'Action', year: 2008 },
  { id: 3, title: 'Parasite', genre: 'Thriller', year: 2019 }
];

// Tracks the next id to assign. Starts after the highest seeded id.
let nextId = movies.length
  ? Math.max(...movies.map(m => m.id)) + 1
  : 1;

// ---- Routes ----

// GET /api/movies — retrieve all movies
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

// GET /api/movies/:id — retrieve one movie
app.get('/api/movies/:id', (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Movie id must be a number.' });
  }

  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return res.status(404).json({ error: `Movie with id ${id} not found.` });
  }

  res.json(movie);
});

// POST /api/movies — add a new movie
app.post('/api/movies', (req, res) => {
  const { title, genre, year } = req.body || {};

  // Validate required fields
  const missing = [];
  if (!title) missing.push('title');
  if (!genre) missing.push('genre');
  if (year === undefined || year === null || year === '') missing.push('year');

  if (missing.length > 0) {
    return res.status(400).json({
      error: `Missing required field(s): ${missing.join(', ')}`
    });
  }

  const yearNum = Number(year);
  if (Number.isNaN(yearNum)) {
    return res.status(400).json({ error: 'Year must be a number.' });
  }

  const newMovie = {
    id: nextId++,
    title: String(title),
    genre: String(genre),
    year: yearNum
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// Fallback for unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.listen(PORT, () => {
  console.log(`Movie Collection API running at http://localhost:${PORT}`);
});
