import React, { useState } from 'react';
import { X, CheckCircle2, Truck, CreditCard, ShieldCheck, Sparkles, MapPin, Phone, User } from 'lucide-react';
import { CartItem } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const [address, setAddress] = useState({
    name: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: 'Rajasthan',
    pincode: '',
  });

  if (!isOpen) return null;

  // Calculate pricing & B2G1
  const rawSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const confectioneryPrices: number[] = [];
  items.forEach(item => {
    if (item.product.isConfectionery) {
      for (let i = 0; i < item.quantity; i++) {
        confectioneryPrices.push(item.product.price);
      }
    }
  });

  confectioneryPrices.sort((a, b) => a - b);
  const freeItemsCount = Math.floor(confectioneryPrices.length / 3);
  let b2g1Discount = 0;
  for (let i = 0; i < freeItemsCount; i++) {
    b2g1Discount += confectioneryPrices[i];
  }

  let couponDiscount = 0;
  if (appliedCoupon === 'KATARIA10') {
    couponDiscount = Math.round((rawSubtotal - b2g1Discount) * 0.1);
  } else if (appliedCoupon === 'SWEET50') {
    couponDiscount = 50;
  }

  const discountedSubtotal = Math.max(0, rawSubtotal - b2g1Discount - couponDiscount);
  const shippingFee = discountedSubtotal >= 499 || discountedSubtotal === 0 ? 0 : 60;
  const grandTotal = discountedSubtotal + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'KATARIA10' || couponCode.toUpperCase() === 'SWEET50') {
      setAppliedCoupon(couponCode.toUpperCase());
    } else {
      alert('Invalid coupon code. Try KATARIA10 or SWEET50');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `KF-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderComplete(true);
    onOrderSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#EAE2D5] z-10 my-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {orderComplete ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#4A6B35]/15 text-[#4A6B35] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-display text-3xl font-bold text-[#7A1810]">
                Mithai Order Confirmed!
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Thank you, <strong>{address.name}</strong>! Your batch of fresh Rajasthani fruit confectionery is being carefully packed at our factory.
              </p>
              
              <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#EAE2D5] text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between font-bold text-gray-800 pb-2 border-b border-[#EAE2D5]">
                  <span>Order Reference</span>
                  <span className="font-mono text-[#9E2016]">{orderId}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Address:</span>
                  <span className="text-right font-medium max-w-[200px] truncate">{address.street}, {address.city}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Delivery:</span>
                  <span className="font-semibold text-[#4A6B35]">3 - 4 Business Days</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Payment Mode:</span>
                  <span className="uppercase font-semibold">{paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-[#EAE2D5]">
                  <span>Amount Paid:</span>
                  <span className="text-[#9E2016] font-mono">₹{grandTotal}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                A confirmation SMS & WhatsApp tracking link will be sent to <strong>{address.phone}</strong>.
              </p>

              <button
                onClick={onClose}
                className="mt-4 px-8 py-3.5 bg-[#9E2016] text-white font-bold text-sm rounded-xl hover:bg-[#7A1810] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 bg-[#F9E4B7] text-[#7A1810] px-3 py-1 rounded-full text-xs font-bold w-max uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C0392B]" />
                Kataria Direct Factory Checkout
              </div>

              <h3 className="font-display text-2xl font-bold text-[#7A1810]">
                Delivery & Payment
              </h3>

              <form onSubmit={handlePlaceOrder} className="mt-5 space-y-4">
                {/* Contact info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-gray-400" /> Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Aditi Sharma"
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      className="w-full text-xs border border-[#EAE2D5] rounded-xl px-3.5 py-2.5 bg-[#FAF6F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9E2016]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-gray-400" /> WhatsApp / Mobile *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 98765 43210"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full text-xs border border-[#EAE2D5] rounded-xl px-3.5 py-2.5 bg-[#FAF6F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9E2016]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" /> Delivery Street Address *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="House/Flat No, Landmark, Society/Street"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full text-xs border border-[#EAE2D5] rounded-xl px-3.5 py-2.5 bg-[#FAF6F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9E2016]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">City *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jaipur / Mumbai"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full text-xs border border-[#EAE2D5] rounded-xl px-3.5 py-2.5 bg-[#FAF6F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9E2016]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">State *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="State"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full text-xs border border-[#EAE2D5] rounded-xl px-3.5 py-2.5 bg-[#FAF6F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9E2016]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">PIN Code *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="302001"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      className="w-full text-xs border border-[#EAE2D5] rounded-xl px-3.5 py-2.5 bg-[#FAF6F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9E2016]"
                    />
                  </div>
                </div>

                {/* Coupon input */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (KATARIA10, SWEET50)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 text-xs uppercase border border-[#EAE2D5] rounded-xl px-3.5 py-2 bg-[#FAF6F0] focus:bg-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-gray-800"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <p className="text-[11px] text-[#4A6B35] font-bold mt-1">
                      Coupon "{appliedCoupon}" applied successfully!
                    </p>
                  )}
                </div>

                {/* Payment method */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-gray-700 mb-2">Select Payment Method</label>
                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-[#9E2016] bg-[#9E2016]/10 text-[#7A1810]'
                          : 'border-[#EAE2D5] text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mx-auto mb-1 text-[#9E2016]" />
                      UPI / GPay / PhonePe
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-[#9E2016] bg-[#9E2016]/10 text-[#7A1810]'
                          : 'border-[#EAE2D5] text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Truck className="w-4 h-4 mx-auto mb-1 text-[#9E2016]" />
                      Cash on Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#9E2016] bg-[#9E2016]/10 text-[#7A1810]'
                          : 'border-[#EAE2D5] text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-[#9E2016]" />
                      Cards / NetBanking
                    </button>
                  </div>
                </div>

                {/* Price review summary */}
                <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#EAE2D5] space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span className="font-mono">₹{rawSubtotal}</span>
                  </div>
                  {b2g1Discount > 0 && (
                    <div className="flex justify-between text-[#4A6B35] font-semibold">
                      <span>Buy 2 Get 1 Free Promo</span>
                      <span className="font-mono">-₹{b2g1Discount}</span>
                    </div>
                  )}
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-[#4A6B35] font-semibold">
                      <span>Coupon Discount</span>
                      <span className="font-mono">-₹{couponDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping Across India</span>
                    <span className="font-mono">
                      {shippingFee === 0 ? <strong className="text-[#4A6B35]">FREE</strong> : `₹${shippingFee}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#EAE2D5] flex justify-between text-base font-bold text-gray-900">
                    <span>Total Payable</span>
                    <span className="text-[#9E2016] font-mono text-xl">₹{grandTotal}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C0392B] hover:bg-[#7A1810] text-white font-bold text-sm py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>CONFIRM ORDER • ₹{grandTotal}</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
