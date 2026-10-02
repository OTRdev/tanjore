// The whole menu lives here. To change a price or dish, edit this file only.
// Prices are CAD dollars. Names, headers and descriptions follow the owner's
// "Tanjore Menu Content" document (Sept 2026).
//
// Flags (all optional; only set what the owner has confirmed):
//   veg         vegetarian
//   vegan       vegan          (the owner's "(V)" marker; vegan items are also veg)
//   glutenFree  no gluten-containing ingredients (not yet provided by the owner)
//   spice       "mild" (M) | "medium" (ME) | "hot" (🔥)
//   dry         dry dish, no gravy
// A missing flag means "not confirmed", NOT "no". Never guess allergen or diet info.

export type Spice = "mild" | "medium" | "hot";

export interface MenuItem {
  name: string;
  description?: string;
  /** Omit when the section has a flat `price`. */
  price?: number;
  veg?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  /** No gluten ingredients, but may contain traces. Shown as a notice; NOT counted as gluten free. */
  glutenTraces?: boolean;
  spice?: Spice;
  dry?: boolean;
  /** Sub-heading this item sits under inside its section. Items with the same group must be adjacent. */
  group?: string;
  /** Short badge/aside, e.g. "Boneless +$2". */
  note?: string;
}

export interface MenuSection {
  id: string;
  title: string;
  /** Short plain-language label for the jump-nav (the title can be a creative name). */
  navLabel: string;
  /** Tagline shown next to the title. */
  subtitle?: string;
  /** Flat price applied to every item in the section. The page prints "Each $X" from this. */
  price?: number;
  /** Line shown under the heading, e.g. "Rice is not included". */
  footnote?: string;
  items: MenuItem[];
}

export const menu: MenuSection[] = [
  {
    id: "starters",
    title: "Chalo Shuru",
    navLabel: "Starters",
    subtitle: "Let's begin (Starters)",
    items: [
      { name: "Pani Poori", description: "Hollow puri, deep-fried crisp flatbread filled with flavored water", price: 6, veg: true },
      { name: "Onion Bhaji", description: "Onion fritters, gram batter", price: 7, veg: true, glutenTraces: true },
      { name: "Papdi Chaat", description: "Fried flour crispies", price: 6, veg: true },
      { name: "Vegetable Pakoras", description: "Assorted vegetables in a crisp split gram batter", price: 6, veg: true, glutenTraces: true },
      { name: "Chicken Pakoras", description: "Chicken fritters in a crisp split gram batter", price: 7 },
      { name: "Paneer Pakoras", description: "Cottage cheese fritters in a crisp gram batter", price: 7, veg: true },
      { name: "Vegetable Samosa (2pc)", description: "Crisp pastry filled with spiced potatoes & peas", price: 4, veg: true },
      { name: "Aloo Tiki (2pc)", description: "Potato patty stuffed with peas, served with yogurt", price: 6, veg: true },
      { name: "Bhel Sev", description: "Puffed rice, onions, potatoes, tamarind sauce, coriander", price: 6, veg: true },
    ],
  },
  {
    id: "biryanis-rice",
    title: "Biryani Junction",
    navLabel: "Biryani & Rice",
    subtitle: "Specialty biryani & rice",
    footnote: "Extra meat available (+$2.00)",
    items: [
      { name: "Vegetarian Biryani", glutenFree: true, description: "Basmati rice layered with garden vegetables & spices", price: 10, veg: true },
      { name: "Peas Pulao", glutenFree: true, description: "Basmati rice cooked with green peas", price: 8, veg: true },
      { name: "Rice", glutenFree: true, description: "Steamed basmati rice", price: 6, veg: true },
      { name: "Chicken Biryani", glutenFree: true, description: "Marinated chicken cooked with basmati rice & spices", price: 12 },
      { name: "Lamb or Beef Biryani", glutenFree: true, description: "Lamb or beef pieces cooked with rice & masalas", price: 13 },
      { name: "Boneless Goat Biryani", glutenFree: true, description: "Tender boneless goat cooked with basmati rice & spices", price: 14 },
    ],
  },
  {
    id: "breads",
    title: "Naan Stop",
    navLabel: "Breads",
    subtitle: "Fresh from the tandoor",
    items: [
      { name: "Naan", description: "Fluffy light tandoori bread", price: 2, veg: true, group: "Naans" },
      { name: "Garlic Naan", description: "Stuffed with garlic and onions", price: 3, veg: true, group: "Naans" },
      { name: "Palace Naan", description: "Stuffed with diced chicken and herbs", price: 5, group: "Naans" },
      { name: "Garlic Kulcha", description: "Garlic, ginger, coriander", price: 4, veg: true, group: "Kulchas" },
      { name: "Aloo Kulcha", description: "Stuffed with potatoes", price: 4, veg: true, group: "Kulchas" },
      { name: "Onion Kulcha", description: "Tandoori bread stuffed with cumin & onions", price: 4, veg: true, group: "Kulchas" },
      { name: "Crispy Whole Wheat Roti", description: "Thin, crisp whole wheat flatbread", price: 2, veg: true, group: "Roti & Parathas" },
      { name: "Lachha Paratha", description: "Multi-layered bread", price: 4, veg: true, group: "Roti & Parathas" },
      { name: "Aloo Paratha", description: "Flaky whole wheat bread stuffed with potatoes", price: 4, veg: true, group: "Roti & Parathas" },
      { name: "Paneer Paratha", description: "Tandoori bread stuffed with cottage cheese & herbs", price: 5, veg: true, group: "Roti & Parathas" },
      { name: "Aloo Paratha + Dahi", description: "Potato-stuffed paratha served with cooling yogurt", price: 6, veg: true, group: "Combos" },
      { name: "Channa Kulcha", description: "Tandoori kulcha topped with spiced chana & fresh onion salad", price: 8, veg: true, group: "Combos" },
    ],
  },
  {
    id: "vegetarian",
    title: "Veggie Vibes",
    navLabel: "Vegetarian",
    subtitle: "Vegetarian delights",
    price: 12,
    footnote: "Rice not included. Ask for medium or spicy.",
    items: [
      { name: "Eggplant Bharta", glutenFree: true, description: "Smoky roasted eggplant mash with onions & spices", veg: true, vegan: true, group: "Vegetable & Lentil Dishes" },
      { name: "Aloo Gobi", glutenFree: true, description: "Potatoes & cauliflower sautéed with turmeric and cumin", veg: true, vegan: true, dry: true, group: "Vegetable & Lentil Dishes" },
      { name: "Channa Masala", glutenFree: true, description: "Chickpeas simmered in a spiced tomato gravy", veg: true, vegan: true, group: "Vegetable & Lentil Dishes" },
      { name: "Dal Tadka", glutenFree: true, description: "Yellow lentils tempered with cumin and garlic", veg: true, vegan: true, group: "Vegetable & Lentil Dishes" },
      { name: "Daal Makhani", glutenFree: true, description: "Black lentils slow-cooked in butter and cream", veg: true, group: "Vegetable & Lentil Dishes" },
      { name: "Malai Kofta", description: "Vegetable dumplings in a creamy cashew gravy", veg: true, group: "Vegetable & Lentil Dishes" },
      { name: "Mushroom Kaju Mater", glutenFree: true, description: "Mushrooms, cashews & peas in a light gravy", veg: true, group: "Vegetable & Lentil Dishes" },
      { name: "Vegetable Jalfrezi", glutenFree: true, description: "Mixed vegetables sautéed with onions & peppers", veg: true, vegan: true, dry: true, group: "Vegetable & Lentil Dishes" },
      { name: "Bhindi (Okra) Masala", glutenFree: true, description: "Okra sautéed with onions and spices", veg: true, vegan: true, group: "Vegetable & Lentil Dishes" },
      { name: "Veg Korma", glutenFree: true, description: "Mixed vegetables in a mild cashew cream sauce", veg: true, group: "Vegetable & Lentil Dishes" },
      { name: "Mater Paneer", glutenFree: true, description: "Peas and paneer in a mild tomato gravy", veg: true, group: "Paneer Dishes" },
      { name: "Malai Paneer", glutenFree: true, description: "Paneer in a mild, creamy cashew sauce", veg: true, group: "Paneer Dishes" },
      { name: "Paneer Makhani", glutenFree: true, description: "Paneer in a rich, buttery tomato sauce", veg: true, group: "Paneer Dishes" },
      { name: "Kadhai Paneer", glutenFree: true, description: "Paneer with peppers & onions in a spiced kadhai sauce", veg: true, group: "Paneer Dishes" },
      { name: "Palak Paneer", glutenFree: true, description: "Paneer cubes in a creamy spinach gravy", veg: true, group: "Paneer Dishes" },
      { name: "Madras Paneer", glutenFree: true, description: "Paneer in a fiery, South Indian style curry", veg: true, group: "Paneer Dishes" },
      { name: "Chili Paneer", description: "Paneer tossed with chilies, peppers & onions", veg: true, group: "Paneer Dishes" },
    ],
  },
  {
    id: "meat",
    title: "Meat Ki Mehfil",
    navLabel: "Meat",
    subtitle: "Delightful meat dishes",
    price: 14,
    footnote: "Rice not included. Ask for medium or spicy. Boneless option available.",
    items: [
      { name: "Malai Chicken", glutenFree: true, description: "Chicken cooked with cashew nuts (gravy)", spice: "mild" },
      { name: "Chicken Tikka Masala", glutenFree: true, description: "Tandoori flavored chicken in aromatic zesty sauce", spice: "mild" },
      { name: "Saag Chicken", glutenFree: true, description: "Curried chicken with spinach", spice: "mild" },
      { name: "Chicken Jalfrezi", glutenFree: true, description: "Chicken sautéed with tomatoes, onions & green peppers", spice: "mild" },
      { name: "Chicken or Lamb Korma", glutenFree: true, description: "Boneless chicken or lamb with cashews in thick cream sauce", spice: "mild" },
      { name: "Chicken Keema", glutenFree: true, description: "Ground chicken with ginger, garlic & diced tomatoes", spice: "mild" },
      { name: "Madras Chicken", glutenFree: true, description: "Curried chicken in a traditional South Indian recipe" },
      { name: "Butter Chicken", glutenFree: true, description: "Boneless tandoori chicken in creamy tomato sauce", spice: "mild", note: "House favourite" },
      { name: "Kadhai Chicken", glutenFree: true, description: "Chicken cooked with onions, peppers & tomatoes in a spiced kadhai sauce" },
      { name: "Kadhai Gosht, Beef or Lamb", glutenFree: true, description: "Cooked with ginger, green pepper, tomatoes & hot spices" },
      { name: "Lamb or Beef Roganjosh", glutenFree: true, description: "Rich almond sauce with a blend of spices" },
      { name: "Gosht Patilla, Lamb or Beef", glutenFree: true, description: "Cooked with onion, garlic & garam masala" },
      { name: "Vindaloo (Beef, Chicken or Lamb)", glutenFree: true, description: "Fiery hot curry sauce", spice: "hot" },
      { name: "Ginger & Garlic Chicken Fry", glutenFree: true, description: "Dry chicken with ground peppercorns" },
      { name: "Lamb or Beef Bhoona Masala", glutenFree: true, description: "Hot & spicy gravy with dried fenugreek", spice: "hot" },
      { name: "Goat Curry (with bone)", glutenFree: true, description: "Ginger, garlic, onion, tomatoes with spices", spice: "mild", note: "Boneless +$2" },
    ],
  },
  {
    id: "tandoori",
    title: "Tandoor Tales",
    navLabel: "Tandoori",
    subtitle: "Tandoori specialties",
    items: [
      { name: "Chicken Tikka", glutenFree: true, description: "Marinated chicken breast grilled in tandoor, topped with onion mix", price: 12 },
      { name: "Half Tandoori Chicken", glutenFree: true, description: "Half a marinated chicken, slow-roasted in the tandoor", price: 12 },
      { name: "Full Tandoori Chicken", glutenFree: true, description: "A whole marinated chicken, slow-roasted in the tandoor", price: 19 },
    ],
  },
  {
    id: "seafood",
    title: "Samundar Ka Swaad",
    navLabel: "Seafood",
    subtitle: "Our fisherman's catch",
    items: [
      { name: "Prawn Masala", glutenFree: true, description: "Prawns sautéed with ginger, garlic, onions, tomatoes", price: 14 },
      { name: "Bombay Fish Curry", glutenFree: true, description: "Bombay-style light curry sauce", price: 13 },
    ],
  },
];

export interface Combo {
  name: string;
  price: number;
  includes: string[];
}

export const combosHeading = { title: "Meal Deal Masala", navLabel: "Combos", subtitle: "Feast for two or more" };

export const combos: Combo[] = [
  {
    name: "Combo 1",
    price: 20,
    includes: ["Choice of 1 dish", "Small rice", "4pc veg pakora", "Naan", "Gulab jamun"],
  },
  {
    name: "Combo 2",
    price: 40,
    includes: ["Choice of 2 dishes", "Large rice", "Onion bajji", "1 garlic naan + 1 naan", "Gulab jamun"],
  },
];

export const thalisHeading = { title: "Thali Time", navLabel: "Thalis" };

export const thalis = {
  hours: "12 PM to 3 PM",
  note: "The dishes change daily, but every thali comes with the same set of items.",
  items: [
    { name: "Vegetable Thali", description: "A set lunch plate: 3 vegetable dishes, rice, salad, a sweet and one naan or roti.", price: 8, veg: true },
    { name: "Non-Vegetable Thali", description: "A set lunch plate: 2 meat dishes, 1 vegetable dish, rice, naan, salad and a sweet.", price: 10 },
  ],
};

/** Price of an item, falling back to the section's flat price. */
export const priceOf = (section: MenuSection, item: MenuItem): number | undefined =>
  item.price ?? section.price;
