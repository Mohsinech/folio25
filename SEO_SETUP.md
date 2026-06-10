# SEO Setup

This portfolio is configured around the primary search identity:

`Mohssine Chedgane • Freelance Designer & Developer`

## Current Technical Setup

- Root metadata is configured in `app/layout.tsx`.
- The default title is `Mohssine Chedgane • Freelance Designer & Developer`.
- The title template is `%s • Mohssine Chedgane`.
- The site description targets freelance design, development, Morocco, fast websites, portfolios, e-commerce, and product interfaces.
- Open Graph metadata is configured for social previews.
- Twitter card metadata is configured.
- Canonical URLs are configured for `/` and `/latest`.
- `robots.txt` is generated from `app/robots.ts`.
- `sitemap.xml` is generated from `app/sitemap.ts`.
- Person JSON-LD is embedded in `app/layout.tsx`.
- The schema job title is `Freelance Designer & Developer`.
- `/latest` has its own metadata in `app/latest/layout.tsx`.

## Target Keywords

Primary:

- Mohssine Chedgane
- Freelance Designer & Developer
- Freelance developer Morocco
- Freelance designer Morocco
- Creative developer Morocco

Secondary:

- Next.js developer Morocco
- Web developer Morocco
- Portfolio developer Morocco
- E-commerce developer Morocco
- SEO developer Morocco

## Google Search Console

1. Add the domain property for `mohssinechedgane.com`.
2. Verify ownership with DNS if possible.
3. Submit the sitemap:

   `https://mohssinechedgane.com/sitemap.xml`

4. Request indexing for:

   - `https://mohssinechedgane.com/`
   - `https://mohssinechedgane.com/latest`
   - `https://mohssinechedgane.com/contact`

5. Check the Pages report after deployment to confirm pages are indexed.

## Content Recommendations

To rank for Morocco freelance designer/developer searches, the site should include more indexable text over time:

- A short homepage intro using the exact phrase `Freelance Designer & Developer`.
- A Morocco/location sentence in visible homepage copy.
- Dedicated case-study pages for Bentofolio, AYourluxe, and Afolki Beauty.
- A services section or page targeting:
  - Web design
  - Frontend development
  - E-commerce development
  - SEO performance optimization
- Real project outcomes where possible, such as PageSpeed scores, SEO scores, conversion improvements, or launch metrics.

## Off-Site Ranking Signals

Technical SEO is only the base. To compete for high rankings, build external trust:

- Add the website link to GitHub, LinkedIn, X/Twitter, Instagram, Behance, Dribbble, and any freelance profiles.
- Keep the same name/title everywhere: `Mohssine Chedgane • Freelance Designer & Developer`.
- Get backlinks from client websites with a footer or credits link.
- Publish project writeups and link them back to the portfolio.
- Add a Google Business Profile if you want local Morocco search visibility.

## Deployment Checklist

Before every deploy:

```bash
npm run lint
npm run build
```

After deploy:

- Open the live site and confirm the page title in the browser tab.
- Test `https://mohssinechedgane.com/robots.txt`.
- Test `https://mohssinechedgane.com/sitemap.xml`.
- Inspect the homepage source for JSON-LD.
- Run Lighthouse or PageSpeed Insights.
- Re-submit changed pages in Google Search Console when major metadata or content changes are shipped.
