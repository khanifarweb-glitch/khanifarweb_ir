import type { ImageMetadata } from "astro";

// اگر فایل src/assets/about/photo.(jpg|jpeg|png|webp) وجود داشته باشد، خودکار پیدا می‌شود
const photos = import.meta.glob<{ default: ImageMetadata }>("../assets/about/photo.{jpg,jpeg,png,webp}", { eager: true });
export const ownerPhoto: ImageMetadata | undefined = Object.values(photos)[0]?.default;
