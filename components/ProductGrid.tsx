
import React from 'react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  addToCart: (id: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, addToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
      {products.map((product) => (
        <div 
          key={product.id}
          className="group perspective-1000"
        >
          <div className="glass rounded-3xl p-6 border border-white/5 hover:border-blue-500/30 transition-all card-3d h-full flex flex-col">
            <div className="relative mb-6 aspect-square rounded-2xl overflow-hidden bg-white/5">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-400 border border-white/10">
                {product.category}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60"></div>
            </div>

            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold font-display text-white group-hover:text-blue-400 transition-colors">{product.name}</h3>
                <span className="text-xl font-black text-white">${product.price}</span>
              </div>
              <p className="text-gray-400 text-sm mb-6 line-clamp-2">{product.description}</p>
              
              <div className="mt-auto flex items-center justify-between gap-4">
                <div className="text-xs font-medium text-gray-500">
                   Stock: <span className={product.quantity > 5 ? 'text-green-400' : 'text-red-400'}>{product.quantity} units</span>
                </div>
                <button 
                  onClick={() => addToCart(product.id)}
                  className="px-6 py-3 bg-white/5 hover:bg-blue-500 text-white font-bold rounded-xl transition-all transform active:scale-95 border border-white/10 hover:border-transparent flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 100-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
