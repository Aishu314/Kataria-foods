import React, { useState } from 'react';
import { X, Search, ArrowRight, Star } from 'lucide-react';
import { ALL_PRODUCTS, Product } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = ALL_PRODUCTS.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.ingredients.some((ing) => ing.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="min-h-full flex items-start justify-center p-4 pt-16">
        <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-[#EAE2D5] z-10">
          <div className="flex items-center gap-3 pb-4 border-b border-[#EAE2D5]">
            <Search className="w-5 h-5 text-[#9E2016]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search mango papad, fruit katli, imli candies, BBQ almonds..."
              className="w-full text-base font-medium text-gray-800 placeholder-gray-400 focus:outline-none"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded bg-gray-100"
              >
                Clear
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick tags */}
          <div className="flex flex-wrap gap-1.5 py-3 text-xs border-b border-[#EAE2D5]">
            <span className="text-gray-400 font-semibold self-center mr-1">Trending:</span>
            {['Alphonso Mango', 'Imli Candy', 'Kaccha Mango', 'Amla Katli', 'Fruit Bar'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 bg-[#FAF6F0] hover:bg-[#F9E4B7] text-[#7A1810] rounded-lg transition-colors border border-[#EAE2D5]"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search results */}
          <div className="max-h-96 overflow-y-auto divide-y divide-[#EAE2D5] py-2">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-gray-500 text-xs">
                No sweet treats found matching "{query}". Try searching for mango, katli, or imli.
              </div>
            ) : (
              filtered.map((product) => (
                <div 
                  key={product.id}
                  className="py-3 px-2 flex items-center justify-between gap-4 hover:bg-[#FAF6F0] rounded-xl transition-colors cursor-pointer group"
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-12 h-12 object-cover rounded-lg border border-[#EAE2D5] shrink-0"
                    />
                    <div className="min-w-0">
                      <h5 className="text-sm font-bold text-gray-900 group-hover:text-[#9E2016] transition-colors truncate">
                        {product.name}
                      </h5>
                      <p className="text-[11px] text-gray-500 truncate">{product.tagline}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-[#9E2016]">₹{product.price}</span>
                        {product.unitLabel && <span className="text-[10px] text-gray-400">{product.unitLabel}</span>}
                        <span className="text-[10px] text-gray-400">· {product.packType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="px-3 py-1.5 bg-[#C0392B] hover:bg-[#7A1810] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                    >
                      + Add
                    </button>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#9E2016] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
