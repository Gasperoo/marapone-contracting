/* ============================================================
   MARAPONE SHOP — product list
   ------------------------------------------------------------
   This is the ONLY file you edit to add or remove products.
   No build/logic changes needed — just fill in the objects below.

   The page lays cards out 3 across, so every 3 products = one row.
   Right now there are 9 placeholder cards (a 3x3 grid):
     Row 1 → Construction tees
     Row 2 → Logistics tees
     Row 3 → Hats

   TO FILL IN A CARD
   1. In your Stripe Dashboard: create the Product + Price, then
      create a Payment Link for it
      (Product → "..." menu → Create payment link).
      Copy the URL — it looks like  https://buy.stripe.com/xxxxxxxx
      (Checkout happens 100% on Stripe — your site never sees cards.)
   2. Put the product photo(s) in  /public/shop/  (e.g. constr-tee-1.jpg).
   3. On the matching object below, fill in `images`, `price`, and `buyUrl`
      (and tweak `name`/`description`), then commit & push.

   FIELDS
     name        product title
     price       display price string, e.g. '$35 CAD'  (Stripe charges the real amount)
     image       optional   '/shop/your-photo.jpg'
     images      optional   array for front/back hover, e.g.
                            ['/shop/tee-front.jpg', '/shop/tee-back.jpg']
     description optional   short blurb under the title
     buyUrl      add your Stripe Payment Link to enable buying.
                            While empty, the card shows a "Coming soon" button.
     soldOut     optional   true → disabled "Sold out" button

   To remove the blank placeholders entirely, just delete the objects.
   To hide a single card for now, delete that object (or wrap it in /* */).
   ============================================================ */
window.MARAPONE_PRODUCTS = [

  // ── Row 1 — Construction tees ───────────────────────────────
  {
    name: 'Construction Tee #1',
    price: 'TBA',
    description: '',
    images: [],          // e.g. ['/shop/constr-tee-1-front.jpg', '/shop/constr-tee-1-back.jpg']
    buyUrl: '',          // e.g. 'https://buy.stripe.com/...'
  },
  {
    name: 'Construction Tee #2',
    price: 'TBA',
    description: '',
    images: [],
    buyUrl: '',
  },
  {
    name: 'Construction Tee #3',
    price: 'TBA',
    description: '',
    images: [],
    buyUrl: '',
  },

  // ── Row 2 — Logistics tees ──────────────────────────────────
  {
    name: 'Logistics Tee #1',
    price: 'TBA',
    description: '',
    images: [],
    buyUrl: '',
  },
  {
    name: 'Logistics Tee #2',
    price: 'TBA',
    description: '',
    images: [],
    buyUrl: '',
  },
  {
    name: 'Logistics Tee #3',
    price: 'TBA',
    description: '',
    images: [],
    buyUrl: '',
  },

  // ── Row 3 — Hats ────────────────────────────────────────────
  {
    name: 'Hat #1',
    price: 'TBA',
    description: '',
    images: [],
    buyUrl: '',
  },
  {
    name: 'Hat #2',
    price: 'TBA',
    description: '',
    images: [],
    buyUrl: '',
  },
  {
    name: 'Hat #3',
    price: 'TBA',
    description: '',
    images: [],
    buyUrl: '',
  },

];
