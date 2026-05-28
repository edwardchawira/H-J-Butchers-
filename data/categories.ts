export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  { slug: "beef", name: "Beef", description: "Matured steaks and grass-fed roasting joints.", image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=900&q=80" },
  { slug: "pork", name: "Pork", description: "Free-range chops, joints and crackling.", image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?auto=format&fit=crop&w=900&q=80" },
  { slug: "lamb", name: "Lamb", description: "Sweet Welsh lamb, expertly trimmed.", image: "/images/welsh-lamb-cutlets.jpg" },
  { slug: "chicken", name: "Chicken", description: "Slow-grown birds and easy midweek cuts.", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=900&q=80" },
  { slug: "bbq", name: "BBQ", description: "Fire-ready boxes, kebabs and glazed ribs.", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=80" },
  { slug: "beverages", name: "Beverages", description: "Refreshing drinks selected for every gathering.", image: "/images/sparletta-cherry-plum.png" },
  { slug: "snacks-confectionery", name: "Snacks and Confectionery", description: "Sweet treats and savoury snacks for sharing.", image: "/images/snacks-confectionery-hero.png" },
  { slug: "sausages", name: "Sausages", description: "Small-batch sausages made in-house.", image: "https://images.unsplash.com/photo-1585325701165-351af916e581?auto=format&fit=crop&w=900&q=80" },
  { slug: "burgers", name: "Burgers", description: "Prime beef patties for grill season.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80" },
  { slug: "deli", name: "Deli", description: "Bacon, charcuterie and family favourites.", image: "https://images.unsplash.com/photo-1625938145744-e380515399bf?auto=format&fit=crop&w=900&q=80" },
];

export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
