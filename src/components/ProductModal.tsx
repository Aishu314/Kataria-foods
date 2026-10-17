import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Heart, Leaf, Sparkles, Clock, Check } from 'lucide-react';
import { Product } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EAE2D5] z-10 my-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 text-gray-500 hover:text-gray-900 flex items-center justify-center shadow-md transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image section */}
            <div className="relative bg-[#FAF6F0] p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#EAE2D5]">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-72 md:h-80 object-cover rounded-2xl shadow-sm"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallbackTried) {
                    target.dataset.fallbackTried = 'true';
                    if (target.src.includes('/images/')) {
                      target.src = target.src.replace('/images/', '/src/assets/images/');
                    }
                  }
                }}
              />
              <span className="absolute top-8 left-8 bg-[#C0392B] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {product.tag}
              </span>
            </div>

            {/* Product details */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#E09F3E] text-xs font-bold">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#E09F3E] text-[#E09F3E]" />
                      ))}
                    </div>
                    <span className="text-gray-900 ml-1">{product.rating}</span>
                    <span className="text-gray-400 font-normal">({product.reviewsCount} reviews)</span>
                  </div>
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className="p-2 text-gray-400 hover:text-[#9E2016] rounded-full transition-colors"
                    aria-label="Toggle wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#C0392B] text-[#C0392B]' : ''}`} />
                  </button>
                </div>

                <h3 className="font-display text-2xl font-bold text-[#7A1810] mt-2">
                  {product.name}
                </h3>
                <p className="text-xs text-[#E09F3E] font-semibold uppercase tracking-wider mt-0.5">
                  {product.packType}
                </p>

                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Dietary badges */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {product.dietary.map((d, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 bg-[#FAF6F0] border border-[#EAE2D5] text-[11px] font-semibold text-[#7A1810] px-2.5 py-1 rounded-md">
                      <Leaf className="w-3 h-3 text-[#4A6B35]" />
                      {d}
                    </span>
                  ))}
                </div>

                {/* Ingredients list */}
                <div className="mt-4 pt-4 border-t border-[#EAE2D5]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E09F3E]" />
                    Key Ingredients:
                  </h4>
                  <p className="text-xs text-gray-600">
                    {product.ingredients.join(', ')}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Shelf Life: {product.shelfLife}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#EAE2D5]">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-display text-3xl font-bold text-[#9E2016]">
                    ₹{product.price}
                  </span>
                  {product.unitLabel && (
                    <span className="text-xs text-gray-500 font-semibold">{product.unitLabel}</span>
                  )}
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                  )}
                  <span className="text-xs font-bold text-[#4A6B35] bg-[#4A6B35]/10 px-2 py-0.5 rounded ml-2">
                    Buy 2 Get 1 Eligible
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-[#EAE2D5] rounded-xl bg-[#FAF6F0] overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-11 flex items-center justify-center text-gray-600 hover:bg-white transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-mono font-bold text-sm text-gray-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-11 flex items-center justify-center text-gray-600 hover:bg-white transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className={`flex-1 font-bold text-sm py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${
                      addedAnimation
                        ? 'bg-[#4A6B35] text-white'
                        : 'bg-[#C0392B] hover:bg-[#7A1810] text-white'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Add ₹{product.price * quantity}
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4A6B35]" /> FSSAI Certified
                  </span>
                  <span>•</span>
                  <span>100% Vegetarian</span>
                  <span>•</span>
                  <span>Direct Factory Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
