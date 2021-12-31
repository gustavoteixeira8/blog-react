import slugify from 'slugify';

export const generateSlug = (str) =>
  slugify(str, {
    replacement: '-',
    lower: true,
    strict: true,
    trim: true,
  });
