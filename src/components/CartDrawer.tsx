import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Truck, Check } from 'lucide-react';
import { CartItem } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onOpenProduct: (product: CartItem['product']) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  // Calculate regular subtotal
  const rawSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Calculate Buy 2 Get 1 Free promotion:
  // For every 3 confectionery items purchased, the cheapest ones are free!
  const confectioneryItems: number[] = [];
  items.forEach(item => {
    if (item.product.isConfectionery) {
      for (let i = 0; i < item.quantity; i++) {
        confectioneryItems.push(item.product.price);
      }
    }
  });

  // Sort ascending: cheapest first
  confectioneryItems.sort((a, b) => a - b);
  const freeItemsCount = Math.floor(confectioneryItems.length / 3);
  let b2g1Discount = 0;
  for (let i = 0; i < freeItemsCount; i++) {
    b2g1Discount += confectioneryItems[i];
  }

  const discountedSubtotal = Math.max(0, rawSubtotal - b2g1Discount);
  const freeShippingThreshold = 499;
  const isFreeShipping = discountedSubtotal >= freeShippingThreshold || discountedSubtotal === 0;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - discountedSubtotal);
  const shippingFee = isFreeShipping || discountedSubtotal === 0 ? 0 : 60;
  const grandTotal = discountedSubtotal + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md responsive-drawer bg-[#FAF6F0] flex flex-col shadow-2xl border-l border-[#EAE2D5]">
          {/* Header */}
          <div className="px-6 py-5 bg-white border-b border-[#EAE2D5] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#9E2016]/10 text-[#9E2016] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[#7A1810]">Your Snack Cart</h3>
                <p className="text-xs text-gray-500">{items.reduce((sum, i) => sum + i.quantity, 0)} handcrafted items</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping and B2G1 Banner */}
          <div className="bg-[#F9E4B7]/60 border-b border-[#EAE2D5] px-6 py-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7A1810]">
              <Truck className="w-4 h-4 text-[#9E2016]" />
              {isFreeShipping ? (
                <span className="text-[#4A6B35] font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Free Express Delivery Unlocked Across India!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#9E2016]">₹{amountToFreeShipping}</strong> more for Free Shipping
                </span>
              )}
            </div>
            {/* Progress bar */}
            <div className="w-full bg-[#EAE2D5] h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-[#9E2016] h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (discountedSubtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>

            {confectioneryItems.length > 0 && confectioneryItems.length % 3 !== 0 && (
              <p className="text-[11px] text-[#7A1810] mt-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#E09F3E]" />
                Buy 2 Get 1 Free: Add {3 - (confectioneryItems.length % 3)} more confectionery for 1 FREE!
              </p>
            )}
            {b2g1Discount > 0 && (
              <p className="text-[11px] text-[#4A6B35] font-bold mt-1.5 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#E09F3E]" />
                B2G1 Deal: {freeItemsCount} item{freeItemsCount > 1 ? 's' : ''} free! Saved ₹{b2g1Discount}
              </p>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F9E4B7]/60 flex items-center justify-center text-[#9E2016] mb-3">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <h4 className="font-display text-lg font-bold text-gray-900">Your cart is empty</h4>
                <p className="text-xs text-gray-500 max-w-xs mt-1">
                  Explore our authentic Alphonso mango aam papad, royal fruit katlis, and tangy imli candies.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-5 py-2.5 bg-[#9E2016] text-white text-xs font-bold rounded-xl hover:bg-[#7A1810] transition-colors"
                >
                  Explore Delicious Treats
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.product.id}
                  className="bg-white p-3.5 rounded-2xl border border-[#EAE2D5] shadow-xs flex gap-3.5 items-center group"
                >
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-18 h-18 object-cover rounded-xl bg-[#FAF6F0] shrink-0 border border-gray-100"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.fallbackTried) {
                        target.dataset.fallbackTried = 'true';
                        if (target.src.includes('/images/')) {
                          target.src = target.src.replace('/images/', '/src/assets/images/');
                        }
                      } else {
                        target.style.display = 'none';
                      }
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className="font-display text-sm font-bold text-gray-900 truncate">
                          {item.product.name}
                        </h5>
                        <p className="text-[11px] text-gray-500">{item.product.packType}</p>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-gray-400 hover:text-[#9E2016] p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#EAE2D5] rounded-lg bg-[#FAF6F0] overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-white hover:text-[#9E2016] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold font-mono text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-white hover:text-[#9E2016] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-[#9E2016]">
                          ₹{item.product.price * item.quantity}
                        </span>
                        {item.product.originalPrice && (
                          <span className="block text-[10px] text-gray-400 line-through">
                            ₹{item.product.originalPrice * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#EAE2D5] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{rawSubtotal}</span>
                </div>
                {b2g1Discount > 0 && (
                  <div className="flex justify-between text-[#4A6B35] font-semibold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#E09F3E]" /> Buy 2 Get 1 Free Promo
                    </span>
                    <span className="font-mono">-₹{b2g1Discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Standard Shipping</span>
                  <span className="font-mono">
                    {shippingFee === 0 ? <span className="text-[#4A6B35] font-bold">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-100 flex justify-between text-sm font-bold text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-lg text-[#9E2016] font-mono">₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-[#C0392B] hover:bg-[#7A1810] text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-gray-500">
                100% Genuine Sun-cured Confectionery • Dispatched within 24h
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
