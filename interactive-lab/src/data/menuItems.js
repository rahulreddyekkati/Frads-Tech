// Menu items for digital menu card
export const menuItems = [
    {
        id: 1,
        name: 'Truffle Burger',
        category: 'Main Course',
        price: 24,
        dietary: ['gluten-free'],
        upsell: 'Pairs perfectly with our House Red Wine',
        description: 'Angus beef with black truffle aioli'
    },
    {
        id: 2,
        name: 'Grilled Salmon',
        category: 'Main Course',
        price: 32,
        dietary: [],
        upsell: 'Try our Chardonnay pairing',
        description: 'Atlantic salmon with herb butter'
    },
    {
        id: 3,
        name: 'Caesar Salad',
        category: 'Appetizer',
        price: 16,
        dietary: ['vegan'],
        upsell: null,
        description: 'Classic with parmesan and croutons'
    },
    {
        id: 4,
        name: 'Margherita Pizza',
        category: 'Main Course',
        price: 22,
        dietary: ['vegan'],
        upsell: 'Add truffle oil for $5',
        description: 'Fresh mozzarella and basil'
    },
    {
        id: 5,
        name: 'Spicy Ramen',
        category: 'Main Course',
        price: 18,
        dietary: ['spicy'],
        upsell: 'Extra egg for $2',
        description: 'Tonkotsu broth with chili oil'
    },
    {
        id: 6,
        name: 'Tiramisu',
        category: 'Dessert',
        price: 12,
        dietary: [],
        upsell: 'Espresso pairing available',
        description: 'Homemade Italian dessert'
    },
    {
        id: 7,
        name: 'Vegan Bowl',
        category: 'Main Course',
        price: 20,
        dietary: ['vegan', 'gluten-free'],
        upsell: null,
        description: 'Quinoa, roasted vegetables, tahini'
    },
    {
        id: 8,
        name: 'Chicken Wings',
        category: 'Appetizer',
        price: 14,
        dietary: ['spicy', 'gluten-free'],
        upsell: 'Ranch or blue cheese dip',
        description: 'Buffalo or BBQ sauce'
    }
];

export const dietaryFilters = [
    { id: 'vegan', label: 'Vegan', icon: '🌱' },
    { id: 'gluten-free', label: 'Gluten-Free', icon: '🌾' },
    { id: 'spicy', label: 'Spicy', icon: '🌶️' }
];
