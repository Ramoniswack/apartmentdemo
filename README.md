# DemoStay: Pokhara apartment showcase

Next.js 15 (App Router) + React 19. Restructured from the DEMO Estates real-estate template
into an Airbnb-style apartment showcase for Pokhara, Nepal.

    npm install
    npm run dev      # http://localhost:3000
    npm run build

## Page structure
| Route | What it is |
|---|---|
| `/` | Sticky header, AI search hero, category pills, neighbourhoods, flexible stays, curated rows, personalised picks, virtual-tour band, trust row, host CTA |
| `/apartments` | Search results: sticky filter bar (dates, guests, price, filters), listing cards with photo carousels + save, interactive map (split layout on desktop, list/map toggle on mobile) |
| `/apartments/[id]` | Photo gallery + lightbox, highlights, amenities, calendar + price panel (sticky; bottom bar on mobile), reviews, map, house rules, host profile |
| `/experiences` | Local experiences grid |
| `/host` | Value props, earnings estimator, onboarding steps, dashboard preview, apply form |
| `/help` | Searchable help centre with category sidebar and article view |

## Where to edit
- `lib/data.js`: all listings, neighbourhoods, amenities, reviews, experiences, help articles (SAMPLE content)
- `lib/ai.js`: the AI-search sentence parser (runs locally; swap for a model call if wanted)
- `app/globals.css`: design tokens at the top (`--brand` is the red accent)
- `public/images/`: optimised copies of your photos

## Notes
- Saved apartments and currency (NPR/USD) are stored in the browser's localStorage only.
- The map is an illustrative SVG (no map tiles, no API key). Swap `components/MapView.jsx` for Mapbox/Google if you need real geography.
- Listings, prices, ratings, reviews and policies are placeholders. Replace before launch.
