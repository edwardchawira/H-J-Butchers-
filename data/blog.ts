export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  introduction: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ultimate-steak-night",
    title: "The Ultimate Steak Night at Home",
    excerpt: "Resting, seasoning and pan temperature: the butcher's route to a restaurant-worthy ribeye.",
    date: "14 May 2026",
    category: "Guides",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80",
    introduction: "A fine steak asks for very little: confident seasoning, a fiercely hot pan and time to rest.",
    sections: [
      { heading: "Choose your cut", paragraphs: ["Ribeye brings generous marbling; fillet gives remarkable tenderness. Take either out of the fridge around 30 minutes before cooking."] },
      { heading: "Cook with confidence", paragraphs: ["Pat dry, season well and sear in a heavy pan. Finish with butter, garlic and thyme, then rest for at least five minutes before slicing."] },
    ],
  },
  {
    slug: "weekend-bbq-box-guide",
    title: "Build a Brilliant Weekend BBQ Box",
    excerpt: "Plan quantities, marinades and cooking order for relaxed summer hosting.",
    date: "02 May 2026",
    category: "Outdoor Cooking",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1200&q=80",
    introduction: "A memorable barbecue is less about juggling and more about planning cuts that cook at different speeds.",
    sections: [
      { heading: "Allow enough", paragraphs: ["Plan two sausages, one burger and a little sharing meat per guest. Kebabs and rib racks make excellent centrepieces."] },
      { heading: "Start slow, finish hot", paragraphs: ["Begin ribs away from direct heat, then grill burgers and steaks at the end so everyone eats together."] },
    ],
  },
  {
    slug: "perfect-sunday-roast",
    title: "A Butcher's Guide to Sunday Roasts",
    excerpt: "Find the right joint and master crisp crackling, rosy beef or tender lamb.",
    date: "19 April 2026",
    category: "Recipes",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    introduction: "The best Sunday lunch begins with the right cut for the number around your table.",
    sections: [
      { heading: "Match joint to occasion", paragraphs: ["Rolled pork offers spectacular crackling; boneless lamb is effortless to carve; brisket rewards gentle, unhurried cooking."] },
      { heading: "Always rest", paragraphs: ["Tent your roasted joint loosely with foil. Resting keeps every slice succulent and gives you time to perfect the gravy."] },
    ],
  },
];

export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);
