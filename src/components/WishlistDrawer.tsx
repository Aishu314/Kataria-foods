import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../data/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemove: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemove,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md responsive-drawer bg-[#FAF6F0] flex flex-col shadow-2xl border-l border-[#EAE2D5]">
          <div className="px-6 py-5 bg-white border-b border-[#EAE2D5] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#C0392B]/10 text-[#C0392B] flex items-center justify-center">
                <Heart className="w-5 h-5 fill-[#C0392B]" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[#7A1810]">Saved Favourites</h3>
                <p className="text-xs text-gray-500">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-gray-400 mb-3 border border-[#EAE2D5]">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="font-display text-lg font-bold text-gray-900">No favourites yet</h4>
                <p className="text-xs text-gray-500 max-w-xs mt-1">
                  Click the heart icon on any sweet or confectionery to save it for later.
                </p>
              </div>
            ) : (
              wishlist.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white p-3.5 rounded-2xl border border-[#EAE2D5] shadow-xs flex gap-3.5 items-center justify-between"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-16 h-16 object-cover rounded-xl border border-[#EAE2D5] shrink-0"
                    />
                    <div className="min-w-0">
                      <h5 className="font-display text-sm font-bold text-gray-900 truncate">
                        {product.name}
                      </h5>
                      <p className="text-[11px] text-gray-500">{product.packType}</p>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-sm font-bold text-[#9E2016]">₹{product.price}</span>
                        {product.unitLabel && <span className="text-[10px] text-gray-400">{product.unitLabel}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onAddToCart(product);
                        onRemove(product.id);
                      }}
                      className="px-3 py-1.5 bg-[#C0392B] hover:bg-[#7A1810] text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Move to Cart
                    </button>
                    <button
                      onClick={() => onRemove(product.id)}
                      className="text-xs text-gray-400 hover:text-red-500 flex items-center justify-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
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
