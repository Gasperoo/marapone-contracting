# Implementation Plans — Deferred Items

These four items were identified in the site audit as high-value additions. Each plan is ready for implementation when you decide to proceed.

---

## Item 3 — Blog / Resources Section

### Goal
Build an SEO content machine. Construction and logistics companies search for solutions to their specific problems before they search for vendors. A blog captures that intent.

### What to Build
- A `/blog` index page listing all posts (dark-theme, matches site design)
- Individual `/blog/[slug]` pages for each article
- A consistent post template: hero heading, body copy, CTA at the bottom

### Content Strategy (first 5 articles)
These are high-intent search terms your exact buyers use:

1. "How to use AI for blueprint review before bidding" — targets construction PMs and GCs
2. "Why freight invoice errors go undetected (and how to catch them automatically)" — targets logistics operators
3. "Air-gapped AI: what it means and why it matters for construction data" — differentiates your offering vs. cloud tools
4. "The real cost of manual RFI management on large construction projects" — pain-led, conversion-focused
5. "What 'owning your AI' actually means vs. paying SaaS subscriptions forever" — converts competitor comparison searches

### Technical Implementation
- Add `blog.html` (index) and a `blog-post-template.html` to the project
- Each individual post is a new HTML file: `blog/ai-blueprint-review.html` etc.
- Add `/blog` and `/blog/(.*)` rewrites to `vercel.json`
- Add `/blog` and individual post URLs to `sitemap.xml`
- Add Blog link to footer navigation (not the main nav — keep that clean)
- Add an `ArticleSchema` JSON-LD block to each post page

### Timeline Estimate
- Template setup: 2–3 hours
- Each article (writing + page): ~1–2 hours per post
- First batch of 5 posts: 1–2 days

---

## Item 4 — Team Bios on About Page

### Goal
Remove the biggest trust gap on the site. Buyers considering a $5K–$15K custom build want to know who they're dealing with. The About page currently has no faces or names beyond "Marapone Team."

### What to Add
- A "Who We Are" section on `/about` between the founding story and the differentiators
- At minimum: name, role, location, 2–3 sentences, a photo
- Optionally: LinkedIn link, a quote or personal note

### Content Needed (you provide)
For each team member:
- Full name
- Role / title
- Location (city)
- Headshot photo (ideally 300x300px or larger, square crop)
- 2–3 sentence bio
- LinkedIn URL (optional)

### Technical Implementation
- Read the full `about.html` to understand the current section flow
- Add a new section between `<!-- FOUNDING STORY -->` and `<!-- WHAT WE KNOW -->` (or wherever the content flows naturally)
- Style: dark card grid (2 columns on desktop, 1 on mobile), photo in a circle or square with a border, name/role in Bebas Neue, bio in DM Sans
- Match the existing dark-theme palette exactly

### Design Reference
The existing `bg-gunmetal` card pattern from the services page works well here. Each person gets a card.

---

## Item 9 — Stronger Testimonials

### Goal
Turn three anonymous quotes into a credible social proof system. Right now the testimonials exist but can't be verified by anyone. Even one named client quote would outweigh all three anonymous ones.

### Approach Options (in order of impact)

**Option A — Get one named quote**
Reach out to one past client and ask if they'd be comfortable with a short attributed testimonial (name, company type, location — doesn't need to be full company name). Even "John M., General Contractor, Ontario" is 10x more trustworthy than "— General Contractor, Ontario."

**Option B — LinkedIn-style attribution**
Ask past clients for a LinkedIn recommendation. Screenshot it (with their name/photo) and embed it on the Work or homepage. Use `og:image` equivalent but as inline assets.

**Option C — Add more anonymous quotes with more specificity**
If clients won't be named, add more quotes with very specific metric references ("cut 6 hours a week to 45 minutes", "caught 3 billing errors in the first month"). Specificity does a lot of work when attribution can't.

**Option D — A dedicated Testimonials page**
If you have 6+ quotes (or a mix of quotes and named endorsements), create a `/testimonials` page. Link it from the homepage carousel's "More stories →" CTA.

### Technical Implementation
- Homepage carousel already exists — just needs more quote cards added to the data array
- A `/testimonials` page would follow the same pattern as `/work` (dark cards, metrics-driven layout)
- If using LinkedIn screenshots: add images to `public/images/testimonials/` and reference them in `<img>` tags

---

## Item 10 — Video Demos

### Goal
The "How It Works" page has placeholder SVGs where visuals should be. A short video showing the system processing a real document would do more conversion work than any amount of copy.

### What to Record (in order of impact)

1. **Demo video** (~90 seconds): Screen recording of the system receiving a PDF and producing a structured report. Narrate what's happening. Doesn't need to be polished — authentic is better.

2. **How it works walkthrough** (~2 minutes): Match the four-phase process (Assess → Scope → Build → Yours) with real footage or screencasts at each stage.

3. **Client testimonial videos** (30–60 seconds each): Ask willing clients to record a short video on their phone. "Here's the problem we had, here's what Marapone built, here's what changed." These are gold.

### Hosting
- Host videos on YouTube or Vimeo (unlisted is fine — you control the link)
- Embed via `<iframe>` on the relevant page

### CSP Update Required
If embedding YouTube iframes, `vercel.json` CSP will need an update:
- Add `https://www.youtube.com` and `https://www.youtube-nocookie.com` to `frame-src`
- Replace `child-src 'none'` with `child-src https://www.youtube-nocookie.com`

For Vimeo:
- Add `https://player.vimeo.com` to `frame-src` and `child-src`

### Technical Implementation
- On `how-it-works.html`: Replace the four placeholder SVG sections with either a video embed or a thumbnail image linking to the video
- On `index.html`: Add a video section between the testimonials carousel and the pricing section
- Create a simple `<div class="aspect-video rounded-xl overflow-hidden">` wrapper around each `<iframe>` for responsive sizing

### Thumbnail / Poster Consideration
If using `<video>` tags (self-hosted), add a `poster` attribute pointing to a still frame so the player looks good before play.
