import * as store from '../data/store.js';
import { HttpError } from '../middlewares/errors.js';

export function list(req, res) {
  const { page, limit, ...filters } = req.validated.query;
  const all = store.findAll(filters);
  const start = (page - 1) * limit;
  res.json({
    data: all.slice(start, start + limit),
    meta: { total: all.length, page, limit, pages: Math.ceil(all.length / limit) },
  });
}

export function getOne(req, res, next) {
  const place = store.findById(req.params.id);
  if (!place) return next(new HttpError(404, 'Lieu introuvable'));
  res.json({ data: place });
}

export function create(req, res) {
  const place = store.create(req.validated.body);
  res.status(201).json({ data: place });
}

export function update(req, res, next) {
  const place = store.update(req.params.id, req.validated.body);
  if (!place) return next(new HttpError(404, 'Lieu introuvable'));
  res.json({ data: place });
}

export function remove(req, res, next) {
  if (!store.remove(req.params.id)) return next(new HttpError(404, 'Lieu introuvable'));
  res.status(204).end();
}
