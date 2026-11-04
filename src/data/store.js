import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';

// Stockage en mémoire, initialisé depuis places.json.
// À remplacer par une vraie base de données (voir la roadmap du README).
const seed = JSON.parse(readFileSync(new URL('./places.json', import.meta.url), 'utf-8'));

let places = seed.map((p) => ({
  ...p,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

const normalize = (s) =>
  String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

export function findAll({ city, category, q, tag } = {}) {
  return places.filter((p) => {
    if (city && p.city !== city) return false;
    if (category && p.category !== category) return false;
    if (tag && !(p.tags || []).some((t) => normalize(t) === normalize(tag))) return false;
    if (q) {
      const haystack = normalize([p.name, p.description, p.neighborhood, ...(p.tags || [])].join(' '));
      if (!haystack.includes(normalize(q))) return false;
    }
    return true;
  });
}

export function findById(id) {
  return places.find((p) => p.id === id);
}

export function create(data) {
  const now = new Date().toISOString();
  const place = { id: randomUUID(), ...data, createdAt: now, updatedAt: now };
  places.push(place);
  return place;
}

export function update(id, data) {
  const index = places.findIndex((p) => p.id === id);
  if (index === -1) return null;
  places[index] = { ...places[index], ...data, id, updatedAt: new Date().toISOString() };
  return places[index];
}

export function remove(id) {
  const before = places.length;
  places = places.filter((p) => p.id !== id);
  return places.length < before;
}
