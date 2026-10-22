import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

let characters, n;

// Serve the static frontend from ./public
app.use(express.static('public'));

app.get('/api/characters', (req, res) => {
  const searchKeywords = req.query.search.toLowerCase();
  const found = characters.filter((character) => character.name.toLowerCase().includes(searchKeywords)).slice(0, 5);
  const list = found.map(({ id, name, image }) => ({ id, name, image }));
  res.json(list);
});

app.get('/api/characters/:idx', (req, res) => {
  const index = +req.params.idx;

  if (Number.isNaN(index) || !(0 <= index && idnex < n)) {
    return res.status(404).json({ error: 'Character is invalid' });
  }

  let prevIndex = (index+n-1) % n;
  let nextIndex = (index+1)   % n;

  res.json({ ...characters[index], prevIndex, nextIndex });
});

app.listen(PORT, async () => {
  const response = await fetch('https://akabab.github.io/starwars-api/api/all.json');
  characters = await response.json();
  characters = characters.map((i, j) => {
    i.id = j; // the original id is kind of useless, so we'll just use the index
    return i;
  });
  n = characters.length;
  console.log(`Server running at http://localhost:${PORT}`);
});
