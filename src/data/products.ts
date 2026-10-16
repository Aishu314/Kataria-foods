export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  packType: string;
  rating: number;
  reviewsCount: number;
  category: 'fruit-bars' | 'fruit-katlis' | 'digestives' | 'confectionery';
  tag: string;
  tagColor?: string;
  image: string;
  ingredients: string[];
  shelfLife: string;
  dietary: string[];
  unitLabel?: string;
  isConfectionery?: boolean;
}

export const BESTSELLER_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Alphonso Aam Papad',
    tagline: 'The royal taste of sun-ripened Ratnagiri Alphonso mango.',
    description: 'Slow-dried authentic Alphonso mango pulp layered meticulously into thick, chewy ribbons. Free from artificial gelatin or starch.',
    price: 250,
    originalPrice: 400,
    packType: '200g Gift Box',
    rating: 4.9,
    reviewsCount: 1420,
    category: 'fruit-bars',
    tag: 'Sale',
    tagColor: '#C0392B',
    image: '/src/assets/images/cat_fruit_bars_1792174206008.jpg',
    ingredients: ['Ratnagiri Alphonso Mango Pulp (92%)', 'Sulphur-free Khand Sugar', 'Citric Acid', 'Pectin'],
    shelfLife: '9 Months from packaging',
    dietary: ['100% Real Fruit', 'Zero Gelatin', '0% Cholesterol', 'Vegetarian'],
    isConfectionery: true
  },
  {
    id: 'prod-2',
    name: 'Alphonso Mango Katli',
    tagline: 'Real fruit jelly shaped into delicate artisanal sweets.',
    description: 'Pure fruit nectar set into festive diamond katlis, delicately decorated with pure silver vark and slivered nuts.',
    price: 250,
    originalPrice: 400,
    packType: '250g Royal Box',
    rating: 4.8,
    reviewsCount: 890,
    category: 'fruit-katlis',
    tag: 'Sale',
    tagColor: '#C0392B',
    image: '/src/assets/images/cat_fruit_katli_1792174206783.jpg',
    ingredients: ['Alphonso Mango Puree', 'Kaju Nut Powder', 'Cardamom Extract', 'Raw Khand'],
    shelfLife: '6 Months',
    dietary: ['Guilt-Free Mithai', 'Sun-cured', 'No Trans Fat'],
    isConfectionery: true
  },
  {
    id: 'prod-3',
    name: 'Amla Dry Fruit Katli',
    tagline: 'Nutrient-dense Indian gooseberry with cashews and almonds.',
    description: 'An Ayurvedic powerhouse of vitamin C combined with premium cashew and almond bits, shaped into melt-in-mouth diamond pieces.',
    price: 300,
    originalPrice: 350,
    packType: '250g Health Box',
    rating: 4.9,
    reviewsCount: 620,
    category: 'fruit-katlis',
    tag: 'Sale',
    tagColor: '#C0392B',
    image: '/src/assets/images/cat_fruit_katli_1792174206783.jpg',
    ingredients: ['Desi Amla Pulp (60%)', 'Cashews & Almonds (25%)', 'Raw Forest Honey', 'Cardamom'],
    shelfLife: '8 Months',
    dietary: ['Immunity Booster', 'Rich in Vitamin C', 'Natural Fiber'],
    isConfectionery: true
  },
  {
    id: 'prod-4',
    name: 'BBQ Almonds',
    tagline: 'Slow wood-fire roasted premium almonds in smoky spice rub.',
    description: 'Californian jumbo badam roasted over Rajasthan acacia wood charcoal and dusted with sweet paprika, pink rock salt, and dried mango powder.',
    price: 400,
    originalPrice: 500,
    packType: '200g Tin Canister',
    rating: 4.7,
    reviewsCount: 980,
    category: 'digestives',
    tag: 'Sale',
    tagColor: '#C0392B',
    image: '/src/assets/images/hero_kataria_sweets_1792174204979.jpg',
    ingredients: ['California Almonds (90%)', 'Kataria BBQ Spice Blend', 'Cold-pressed Mustard Oil', 'Kala Namak'],
    shelfLife: '12 Months',
    dietary: ['High Protein', 'Keto Friendly', 'Wood-fire Roasted'],
    isConfectionery: false
  },
  {
    id: 'prod-5',
    name: 'Black Currant Katli',
    tagline: 'Deep berry notes crafted into chewy, refreshing mithai.',
    description: 'Rich dark wild berries reduced to a luscious fruit paste and sliced into diamond cuts with a balanced tart-sweet burst.',
    price: 250,
    originalPrice: 350,
    packType: '250g Gift Box',
    rating: 4.8,
    reviewsCount: 430,
    category: 'fruit-katlis',
    tag: 'Sale',
    tagColor: '#C0392B',
    image: '/src/assets/images/cat_fruit_katli_1792174206783.jpg',
    ingredients: ['Wild Black Currant Pulp', 'Fruit Pectin', 'Organic Raw Sugar', 'Lemon Juice'],
    shelfLife: '6 Months',
    dietary: ['Antioxidant Rich', 'Plant Based', 'Zero Artificial Dyes'],
    isConfectionery: true
  },
  {
    id: 'prod-6',
    name: 'Chatori Masala Papad',
    tagline: 'Signature chatpata sweet-sour mango cubes with black salt.',
    description: 'The definitive Indian childhood candy bar! Dehydrated raw and ripe mango layered with rock salt, roasted cumin, and black pepper.',
    price: 300,
    originalPrice: 400,
    packType: '300g Zip Pouch',
    rating: 4.9,
    reviewsCount: 2110,
    category: 'fruit-bars',
    tag: 'Sale',
    tagColor: '#C0392B',
    image: '/src/assets/images/cat_fruit_bars_1792174206008.jpg',
    ingredients: ['Sun-dried Mango Pulp', 'Hing', 'Roasted Jeera Powder', 'Sendha Namak', 'Amchur'],
    shelfLife: '9 Months',
    dietary: ['Digestive Aid', 'Traditional Rajasthani', 'Tangy & Sweet'],
    isConfectionery: true
  },
  {
    id: 'prod-7',
    name: 'Dry Mango Katli',
    tagline: 'Classic sun-cured mango delicacy with balanced sweetness.',
    description: 'Sun-cured golden mango pulp prepared in copper cauldrons and allowed to set in natural dry heat for deep caramelized richness.',
    price: 250,
    originalPrice: 350,
    packType: '250g Tray Pack',
    rating: 4.8,
    reviewsCount: 510,
    category: 'fruit-katlis',
    tag: 'Sale',
    tagColor: '#C0392B',
    image: '/src/assets/images/cat_fruit_katli_1792174206783.jpg',
    ingredients: ['Dehydrated Mango Puree', 'Liquid Glucose (Plant-based)', 'Saffron Strands', 'Cardamom'],
    shelfLife: '9 Months',
    dietary: ['Sun Dehydrated', 'Heritage Recipe', 'Cholesterol Free'],
    isConfectionery: true
  },
  {
    id: 'prod-8',
    name: 'Guava Fruit Papad',
    tagline: 'Pink Allahabad guava pulp with a mild chatpata spice kick.',
    description: 'Fragrant pink guava cooked down with a hint of red chili, pink rock salt, and tangy lime for a sublime tropical chew.',
    price: 250,
    originalPrice: 400,
    packType: '200g Pack',
    rating: 4.8,
    reviewsCount: 780,
    category: 'fruit-bars',
    tag: 'Sale',
    tagColor: '#C0392B',
    image: '/src/assets/images/cat_fruit_bars_1792174206008.jpg',
    ingredients: ['Allahabad Pink Guava Pulp (85%)', 'Chili Flakes', 'Kala Namak', 'Natural Fruit Sugar'],
    shelfLife: '9 Months',
    dietary: ['Rich in Dietary Fiber', 'Real Fruit Pulp', 'Clean Chew'],
    isConfectionery: true
  }
];

export const CONFECTIONERY_PRODUCTS: Product[] = [
  {
    id: 'conf-1',
    name: '100gm Kaccha Mango Bar',
    tagline: 'A tangy and sweet fruit bar made from raw green mangoes.',
    description: 'Compact pocket snack bar made from sun-dehydrated tart raw mango slices blended with jaggery and a pinch of roasted cumin.',
    price: 50,
    unitLabel: '/Pack',
    packType: '100gm Snack Pack',
    rating: 4.7,
    reviewsCount: 310,
    category: 'confectionery',
    tag: 'Fruit Bars',
    tagColor: '#4A6B35',
    image: '/src/assets/images/cat_fruit_bars_1792174206008.jpg',
    ingredients: ['Raw Green Mango Pulp (80%)', 'Jaggery & Khand', 'Rock Salt', 'Mint & Cumin'],
    shelfLife: '12 Months',
    dietary: ['On-the-go Snack', 'Zesty Tart', 'No Gelatin'],
    isConfectionery: true
  },
  {
    id: 'conf-2',
    name: '500gm Imli Fruit Bar Burfi',
    tagline: 'Delicious tamarind burfi with a rich, chewy toffee-like texture.',
    description: 'Generous family pack of wholesome Rajasthani imli burfi bars. Chewy, soft, and balanced with soothing natural sweetness.',
    price: 250,
    unitLabel: '/Pack',
    packType: '500gm Burfi Pack',
    rating: 4.9,
    reviewsCount: 840,
    category: 'confectionery',
    tag: 'Family Pack',
    tagColor: '#E09F3E',
    image: '/src/assets/images/cat_digestives_candies_1792174206869.jpg',
    ingredients: ['Tamarind Puree', 'Sugarcane Jaggery', 'Black Pepper', 'Roasted Coriander Seeds'],
    shelfLife: '12 Months',
    dietary: ['Family Pack', 'Digestive Goodness', 'Traditional Burfi'],
    isConfectionery: true
  },
  {
    id: 'conf-3',
    name: '250gm Kataria Imli Candy',
    tagline: 'Classic rectangular tamarind candies, bursting with zesty flavor.',
    description: 'Individually wrapped nostalgic sweet-and-sour tamarind candies packed inside a food-grade airtight PET jar.',
    price: 120,
    unitLabel: '/Jar',
    packType: '250gm Pet Jar',
    rating: 4.8,
    reviewsCount: 1120,
    category: 'confectionery',
    tag: 'Imli Candy',
    tagColor: '#C0392B',
    image: '/src/assets/images/cat_digestives_candies_1792174206869.jpg',
    ingredients: ['Concentrated Tamarind Pulp', 'Sugar Crystals', 'Chili Powders', 'Ginger Dry Powder'],
    shelfLife: '12 Months',
    dietary: ['Airtight Jar', 'Tangy Nostalgia', 'Kid Friendly'],
    isConfectionery: true
  },
  {
    id: 'conf-4',
    name: '250gm Kachha Mango Candy',
    tagline: 'Tangy raw mango flavored candies, the perfect post-meal treat.',
    description: 'Zesty green raw mango drop candies with a spicy masala core that bursts in your mouth.',
    price: 120,
    unitLabel: '/Box',
    packType: '250gm Carton Box',
    rating: 4.8,
    reviewsCount: 740,
    category: 'confectionery',
    tag: 'Mango Candy',
    tagColor: '#4A6B35',
    image: '/src/assets/images/cat_digestives_candies_1792174206869.jpg',
    ingredients: ['Raw Mango Extract', 'Sugar', 'Mint Leaves Extract', 'Black Salt', 'Ajwain'],
    shelfLife: '12 Months',
    dietary: ['Post-Meal Mukhwas', 'Center Filled Masala', 'Zero Wax'],
    isConfectionery: true
  },
  {
    id: 'conf-5',
    name: 'Green Mango Cube Bar',
    tagline: 'Sweet and sour green mango fruit cubes cut for instant snacking.',
    description: 'Cubed bite-size fruit papad chunks coated with fine spice dust, easy to share at office desks or road trips.',
    price: 250,
    unitLabel: '/Pack',
    packType: '500gm Value Pack',
    rating: 4.9,
    reviewsCount: 460,
    category: 'confectionery',
    tag: 'Fruit Cubes',
    tagColor: '#4A6B35',
    image: '/src/assets/images/cat_fruit_bars_1792174206008.jpg',
    ingredients: ['Green Mango Pulp', 'Cane Sugar', 'Chaat Masala Blend', 'Iodised Salt'],
    shelfLife: '9 Months',
    dietary: ['Value Pack', 'Bite Sized', 'Sun Dehydrated'],
    isConfectionery: true
  },
  {
    id: 'conf-6',
    name: '100gm Mango Cube Bar',
    tagline: 'Bite-sized mango fruit cubes, perfect for on-the-go cravings.',
    description: 'The golden Alphonso version of our signature bite cubes in a travel-ready resealable pouch.',
    price: 50,
    unitLabel: '/Pack',
    packType: '100gm Travel Pack',
    rating: 4.6,
    reviewsCount: 290,
    category: 'confectionery',
    tag: 'Pocket Pack',
    tagColor: '#E09F3E',
    image: '/src/assets/images/hero_kataria_sweets_1792174204979.jpg',
    ingredients: ['Alphonso Mango Puree (85%)', 'Natural Sugar', 'Citric Acid'],
    shelfLife: '9 Months',
    dietary: ['Travel Size', 'Instant Energy', 'Clean Label'],
    isConfectionery: true
  },
  {
    id: 'conf-7',
    name: 'Kataria Dobull Imli Candy',
    tagline: 'A large family pack of popular sweet and tangy Dobull Imli candy.',
    description: 'Double the tamarind richness! Packed with traditional sweet jaggery and bold sour tamarind twists.',
    price: 90,
    unitLabel: '/Pack',
    packType: '500gm Bulk Pack',
    rating: 4.8,
    reviewsCount: 960,
    category: 'confectionery',
    tag: 'Double Imli',
    tagColor: '#C0392B',
    image: '/src/assets/images/cat_digestives_candies_1792174206869.jpg',
    ingredients: ['Ripe Tamarind Paste', 'Jaggery Extract', 'Sendha Namak', 'Dry Mango Powder'],
    shelfLife: '12 Months',
    dietary: ['Bulk Saver', 'Double Tamarind', 'Rajasthani Recipe'],
    isConfectionery: true
  },
  {
    id: 'conf-8',
    name: 'Kataria Mango Toffee Candy',
    tagline: 'Creamy and rich mango milk toffees made with ripe fruit essence.',
    description: 'Silky smooth golden mango milk toffees that dissolve slowly with the authentic aroma of Indian Alphonso orchards.',
    price: 120,
    unitLabel: '/Jar',
    packType: '250gm Pet Jar',
    rating: 4.9,
    reviewsCount: 1540,
    category: 'confectionery',
    tag: 'Mango Toffee',
    tagColor: '#E09F3E',
    image: '/src/assets/images/hero_kataria_sweets_1792174204979.jpg',
    ingredients: ['Mango Pulp Extract', 'Milk Solids', 'Pure Desi Ghee', 'Raw Sugar'],
    shelfLife: '9 Months',
    dietary: ['Pure Milk Solids', 'Rich & Creamy', 'Festive Jar'],
    isConfectionery: true
  }
];

export const ALL_PRODUCTS = [...BESTSELLER_PRODUCTS, ...CONFECTIONERY_PRODUCTS];

export interface CartItem {
  product: Product;
  quantity: number;
}
