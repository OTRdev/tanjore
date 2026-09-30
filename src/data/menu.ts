// The whole menu lives here. To change a price or dish, edit this file only.
// Prices are CAD dollars. Names, descriptions and section headers follow the owner's
// "Modern Bold" take-out menu PDF (Sept 2026).
//
// Dietary flags (all optional, only set when the owner has confirmed them):
//   veg         vegetarian
//   vegan       vegan (no dairy, egg or honey)
//   glutenFree  no gluten-containing ingredients
// A flag that is missing means "not confirmed", NOT "no". Never guess allergen or diet info.

export interface MenuItem {
  name: string;
  description?: string;
  /** Omit when the section has a flat `price`. */
  price?: number;
  veg?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  /** Short badge/aside, e.g. "Boneless +$2". */
  note?: string;
}

export interface MenuSection {
  id: string;
  title: string;
  /** Kicker/tagline shown under the title. */
  subtitle?: string;
  /** Flat price applied to every item in the section. */
  price?: number;
  /** Line shown under the heading, e.g. "Rice is not included". */
  footnote?: string;
  items: MenuItem[];
}

export const menu: MenuSection[] = [
  {
    id: "starters",
    title: "Starters",
    subtitle: "Small plates to begin",
    items: [
      { name: "Pani Poori", description: "Hollow puri: crisp flatbread filled with flavored water", price: 6, veg: true },
      { name: "Onion Bhaji", description: "Onion fritters in a garam batter", price: 7, veg: true },
      { name: "Papdi Chaat", description: "Fried flour crispies", price: 6, veg: true },
      { name: "Vegetable Pakoras", description: "Assorted vegetable fritters in split gram batter", price: 6, veg: true },
      { name: "Chicken Pakoras", description: "Chicken fritters in split gram batter", price: 7 },
      { name: "Paneer Pakoras", description: "Cottage cheese in gram batter", price: 7, veg: true },
      { name: "Vegetable Samosa (2 pc)", price: 4, veg: true },
      { name: "Aloo Tiki (2 pc)", description: "Fried potato patty stuffed with peas, yogurt on top", price: 6, veg: true },
      { name: "Bhel Sev", description: "Puffed rice, onion, potato, tamarind sauce, coriander", price: 6, veg: true },
    ],
  },
  {
    id: "biryanis-rice",
    title: "Specialty Biryanis & Rice",
    footnote: "Extra meat +$2.00",
    items: [
      { name: "Vegetarian Biryani", description: "Basmati rice cooked with garden vegetables and spices", price: 10, veg: true },
      { name: "Peas Pulao", description: "Basmati rice cooked with peas", price: 8, veg: true },
      { name: "Rice", price: 6, veg: true },
      { name: "Chicken Biryani", description: "Marinated chicken cooked with basmati rice and spices", price: 12 },
      { name: "Lamb / Beef Biryani", description: "Lamb or beef pieces cooked with rice and masalas", price: 13 },
      { name: "Boneless Goat", price: 14 },
    ],
  },
  {
    id: "breads",
    title: "Rotian Tandoori",
    subtitle: "Fresh from the clay oven",
    items: [
      { name: "Palace Naan", description: "Stuffed with diced chicken and herbs", price: 5 },
      { name: "Garlic Naan", description: "Stuffed with garlic and onions", price: 3, veg: true },
      { name: "Garlic Kulcha", description: "Tandoori bread stuffed with garlic, ginger and coriander", price: 4, veg: true },
      { name: "Aloo Kulcha", description: "Tandoori bread stuffed with potatoes", price: 4, veg: true },
      { name: "Crispy Whole Wheat Roti", price: 2, veg: true },
      { name: "Onion Kulcha", description: "Tandoori bread stuffed with cumin and onions", price: 4, veg: true },
      { name: "Lachha Paratha", description: "Multi-layered bread", price: 4, veg: true },
      { name: "Aloo Paratha", description: "Flaky whole wheat bread stuffed with potatoes", price: 4, veg: true },
      { name: "Paneer Paratha", description: "Tandoori bread stuffed with cottage cheese and herbs", price: 5, veg: true },
      { name: "Naan", description: "Fluffy light tandoori bread", price: 2, veg: true },
      { name: "Aloo Paratha + Dahi", price: 6, veg: true },
    ],
  },
  {
    id: "vegetarian",
    title: "Vegetarian Delights",
    subtitle: "Rice not included",
    price: 12,
    footnote: "Each $12. Rice is not included, ask for spicy.",
    items: [
      { name: "Eggplant Bharta", description: "Mashed eggplant cooked with fresh tomato, onion, green peas & spices", veg: true },
      { name: "Mater Paneer", description: "Green peas & cottage cheese", veg: true },
      { name: "Aloo Gobi", description: "Cauliflower with potatoes & spices", veg: true },
      { name: "Channa Masala", description: "Chickpeas cooked with onions and tomatoes in spiced sauce", veg: true },
      { name: "Dal Tadka", description: "Lentil stir fry with butter, ginger, garlic, tomatoes & coriander", veg: true },
      { name: "Malai Paneer", description: "Cottage cheese cooked in exotic cream with tomatoes and cashews", veg: true },
      { name: "Daal Makhani", description: "Assorted lentil stew flavored with cream", veg: true },
      { name: "Paneer Makhani", description: "Cottage cheese cooked in a tomato cream sauce", veg: true },
      { name: "Malai Kofta", description: "Croquettes of fresh cheese in a light cream sauce", veg: true },
      { name: "Mushroom Kaju Mater", description: "Peas, mushroom & cashew cooked with onion, garlic and herbs", veg: true },
      { name: "Kadhai Paneer", description: "Cottage cheese cooked with onions & green pepper", veg: true },
      { name: "Vegetable Jalfrezi", description: "Mixed vegetables and potatoes", veg: true },
      { name: "Palak Paneer", description: "Spinach with cottage cheese", veg: true },
      { name: "Madras Paneer", description: "Onion and garlic with South Indian flavor", veg: true },
      { name: "Bhindi (Okra) Masala", description: "Okra cooked with tomato and onion", veg: true },
      { name: "Chili Paneer", description: "Cottage cheese cooked with pepper and soya sauce", veg: true },
      { name: "Veg Korma", description: "Mixed vegetables in exotic cream sauce with cashew nuts", veg: true },
    ],
  },
  {
    id: "meat",
    title: "Murgh aur Gosht",
    subtitle: "Delightful meat dishes",
    price: 14,
    footnote: "Each $14. Rice is not included, ask for spicy.",
    items: [
      { name: "Malai Chicken", description: "Chicken cooked with cashew nuts in a delicate gravy" },
      { name: "Chicken Tikka Masala", description: "Tandoori flavored chicken in an aromatic zesty sauce" },
      { name: "Saag Chicken", description: "Curried chicken cooked with fresh spinach" },
      { name: "Chicken Jalfrezi", description: "Julienne chicken sautéed with tomatoes, onions & green peppers" },
      { name: "Chicken / Lamb Korma", description: "Boneless chicken or lamb cooked with cashews in a thick cream sauce" },
      { name: "Chicken Keema", description: "Ground chicken lightly cooked with ginger, garlic & diced tomatoes" },
      { name: "Madras Chicken", description: "Curried chicken cooked in a traditional South Indian recipe" },
      { name: "Butter Chicken", description: "Boneless tandoori chicken in an exquisite creamy tomato sauce", note: "House favourite" },
      { name: "Kadhai Gosht, Beef / Lamb", description: "Cooked with ginger, green pepper, tomatoes and hot spices" },
      { name: "Lamb / Beef Roganjosh", description: "Lean chunks simmered in a rich almond sauce with a blend of spices" },
      { name: "Gosht Patilla, Lamb / Beef", description: "Tender boneless pieces cooked with onion, garlic and garam masala" },
      { name: "Vindaloo, Beef / Chicken / Lamb", description: "Meat cooked in a fiery hot curry sauce" },
      { name: "Ginger & Garlic Chicken Fry", description: "Dry chicken cooked with ground peppercorns, ginger and garlic" },
      { name: "Lamb / Beef Bhoona Masala", description: "Cooked in a hot, spicy gravy with dried fenugreek" },
      { name: "Goat Curry (with bone)", description: "Goat cooked with ginger, garlic, onion and tomatoes", note: "Boneless +$2" },
    ],
  },
  {
    id: "tandoori",
    title: "Tandoorse",
    subtitle: "Tandoori specialties",
    items: [
      { name: "Chicken Tikka", description: "Marinated chicken breast grilled in the tandoor, topped with onion", price: 12 },
      { name: "Half Tandoori Chicken", description: "Marinated chicken cooked in a tandoor", price: 12 },
      { name: "Full Tandoori Chicken", description: "Marinated chicken cooked in a tandoor", price: 19 },
    ],
  },
  {
    id: "seafood-eggs",
    title: "Taza Pakad",
    subtitle: "Our fisherman's catch",
    items: [
      { name: "Prawn Masala", description: "Prawns sautéed with ginger, garlic, onions and tomatoes", price: 14 },
      { name: "Bombay Fish Curry", description: "Cooked Bombay style in a light curry sauce with tomatoes", price: 13 },
      { name: "Egg Curry", description: "Boiled eggs cooked with onion, garlic & Indian spices", price: 11 },
      { name: "Egg Bhurji", description: "Scrambled egg cooked with onions and green chilies", price: 11 },
    ],
  },
];

export interface Combo {
  name: string;
  price: number;
  includes: string[];
}

export const combosHeading = { title: "Special Combos", subtitle: "Feast for two or more" };

export const combos: Combo[] = [
  {
    name: "Combo 1",
    price: 20,
    includes: ["Any 1 dish", "Small rice", "4 pc veg pakora", "Naan", "Gulab jamun"],
  },
  {
    name: "Combo 2",
    price: 40,
    includes: ["Any 2 dishes", "Large rice", "Onion bhaji", "Garlic naan + naan", "Gulab jamun"],
  },
];

export const thalis = {
  hours: "12 PM to 3 PM",
  items: [
    { name: "Vegetable Thali", price: 8, veg: true },
    { name: "Non-Vegetable Thali", price: 10 },
  ],
};

/** Price of an item, falling back to the section's flat price. */
export const priceOf = (section: MenuSection, item: MenuItem): number | undefined =>
  item.price ?? section.price;
