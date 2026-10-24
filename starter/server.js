import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

const response = await fetch('https://akabab.github.io/starwars-api/api/all.json');
const characters = await response.json();
const n = characters.length;

// Serve the static frontend from ./public
app.use(express.static('public'));

app.get('/api/characters', (req, res) => {
  const searchKeywords = (req.query.search || '').toLowerCase().trim();
  const found = characters.filter((character) => character.name.toLowerCase().includes(searchKeywords) || String(character.id) === searchKeywords);
  if(found.length === 0){
    return res.status(404).json({error: 'Character not found'});
  }
  const list = found.map(({ id, name, image }) => ({ id, name, image }));
  res.json(list);
});

app.get('/api/characters/:id', (req, res) => {
  const index = characters.findIndex((character) => character.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Character not found' });
  }

  const prevId = characters[(index+n-1) % n].id;
  const nextId = characters[(index+1)   % n].id;

  res.json({ ...characters[index], prevId, nextId });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Server running at http://localhost:${PORT}`);
});
