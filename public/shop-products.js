/* ============================================================
   MARAPONE SHOP — product list
   ------------------------------------------------------------
   This is the ONLY file you edit to add or remove products.
   No build/logic changes needed — just add an object below.

   HOW TO ADD A PRODUCT
   1. In your Stripe Dashboard: create the Product + Price, then
      create a Payment Link for it
      (Product → "..." menu → Create payment link).
      Copy the URL — it looks like  https://buy.stripe.com/xxxxxxxx
      (Checkout happens 100% on Stripe — your site never sees cards.)
   2. Put the product photo(s) in  /public/shop/  (e.g. tee-front.jpg).
   3. Add an object to the array below, then commit & push.

   FIELDS
     name        (required)  product title
     price       (required)  display price string, e.g. '$35 CAD'
                             (Stripe charges the real amount on its page)
     image       optional    '/shop/your-photo.jpg'
     images      optional    array for front/back hover, e.g.
                             ['/shop/tee-front.jpg', '/shop/tee-back.jpg']
     description optional    short blurb under the title
     buyUrl      required to sell — your Stripe Payment Link.
                             Omit it to show a "Coming soon" button.
     soldOut     optional    true → disabled "Sold out" button
   ============================================================ */
window.MARAPONE_PRODUCTS = [

  // ── EXAMPLE — remove the leading // on each line to enable it,
  //    and replace the values with your real product + Stripe link:
  //
  // {
  //   name: 'Marapone Heavyweight Tee',
  //   price: '$35 CAD',
  //   images: ['/shop/tee-front.jpg', '/shop/tee-back.jpg'],
  //   description: 'Heavyweight cotton. Front + back print. Small batch.',
  //   buyUrl: 'https://buy.stripe.com/REPLACE_WITH_YOUR_LINK',
  // },

];
