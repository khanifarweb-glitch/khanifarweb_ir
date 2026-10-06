// قالب‌بندی تاریخ شمسی با Intl داخلی مرورگر (بدون کتابخانه)
const fmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  timeZone: "Asia/Tehran",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const toDate = (v: string | Date) => (v instanceof Date ? v : new Date(v));

export const formatPersianDate = (v: string | Date) => fmt.format(toDate(v));
export const toIsoDateTime = (v: string | Date) => toDate(v).toISOString();
