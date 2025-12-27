
import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Nebula Chronograph',
    price: 299,
    description: 'Precision engineered timepiece with celestial accents.',
    category: 'Watches',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    quantity: 15
  },
  {
    id: 'p2',
    name: 'Quantum Sound Max',
    price: 450,
    description: 'Immersive audio experience with active noise cancellation.',
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    quantity: 10
  }
];

export const ALL_CATEGORIES = [
  "Watches", "Audio", "Computing", "Lifestyle", "Fragrances", "Eyewear", "Footwear", "Smart Home", 
  "Gaming", "Photography", "Drones", "Office", "Decor", "Kitchen", "Outdoors", "Fitness", 
  "Wellness", "Automotive", "Jewellery", "Handbags", "Luggage", "Stationery", "Art", "Collectibles", 
  "Spirits", "Gourmet", "Fashion", "Cosmetics", "Skincare", "Haircare", "Appliances", "Mobile", 
  "Tablets", "Monitors", "Keyboards", "Mice", "Networking", "Storage", "VR/AR", "Audio Visual", 
  "Musical Instruments", "Books", "Magazines", "Toys", "Hobbies", "Pets", "Gardening", "Security", 
  "Power", "Lighting", "Accessories"
];

export const PAYMENT_DETAILS = {
  easypaisa: "03255540480",
  bankTransfer: "03255540480",
  accountName: "M. Faisal Admin"
};

export const ADMIN_CREDENTIALS = {
  email: 'admin@luxe3d.com',
  password: 'admin123'
};
