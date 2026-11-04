import { test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';

process.env.NODE_ENV = 'test';
const { default: app } = await import('../src/app.js');

test('GET /health répond ok', async () => {
  const res = await request(app).get('/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'ok');
});

test('GET /api/v1/places liste les lieux', async () => {
  const res = await request(app).get('/api/v1/places');
  assert.equal(res.status, 200);
  assert.ok(Array.isArray(res.body.data));
  assert.ok(res.body.meta.total > 0);
});

test('GET /api/v1/places?city=pointe-noire filtre par ville', async () => {
  const res = await request(app).get('/api/v1/places?city=pointe-noire');
  assert.equal(res.status, 200);
  assert.ok(res.body.data.every((p) => p.city === 'pointe-noire'));
});

test('GET /api/v1/places?city=paris est rejeté', async () => {
  const res = await request(app).get('/api/v1/places?city=paris');
  assert.equal(res.status, 400);
});

test('GET /api/v1/places?q= recherche sans tenir compte des accents', async () => {
  const res = await request(app).get('/api/v1/places?q=cote sauvage');
  assert.equal(res.status, 200);
  assert.equal(res.body.data[0].id, 'cote-sauvage');
});

test('CRUD complet sur un lieu', async () => {
  const created = await request(app)
    .post('/api/v1/places')
    .send({ name: 'Chez Test', city: 'brazzaville', category: 'maquis' });
  assert.equal(created.status, 201);
  const id = created.body.data.id;

  const updated = await request(app).patch(`/api/v1/places/${id}`).send({ priceRange: '$' });
  assert.equal(updated.status, 200);
  assert.equal(updated.body.data.priceRange, '$');

  const deleted = await request(app).delete(`/api/v1/places/${id}`);
  assert.equal(deleted.status, 204);

  const missing = await request(app).get(`/api/v1/places/${id}`);
  assert.equal(missing.status, 404);
});

test('POST /api/v1/places valide les données', async () => {
  const res = await request(app).post('/api/v1/places').send({ name: 'X' });
  assert.equal(res.status, 400);
  assert.ok(res.body.details.length > 0);
});

test('la recherche ignore la casse et les accents', async () => {
  const res = await request(app).get('/api/v1/places?q=MÉMORIAL');
  assert.equal(res.status, 200);
  assert.equal(res.body.data[0].id, 'memorial-savorgnan-de-brazza');
});

test('GET /api/v1/places?category=culture&tag=histoire combine les filtres', async () => {
  const res = await request(app).get('/api/v1/places?category=culture&tag=Histoire');
  assert.equal(res.status, 200);
  assert.ok(res.body.data.length > 0);
  assert.ok(res.body.data.every((p) => p.category === 'culture' && p.tags.includes('histoire')));
});

test('la pagination découpe les résultats', async () => {
  const res = await request(app).get('/api/v1/places?limit=2&page=2');
  assert.equal(res.status, 200);
  assert.equal(res.body.data.length, 2);
  assert.equal(res.body.meta.page, 2);
  assert.equal(res.body.meta.pages, Math.ceil(res.body.meta.total / 2));
});

test('GET /api/v1/places/:id renvoie un lieu existant', async () => {
  const res = await request(app).get('/api/v1/places/cote-sauvage');
  assert.equal(res.status, 200);
  assert.equal(res.body.data.city, 'pointe-noire');
});

test('PATCH et DELETE sur un lieu inexistant renvoient 404', async () => {
  const patch = await request(app).patch('/api/v1/places/inconnu').send({ name: 'Nouveau nom' });
  assert.equal(patch.status, 404);
  const del = await request(app).delete('/api/v1/places/inconnu');
  assert.equal(del.status, 404);
});
