export const siteConfig = {
  name: "HM Tech",
  legalName: "HM Tech Solutions",
  tagline: "Innovate. Build. Transform.",
  eyebrow: "Empowering Businesses Through Technology",
  url: "https://hmtech.studio",
  foundedYear: 2019,
  description:
    "HM Tech designs websites, develops software, builds AI-powered solutions, and helps businesses grow through technology.",
  email: "hello@hmtech.studio",
  phone: "+94 77 831 8476",
  phoneHref: "+94778318476",
  address: "Havelock, Colombo 05, Sri Lanka",
  social: {
    linkedin: "https://www.linkedin.com/company/hmtech-lk/",
    facebook: "https://www.facebook.com/share/1K6ur2ohAN/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/hmtech.lk?stkn=ZWxmZXMxZTh2cTh4&utm_source=qr",
  },
  businessHours: [
    { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM – 2:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],
};

export function getCopyrightNotice(): string {
  const current = new Date().getFullYear();
  const years =
    siteConfig.foundedYear < current
      ? `${siteConfig.foundedYear}–${current}`
      : `${current}`;
  return `© ${years} ${siteConfig.name}. All rights reserved.`;
}
