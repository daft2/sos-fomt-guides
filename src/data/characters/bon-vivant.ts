import type { Character } from './types';

const bonVivant: Character = {
  id: 'bon-vivant',
  name: 'Bon Vivant',
  category: 'special',
  birthday: '21 Spring',
  alternateBirthday: '20 Spring',
  residence: 'Rose Plaza (Spring 22 festival only)',
  family: [],
  rival: null,
  description: {
    id: 'Bon Vivant (juga dikenal sebagai Gourmet) adalah seorang kritikus makanan yang menjadi juri di festival Cooking Exhibition setiap tanggal 22 Spring. Ia mencari pasangan yang sama-sama mencintai makanan.',
    en: "Bon Vivant, also known as the Gourmet, is a food critic who judges the Cooking Exhibition festival every Spring 22. He only appears on that day and briefly after, requiring you to win the festival 5 times and cook all 120 recipes before he can be married.",
  },
  favoritedGift: [
    'Elli Leaves', 'Hot Spring Egg', 'Boiled Egg', 'Butter', 'Stew',
    'Almond Tofu', 'Apple Pie', 'Baked Apple', 'Baked Yam', 'Bamboo Rice',
    'Baumkuchen', 'Bibimbap', 'Cake', 'Carbonara', 'Cheesecake',
    'Cheese Fondue', 'Cheese Risotto', 'Cheese Souffle', 'Chocolate Cookies',
    'Churros', 'Cookies', 'Curry Bread', 'Curry Rice', 'Curry Udon',
    'Eggs Benedict', 'French Toast', 'Fried Rice', 'Fruit Juice',
    'Fruit Smoothie', 'Grilled Fish', 'Ice Cream', 'Ketchup', 'Madeleine',
    'Margherita Pizza', 'Matsutake Rice', 'Miso Soup', 'Mixed Juice',
    'Mixed Smoothie', 'Moon Dumplings', 'Wild Grape Water',
    'Mushroom Gratin', 'Mushroom Rice', 'Napolitan', 'Nasi Goreng',
    'Okonomiyaki', 'Omelet Rice', 'Pancakes', 'Pineapple Juice', 'Popcorn',
    'Pudding', 'Raisin Bread', 'Ramen', 'Relax Tea', 'Roasted Corn', 'Salad',
    'Sandwich', 'Sashimi', 'Stir-Fried Vegetables', 'Strawberry Milk',
    'Sushi', 'Yam Dessert', 'Tempura', 'Tempura Soba', 'Tempura Udon',
    'Udon', 'Vegetable Juice', 'Zaru Soba',
  ],
  lovedGifts: [],
  likedGifts: [],
  dislikedGifts: [],
  hatedGifts: [],
  heartEvents: [
    {
      heart: 'event1',
      requirementPoints: null,
      days: 'Spring 22 (Cooking Exhibition Festival)',
      time: '06:00 PM–08:00 PM',
      weather: 'Any',
      location: 'Rose Plaza',
      otherRequirements: 'Can only give 1 gift per visit. Meet after festival ends.',
    },
    {
      heart: 'event2',
      requirementPoints: null,
      days: 'Spring 22 (after festival)',
      time: '06:00 PM–08:00 PM',
      weather: 'Any',
      location: 'Rose Plaza',
      otherRequirements: 'Marriage requirements: Win Cooking Exhibition 5 times, cook all 120 recipes, Red heart with Bon Vivant, Big Bed. Give Blue Feather (1,000G from General Store) to him at the bench after the festival.',
    },
  ],
};

export default bonVivant;
