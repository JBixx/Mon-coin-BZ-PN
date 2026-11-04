import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Mon coin BZ-PN API en écoute sur http://localhost:${PORT}`);
});
