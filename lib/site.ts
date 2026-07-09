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
  phone: "+1 (415) 555-0148",
  phoneHref: "+14155550148",
  address: "San Francisco · Remote-first",
  social: {
    twitter: "https://twitter.com/hmtech",
    linkedin: "https://linkedin.com/company/hmtech",
    github: "https://github.com/hmtech",
    facebook: "https://facebook.com/hmtech",
    instagram: "https://instagram.com/hmtech",
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
