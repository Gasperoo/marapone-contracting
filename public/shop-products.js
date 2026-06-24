/* ============================================================
   MARAPONE SHOP — product list
   ------------------------------------------------------------
   This is the ONLY file you edit to add or remove products.
   No build/logic changes needed — just fill in the objects below.

   The page lays cards out 3 across. Right now there are 3 live products
   (Construction, Logistics, and Canada–Italy tees) — all "Coming soon"
   until each gets a Stripe Payment Link. Category filter tabs appear
   automatically from the `category` field.

   TO MAKE A PRODUCT BUYABLE
   1. In your Stripe Dashboard: create the Product + Price, then
      create a Payment Link for it
      (Product → "..." menu → Create payment link).
      Copy the URL — it looks like  https://buy.stripe.com/xxxxxxxx
      (Checkout happens 100% on Stripe — your site never sees cards.)
      For per-size checkout, make ONE Payment Link per size (see `sizes`).
   2. Product photos live in  /public/images/  (served at /images/...).
   3. On the matching object below, fill in `price`, `buyUrl` (or `sizes`),
      then commit & push. The "Coming soon" badge clears automatically.

   FIELDS
     name        product title
     price       display price string, e.g. '$35 CAD'  (Stripe charges the real amount)
     category    optional   groups the product under a filter tab, e.g. 'Construction',
                            'Logistics', 'Hats'. Filter tabs appear automatically once
                            there is more than one distinct category.
     image       optional   '/shop/your-photo.jpg'
     images      optional   array for front/back hover, e.g.
                            ['/shop/tee-front.jpg', '/shop/tee-back.jpg']
     description optional   short blurb (shown on the card + in the quick-view modal)
     buyUrl      add your Stripe Payment Link to enable buying.
                            While empty, the card shows a "Coming soon" button.
     sizes       optional   array of { label, buyUrl } for per-size checkout. Each size
                            needs its OWN Stripe Payment Link. When present, `sizes`
                            drives the buy button (it overrides `buyUrl`). Example:
                              sizes: [
                                { label: 'S',  buyUrl: 'https://buy.stripe.com/aaa' },
                                { label: 'M',  buyUrl: 'https://buy.stripe.com/bbb' },
                                { label: 'L',  buyUrl: 'https://buy.stripe.com/ccc' },
                                { label: 'XL', buyUrl: '' },   // greyed out until linked
                              ]
     badge       optional   small accent badge text on the photo, e.g. 'Small batch',
                            'Only 25 made'. (Ignored while a card is sold out / coming soon.)
     soldOut     optional   true → disabled "Sold out" button + badge

   Every card opens a Quick-view modal (click the photo) and emits Product
   structured data for Google automatically — no extra setup needed.

   To remove the blank placeholders entirely, just delete the objects.
   To hide a single card for now, delete or comment out that object.
   ============================================================ */
window.MARAPONE_PRODUCTS = [

  // ── Construction Tee ────────────────────────────────────────
  {
    name: 'Construction Tee',
    price: 'TBA',
    category: 'Construction',
    description: 'Heavyweight black tee. Mountain crest in safety orange on the left chest, "Private AI for Construction" across the back. Black · Sizes S–2XL.',
    images: ['/images/frontblk%202.jpg', '/images/CONBACKBLK.jpg'],
    buyUrl: '',          // leave empty → "Coming soon". Add a Stripe Payment Link to enable buying.
    sizes: [],           // when buyable: [{ label: 'S', buyUrl: '...' }, … up to '2XL']
    badge: '',
  },

  // ── Logistics Tee ───────────────────────────────────────────
  {
    name: 'Logistics Tee',
    price: 'TBA',
    category: 'Logistics',
    description: 'Heavyweight black tee. Mountain crest in signal green on the left chest, "Private AI for Logistics" across the back. Black · Sizes S–2XL.',
    images: ['/images/frontblklogis.jpg', '/images/LOGBACKBLK.jpg'],
    buyUrl: '',
    sizes: [],
    badge: '',
  },

  // ── Canada–Italy Tee ────────────────────────────────────────
  {
    name: 'Canada–Italy Tee',
    price: 'TBA',
    category: 'Heritage',
    description: 'Canada–Italy flag bar on the chest, "Stop renting your AI. Own the engine." on the back — a nod to our Toronto and Rome crews. Black · Sizes S–2XL.',
    images: ['/images/frontblkCANITA.jpg', '/images/backblkCANITA.jpg'],
    buyUrl: '',
    sizes: [],
    badge: '',
  },

];
