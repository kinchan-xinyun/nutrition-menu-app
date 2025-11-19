export const sanitizeFilename = (filename) => {
  return filename
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '_')
    .replace(/-+/g, '_');
};