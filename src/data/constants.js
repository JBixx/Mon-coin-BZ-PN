export const CITIES = [
  { slug: 'brazzaville', name: 'Brazzaville' },
  { slug: 'pointe-noire', name: 'Pointe-Noire' },
];

export const CATEGORIES = [
  { slug: 'restaurant', name: 'Restaurant' },
  { slug: 'maquis', name: 'Maquis / Nganda' },
  { slug: 'bar', name: 'Bar / Lounge' },
  { slug: 'hotel', name: 'Hôtel' },
  { slug: 'plage', name: 'Plage' },
  { slug: 'nature', name: 'Nature' },
  { slug: 'culture', name: 'Culture / Patrimoine' },
  { slug: 'marche', name: 'Marché' },
  { slug: 'loisirs', name: 'Loisirs' },
];

export const CITY_SLUGS = CITIES.map((c) => c.slug);
export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);
