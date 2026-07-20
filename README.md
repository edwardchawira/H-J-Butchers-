# Butcher

A premium online butcher storefront built with Next.js App Router, TypeScript and Tailwind CSS. The concept is inspired by traditional British butchery: rich oxblood and brass styling, category-led shopping, chilled delivery messaging and a complete mock purchase journey.

## Features

- Responsive homepage with hero, departments, bestsellers, promotion, reviews, recipes and newsletter sections
- Product catalogue with live header search, category/sourcing/weight/price filters, sorting and load-more browsing
- Product details with gallery zoom, size and quantity selection, nutrition accordion, reviews and related items
- Zustand basket and wishlist persisted to `localStorage`
- Quick view and slide-in basket built with accessible Radix UI primitives
- Mock `WELCOME10` discount and free delivery on orders of £75 or more
- Three-step checkout with address validation, non-Sunday delivery slots and Stripe-ready payment UI
- About, contact/FAQ, recipes/articles, delivery, privacy and terms pages
- Route metadata and keyboard-visible focus styling

## Stack

- Next.js 16 App Router (satisfies the Next.js 14+ requirement)
- React 19 and TypeScript
- Tailwind CSS 4
- Zustand state persistence
- Radix UI Dialog, Accordion and Slot primitives
- Lucide React icons
- `next/font` with Playfair Display and Inter

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For production verification:

```bash
npm run lint
npm run build
npm start
```

## Key Routes

| Route | Purpose |
| --- | --- |
| `/` | Storefront homepage |
| `/shop` | Filterable catalogue and product search results |
| `/products/[slug]` | Product detail and add-to-basket |
| `/category/[slug]` | Department catalogue |
| `/cart` | Basket, discount and delivery calculation |
| `/checkout` | Mock delivery and payment journey |
| `/wishlist` | Saved products |
| `/about` | Brand story and sourcing commitments |
| `/contact` | Contact form and FAQ |
| `/blog` and `/blog/[slug]` | Recipe journal |

## Content And Commerce Data

The catalogue is entirely local: [data/products.ts](./data/products.ts) provides 24 products, with categories, reviews and recipe posts in the remaining `data/` modules. Product photography uses optimized Unsplash image URLs as presentation placeholders; there are no product, payment or order APIs.

Basket and wishlist contents persist only in the visitor's browser. Checkout and contact submission are UI demonstrations and do not transmit or process personal or payment data.
