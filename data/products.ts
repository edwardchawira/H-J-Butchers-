export type StockLevel = "high" | "low" | "out";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  weight: string;
  weightOptions: string[];
  images: string[];
  inStock: boolean;
  stockLevel: StockLevel;
  rating: number;
  reviewCount: number;
  tags: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  } | null;
  imageFit?: "cover" | "contain";
  featured?: boolean;
  newArrival?: boolean;
};

const imagery = {
  beef: [
    "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1000&q=80",
  ],
  pork: [
    "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1000&q=80",
  ],
  lamb: [
    "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=1000&q=80",
  ],
  chicken: [
    "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=1000&q=80",
  ],
  bbq: [
    "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
  ],
  beverages: [
    "/images/sparletta-cherry-plum-product.png",
    "/images/sparletta-cherry-plum.png",
  ],
  "snacks-confectionery": [
    "/images/snacks-confectionery-hero.png",
    "/images/snacks-confectionery-hero.png",
  ],
  sausages: [
    "https://images.unsplash.com/photo-1585325701165-351af916e581?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1599921841143-819065a55cc6?auto=format&fit=crop&w=1000&q=80",
  ],
  burgers: [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80",
  ],
  deli: [
    "https://images.unsplash.com/photo-1625938145744-e380515399bf?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80",
  ],
};

const make = (
  id: string,
  name: string,
  category: keyof typeof imagery,
  price: number,
  weight: string,
  description: string,
  extras: Partial<Product> = {},
): Product => ({
  id,
  slug: name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
  name,
  category,
  description,
  price,
  weight,
  weightOptions: [weight, "Family Pack"],
  images: imagery[category],
  inStock: true,
  stockLevel: "high",
  rating: 4.8,
  reviewCount: 42,
  tags: ["British", "Freshly prepared"],
  nutritionalInfo: { calories: 210, protein: 27, fat: 11, carbs: 0 },
  ...extras,
});

export const products: Product[] = [
  make("b1", "Ribeye Steak 1kg", "beef", 8.99, "1kg", "Richly marbled ribeye steak with a juicy, full-flavoured finish.", { featured: true, images: ["/images/ribeye-steak-1kg-product.png"], reviewCount: 126, weightOptions: ["1kg"], tags: ["British", "Grass fed"] }),
  make("b2", "Centre Cut Fillet Steak", "beef", 29.5, "2 x 200g", "Exceptionally tender centre-cut fillet, trimmed by hand.", { featured: true, rating: 4.9, reviewCount: 84, stockLevel: "low" }),
  make("b3", "Beef Brisket 1kg", "beef", 18.75, "1kg", "Rich beef brisket for Sunday roasts or low-and-slow smoking.", { images: ["/images/beef-brisket-1kg-product.png"], tags: ["British", "Grass fed"], weightOptions: ["1kg"] }),
  make("b4", "Steak Mince 5% Fat", "beef", 7.25, "500g", "Lean mince made fresh from selected steak trim.", { images: ["/images/steak-mince-5-fat-product.png"], tags: ["Lean", "High protein"], nutritionalInfo: { calories: 155, protein: 30, fat: 5, carbs: 0 } }),
  make("b5", "Beef Boerewors 1kg", "beef", 16.5, "1kg", "Traditional coiled beef boerewors seasoned for grilling, braais and hearty family meals.", { images: ["/images/beef-boerewors-1kg-product.png"], newArrival: true, tags: ["Beef sausage", "Grill ready"], nutritionalInfo: null, weightOptions: ["1kg"] }),
  make("p1", "Free Range Pork Chops", "pork", 9.95, "2 x 300g", "Thick-cut loin chops with crisp crackling-ready rind.", { featured: true, tags: ["Free Range", "British"], rating: 4.7 }),
  make("p2", "Rolled Pork Belly Porchetta", "pork", 25, "1.5kg", "Herb-stuffed belly rolled in-house for an impressive roast.", { newArrival: true, tags: ["Free Range", "Chef prepared"] }),
  make("p3", "Honey Glazed Gammon Joint", "pork", 19.5, "1.2kg", "Succulent cured gammon with a sweet honey glaze included.", { stockLevel: "low" }),
  make("l1", "Welsh Lamb Cutlets", "lamb", 19.95, "6 cutlets", "Sweet, tender lamb cutlets expertly French-trimmed.", { featured: true, images: ["/images/welsh-lamb-cutlets.jpg", imagery.lamb[1]], tags: ["Welsh", "Grass fed"], rating: 4.9, reviewCount: 69 }),
  make("l2", "Leg of Lamb Boneless", "lamb", 28.5, "1.4kg", "Easy-carve boneless lamb leg, perfect for a family roast.", { images: ["/images/leg-of-lamb-boneless.jpg", imagery.lamb[1]], tags: ["Welsh", "Grass fed"] }),
  make("l3", "Minted Lamb Koftas", "lamb", 8.95, "6 pack", "Hand-shaped koftas with mint, garlic and gentle spice.", { newArrival: true, images: ["/images/minted-lamb-koftas.jpg", imagery.lamb[1]], weightOptions: ["6 pack", "12 pack"] }),
  make("c1", "Corn-Fed Chicken Breast", "chicken", 10.5, "4 x 180g", "Plump, succulent chicken breasts with delicate flavour.", { featured: true, tags: ["Free Range", "High protein"], nutritionalInfo: { calories: 120, protein: 26, fat: 2, carbs: 0 } }),
  make("c2", "Whole Free Range Chicken", "chicken", 14.95, "1.8kg", "Slow-grown whole bird with exceptional roasting flavour.", { tags: ["Free Range", "British"] }),
  make("c3", "Garlic Butter Chicken Kievs", "chicken", 8.5, "2 pack", "Handmade breaded breasts with molten garlic parsley butter.", { newArrival: true, stockLevel: "low" }),
  make("q1", "Smoky BBQ Rib Rack", "bbq", 17.95, "750g", "Tender pork ribs glazed in our smoky molasses barbecue sauce.", { featured: true, tags: ["Marinated", "BBQ ready"] }),
  make("q2", "Butcher's BBQ Feast Box", "bbq", 49.95, "Serves 6", "Burgers, sausages, skewers and ribs curated for the grill.", { featured: true, weightOptions: ["Serves 6", "Serves 10"], rating: 4.9, reviewCount: 108 }),
  make("q3", "Pepper Steak Kebabs", "bbq", 12.95, "4 skewers", "Tender steak cubes, peppers and onions, ready for flames.", { tags: ["British", "BBQ ready"], stockLevel: "low" }),
  make("v1", "Sparletta Cherry Plum Soft Drink", "beverages", 2.99, "Single can", "A sparkling cherry plum soft drink, best served ice cold alongside your barbecue favourites.", { newArrival: true, tags: ["Soft drink", "Low kilojoule"], nutritionalInfo: null, weightOptions: ["Single can"] }),
  make("v2", "Sparletta Pinenut Soft Drink", "beverages", 2.99, "330ml can", "A bright and refreshing pine nut soft drink, best served chilled with your meal.", { images: ["/images/sparletta-pinenut-product.png"], newArrival: true, tags: ["Soft drink"], nutritionalInfo: null, weightOptions: ["330ml can"] }),
  make("v3", "Sparletta Creme Soda Soft Drink", "beverages", 2.99, "330ml can", "A smooth and refreshing creme soda soft drink, best served ice cold with your meal.", { images: ["/images/sparletta-creme-soda-product.png"], newArrival: true, tags: ["Soft drink"], nutritionalInfo: null, weightOptions: ["330ml can"] }),
  make("v4", "Pfuko Maheu Buttermilk 500ml", "beverages", 2.99, "500ml bottle", "A smooth and refreshing ready-to-drink cultured buttermilk beverage, best served chilled.", { images: ["/images/pfuko-maheu-buttermilk-product.png"], newArrival: true, tags: ["Buttermilk drink"], nutritionalInfo: null, weightOptions: ["500ml bottle"] }),
  make("v5", "Original Pfuko Dairiboard Maheu", "beverages", 3.5, "500ml bottle", "The original ready-to-drink Pfuko yeMaheu beverage from Dairibord, best served chilled.", { images: ["/images/original-pfuko-dairiboard-maheu-product.png"], imageFit: "contain", newArrival: true, tags: ["Maheu drink"], nutritionalInfo: null, weightOptions: ["500ml bottle"] }),
  make("v6", "Mazoe Orange 2L", "beverages", 8.99, "2L bottle", "Original Mazoe orange crush, a rich and refreshing fruit drink best served chilled.", { images: ["/images/mazoe-orange-2l-product.png"], imageFit: "contain", newArrival: true, tags: ["Fruit drink"], nutritionalInfo: null, weightOptions: ["2L bottle"] }),
  make("v7", "Mazoe Cream Soda 2L", "beverages", 8.99, "2L bottle", "Original Mazoe cream soda flavoured syrup, a refreshing drink best served chilled.", { images: ["/images/mazoe-cream-soda-2l-product.png"], imageFit: "contain", newArrival: true, tags: ["Flavoured syrup"], nutritionalInfo: null, weightOptions: ["2L bottle"] }),
  make("v8", "Cascade Baobab 500ml Bottle", "beverages", 2.99, "500ml bottle", "A creamy baobab dairy fruit mix drink, refreshing and ready to enjoy chilled.", { images: ["/images/cascade-baobab-500ml-product.png"], imageFit: "contain", newArrival: true, tags: ["Dairy fruit mix"], nutritionalInfo: null, weightOptions: ["500ml bottle"] }),
  make("v9", "Cascade Dairy Mix Tropical and Orange 500ml", "beverages", 2.99, "500ml bottle", "A tropical punch flavoured dairy fruit mix drink with bright orange notes, best served chilled.", { images: ["/images/cascade-tropical-orange-500ml-product.png"], imageFit: "contain", newArrival: true, tags: ["Dairy fruit mix"], nutritionalInfo: null, weightOptions: ["500ml bottle"] }),
  make("v10", "Carling Black Label Beer", "beverages", 2.2, "Each", "A refreshing Carling Black Label beer, best served chilled.", { images: ["/images/carling-black-label-beer-product.png"], imageFit: "contain", newArrival: true, tags: ["Beer"], nutritionalInfo: null, weightOptions: ["Each"] }),
  make("v11", "Hunter's Gold Case of 6", "beverages", 19.99, "6 x 330ml", "A six-pack of Hunter's Gold real cider, crisp and refreshing when served chilled.", { images: ["/images/hunters-gold-case-of-6-product.png"], imageFit: "contain", newArrival: true, tags: ["Cider"], nutritionalInfo: null, weightOptions: ["6 x 330ml"] }),
  make("v12", "Mazoe Raspberry 2L", "beverages", 8.99, "2L bottle", "Original Mazoe raspberry flavoured syrup, a rich fruit drink best served chilled.", { images: ["/images/mazoe-raspberry-2l-product.png"], imageFit: "contain", newArrival: true, tags: ["Flavoured syrup"], nutritionalInfo: null, weightOptions: ["2L bottle"] }),
  make("v13", "Viceroy Brandy", "beverages", 25, "750ml bottle", "Aged Viceroy potstilled brandy with a smooth, warming finish.", { images: ["/images/viceroy-brandy-product.png"], imageFit: "contain", newArrival: true, tags: ["Brandy"], nutritionalInfo: null, weightOptions: ["750ml bottle"] }),
  make("v14", "Belgravia London Dry Gin & Dry Lemon", "beverages", 19.99, "6 x 275ml", "A six-pack of Belgravia London Dry Gin and dry lemon, perfectly mixed and ready to serve chilled.", { images: ["/images/belgravia-gin-dry-lemon-6-pack-product.png"], imageFit: "contain", newArrival: true, tags: ["Gin & dry lemon"], nutritionalInfo: null, weightOptions: ["6 x 275ml"] }),
  make("v15", "Cascade Long Life Orange", "beverages", 6.99, "1L carton", "A long-life orange flavoured dairy fruit mix drink, ready to enjoy chilled.", { images: ["/images/cascade-long-life-orange-1l-product.png"], imageFit: "contain", newArrival: true, tags: ["Dairy fruit mix"], nutritionalInfo: null, weightOptions: ["1L carton"] }),
  make("n1", "Willards Things 150g", "snacks-confectionery", 2.99, "150g bag", "A bold, spicy savoury corn snack in a foil-fresh pack, perfect for sharing.", { images: ["/images/willards-things-150g-product.png"], imageFit: "contain", newArrival: true, tags: ["Savoury snack"], nutritionalInfo: null, weightOptions: ["150g bag"] }),
  make("n2", "Mr Freeze Freezits Individual", "snacks-confectionery", 0.9, "175ml individual", "A fruity Mr Freeze flavoured ice drink, perfect for freezing and enjoying cold.", { images: ["/images/mr-freeze-freezits-individual-product.png"], imageFit: "contain", newArrival: true, tags: ["Frozen treat"], nutritionalInfo: null, weightOptions: ["175ml individual"] }),
  make("n3", "Crunchy Cookies Proton Ramba Warairi 500g", "snacks-confectionery", 5.99, "500g bag", "Original flavour crunchy cookies from Proton, baked for a satisfying teatime treat.", { images: ["/images/crunchy-cookies-proton-ramba-warairi-500g-product.png"], imageFit: "contain", newArrival: true, tags: ["Biscuits"], nutritionalInfo: null, weightOptions: ["500g bag"] }),
  make("n4", "Uni Salted Maputi 50g", "snacks-confectionery", 0.8, "50g bag", "Light and crunchy salted maputi, an easy savoury snack for any time of day.", { images: ["/images/uni-salted-maputi-50g-product.png"], imageFit: "contain", newArrival: true, tags: ["Savoury snack"], nutritionalInfo: null, weightOptions: ["50g bag"] }),
  make("n5", "Charhons Quality Biscuits 500g", "snacks-confectionery", 3.99, "500g bag", "Classic crisp quality biscuits, ideal for sharing or enjoying with tea.", { images: ["/images/charhons-quality-biscuits-500g-product.png"], imageFit: "contain", newArrival: true, tags: ["Biscuits"], nutritionalInfo: null, weightOptions: ["500g bag"] }),
  make("n6", "Bobby Strawberry Bubblegum", "snacks-confectionery", 8.99, "100 pieces", "Strawberry flavoured bubblegum in a large sharing bag of individually wrapped pieces.", { images: ["/images/bobby-strawberry-bubblegum-product.png"], imageFit: "contain", newArrival: true, tags: ["Sweets"], nutritionalInfo: null, weightOptions: ["100 pieces"] }),
  make("n7", "Lobels Lemon Creams 150g", "snacks-confectionery", 1.99, "150g pack", "Classic crunchy citrus biscuits with a smooth lemon cream filling.", { images: ["/images/lobels-lemon-creams-150g-product.png"], imageFit: "contain", newArrival: true, tags: ["Biscuits"], nutritionalInfo: null, weightOptions: ["150g pack"] }),
  make("n8", "Willards Cheezies 150g", "snacks-confectionery", 2.99, "150g bag", "A crunchy cheese-flavoured snack in a foil-packed bag for extra freshness.", { images: ["/images/willards-cheezies-150g-product.png"], imageFit: "contain", newArrival: true, tags: ["Savoury snack"], nutritionalInfo: null, weightOptions: ["150g bag"] }),
  make("n9", "Spud Tomato Ketchup", "snacks-confectionery", 3.2, "Bag", "Rippled potato chips with a bold tomato ketchup flavour.", { images: ["/images/spud-tomato-ketchup-product.png"], imageFit: "contain", newArrival: true, tags: ["Crisps"], nutritionalInfo: null, weightOptions: ["Bag"] }),
  make("n10", "Willards Chicken Flings 150g", "snacks-confectionery", 2.99, "150g bag", "Crunchy chicken-flavoured corn snacks packed for a bold savoury bite.", { images: ["/images/willards-chicken-flings-150g-product.png"], imageFit: "contain", newArrival: true, tags: ["Savoury snack"], nutritionalInfo: null, weightOptions: ["150g bag"] }),
  make("n11", "Willards Jupiters 150g", "snacks-confectionery", 2.99, "150g bag", "Out-of-this-world flavoured corn snacks in a foil-packed sharing bag.", { images: ["/images/willards-jupiters-150g-product.png"], imageFit: "contain", newArrival: true, tags: ["Savoury snack"], nutritionalInfo: null, weightOptions: ["150g bag"] }),
  make("s1", "Cumberland Pork Sausages", "sausages", 6.95, "6 pack", "Coarsely ground pork with pepper, sage and nutmeg.", { featured: true, tags: ["Free Range", "Gluten free"], weightOptions: ["6 pack", "12 pack"] }),
  make("s2", "Pork & Caramelised Onion Sausages", "sausages", 7.25, "6 pack", "Award-style bangers balanced with sweet cooked onion.", { rating: 4.7 }),
  make("s3", "Chicken & Herb Sausages", "sausages", 6.5, "6 pack", "A lighter sausage packed with parsley and thyme.", { tags: ["Lean", "High protein"], nutritionalInfo: { calories: 145, protein: 20, fat: 7, carbs: 2 } }),
  make("g1", "Steakhouse Beef Burgers", "burgers", 8.95, "4 x 170g", "Juicy coarse-ground beef patties made for a hard sear.", { featured: true, images: ["/images/steakhouse-beef-burgers.jpg", imagery.burgers[1]], tags: ["British", "Gluten free"] }),
  make("g2", "Smash Burger Patties", "burgers", 7.5, "8 x 90g", "Thin patties that crisp beautifully on a hot griddle.", { newArrival: true, images: ["/images/smash-burger-patties.jpg", imagery.burgers[1]] }),
  make("d1", "Oak Smoked Bacon Rashers", "deli", 6.75, "300g", "Dry-cured bacon smoked slowly over oak for a rounded finish.", { tags: ["British", "Dry cured"] }),
  make("d2", "Charcuterie Selection", "deli", 16.95, "350g", "Air-dried ham, salami and bresaola for sharing boards.", { tags: ["Ready to eat"], stockLevel: "low" }),
  make("d3", "Steak & Ale Family Pie", "deli", 14.5, "Serves 4", "Shortcrust pie generously filled with slow-cooked beef and ale gravy.", { inStock: false, stockLevel: "out", tags: ["Chef prepared"] }),
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);

export const productsByCategory = (category: string) =>
  products.filter((product) => product.category === category);
