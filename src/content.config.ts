/**
 * تعریف مجموعه‌های محتوا. فایل‌هایی که نامشان با "_" شروع شود نادیده گرفته می‌شوند
 * (برای قالب نمونه). هر فیلد اشتباه هنگام build خطای واضح می‌دهد.
 */
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const md = (dir: string) => glob({ pattern: "**/[^_]*.md", base: `./src/content/${dir}` });

// خدمات: id فایل (design / website-support / ai) با صفحه خدمت یکی است
const services = defineCollection({
  loader: md("services"),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(), // متای صفحه
    summary: z.string(), // جمله معرفی زیر عنوان
    order: z.number().default(0),
  }),
});

// نمونه‌کار: فقط پروژه‌های واقعی
const portfolio = defineCollection({
  loader: md("portfolio"),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      type: z.string(), // مثلاً سایت خدماتی
      services: z.array(z.string()), // خدمات انجام‌شده
      summary: z.string(),
      image: image(),
      imageAlt: z.string(),
      url: z.string().url().optional(),
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

// مقاله: هر مقاله CTA مرتبط دارد
const blog = defineCollection({
  loader: md("blog"),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      cta: z.enum(["design", "support", "ai"]).default("design"),
      draft: z.boolean().default(false),
    }),
});

export const collections = { services, portfolio, blog };
