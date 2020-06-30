const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Cache = require('./cache');

const app = express();
const port = 3001;
const cache = new Cache();

app
  .set('trust proxy', true)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cors({
    credentials: true,
  }));


// Cache status
app.get('/', (req, res) => {
  const { hits, misses, size } = cache;
  return res.json({ hits, misses, size });
});

// Get from cache
app.get('/:key', (req, res) => {
  const { key } = req.params;
  const val = cache.fetch(key);
  if (val === false) {
    return res.sendStatus(404);
  }
  return res.json ({ key: val });
});

// Add to cache
app.post('/', (req, res) => {
  const { key, val, expiry } = req.body;
  if (req.body.hasOwnProperty('key')
      && req.body.hasOwnProperty('val')) {
    const isAdded = cache.add(key, val, expiry);
    if (isAdded === false) {
      return res.sendStatus(404);
    }
    return res.json ({ key: val });
  }
  return res.sendStatus(400);
});

// Delete from cache
app.delete('/:key', (req, res) => {
  const { key } = req.params;
  const val = cache.remove(key);
  if (val === false) {
    return res.sendStatus(404);
  }
  return res.sendStatus(200);
});

// Start server
app.listen(port, () => {
  console.log(`Cache example running at http://localhost:${port}`);
});
