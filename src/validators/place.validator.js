import { z } from 'zod';
import { CITY_SLUGS, CATEGORY_SLUGS } from '../data/constants.js';

export const placeSchema = z.object({
  name: z.string().trim().min(2).max(120),
  city: z.enum(CITY_SLUGS),
  category: z.enum(CATEGORY_SLUGS),
  neighborhood: z.string().trim().max(120).optional(),
  description: z.string().trim().max(1000).optional(),
  address: z.string().trim().max(200).optional(),
  phone: z.string().trim().max(30).optional(),
  website: z.string().url().optional(),
  priceRange: z.enum(['$', '$$', '$$$']).optional(),
  coordinates: z
    .object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    })
    .optional(),
  tags: z.array(z.string().trim().min(1).max(40)).max(20).optional(),
});

export const placeUpdateSchema = placeSchema.partial();

export const listQuerySchema = z.object({
  city: z.enum(CITY_SLUGS).optional(),
  category: z.enum(CATEGORY_SLUGS).optional(),
  q: z.string().trim().min(1).optional(),
  tag: z.string().trim().min(1).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
