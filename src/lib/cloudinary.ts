/**
 * Server-side Cloudinary helpers. Wire `CLOUDINARY_*` env vars when you
 * replace static image URLs with uploads.
 */
export function cloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

export function cloudinaryUrl(publicId: string, opts?: { width?: number }) {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloud) return null;
  const w = opts?.width ? `w_${opts.width},` : "";
  return `https://res.cloudinary.com/${cloud}/image/upload/${w}f_auto,q_auto/${publicId}`;
}
