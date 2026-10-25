export const lifestyleCategory = {
  name: 'Lifestyle',
  slug: 'lifestyle',
  description: 'Everyday moments, saved for the stories they tell.',
  image:
    'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=85',
  tone: 'lifestyle',
} as const

export const eventsCategory = {
  name: 'Events',
  slug: 'events',
  description: 'The people, places, and nights worth remembering.',
  image:
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85',
  tone: 'events',
} as const

export const foodCategory = {
  name: 'Food',
  slug: 'food',
  description: 'Recipes, restaurants, and good things to eat again.',
  image:
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=85',
  tone: 'food',
} as const

export const fashionCategory = {
  name: 'Fashion',
  slug: 'fashion',
  description: 'Looks and inspiration worth keeping close.',
  image:
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85',
  tone: 'fashion',
} as const

export const categories = [
  lifestyleCategory,
  eventsCategory,
  foodCategory,
  fashionCategory,
] as const

export type Category = (typeof categories)[number]
