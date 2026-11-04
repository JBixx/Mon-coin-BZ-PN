import { test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';

process.env.NODE_ENV = 'test';
const { default: app } = await import('../src/app.js');

test('GET / renvoie les informations de l’API', async () => {
  const res = await request(app).get('/');
  assert.equal(res.status, 200);
  assert.equal(res.body.name, 'Mon coin BZ-PN API');
});

test('GET /api/v1/cities liste les deux villes', async () => {
  const res = await request(app).get('/api/v1/cities');
  assert.equal(res.status, 200);
  assert.deepEqual(
    res.body.data.map((c) => c.slug),
    ['brazzaville', 'pointe-noire'],
  );
});

test('GET /api/v1/categories liste les catégories', async () => {
  const res = await request(app).get('/api/v1/categories');
  assert.equal(res.status, 200);
  assert.ok(res.body.data.some((c) => c.slug === 'maquis'));
});

test('une route inconnue renvoie 404', async () => {
  const res = await request(app).get('/api/v1/inexistant');
  assert.equal(res.status, 404);
  assert.match(res.body.error, /Route introuvable/);
});

test('un JSON invalide renvoie 400', async () => {
  const res = await request(app)
    .post('/api/v1/places')
    .set('Content-Type', 'application/json')
    .send('{"name": ');
  assert.equal(res.status, 400);
  assert.equal(res.body.error, 'JSON invalide');
});

test('les en-têtes de sécurité Helmet sont présents', async () => {
  const res = await request(app).get('/health');
  assert.equal(res.headers['x-content-type-options'], 'nosniff');
});
