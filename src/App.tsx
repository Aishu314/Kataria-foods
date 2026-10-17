import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Heart, Sparkles, Check, ArrowRight, 
  Truck, ShieldCheck, Phone, Mail, Award, Leaf, ChevronRight,
  CheckCircle2, Menu, X
} from 'lucide-react';
import { BESTSELLER_PRODUCTS, CONFECTIONERY_PRODUCTS, Product, CartItem } from './data/products';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { WholesaleModal } from './components/WholesaleModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';

interface ToastMessage {
  id: number;
  productName: string;
  price: number;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isWholesaleOpen, setIsWholesaleOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Email newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Toast feedback
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (productName: string, price: number) => {
    const newToast: ToastMessage = {
      id: Date.now(),
      productName,
      price
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 2800);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(product.name, product.price);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSubscribed(false);
      }, 4000);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (!target.dataset.fallbackTried) {
      target.dataset.fallbackTried = 'true';
      if (target.src.includes('/images/')) {
        target.src = target.src.replace('/images/', '/src/assets/images/');
      } else if (target.src.includes('/src/assets/images/')) {
        target.src = target.src.replace('/src/assets/images/', '/images/');
      }
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#221A14] flex flex-col font-body selection:bg-[#E09F3E]/30 selection:text-[#7A1810]">
      
      {/* Top Announcement Bar */}
      <div className="bg-[#7A1810] text-white py-1 px-3 text-center text-xs tracking-wide flex items-center justify-center gap-2">
        <Truck className="w-3.5 h-3.5 text-[#E09F3E] shrink-0" />
        <span>Free Delivery across India on orders over ₹499 | Buy 2 Get 1 Sale Live!</span>
      </div>

      {/* Global Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAE2D5] shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          {/* Main Bar with Heading in the Middle */}
          <div className="h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4 relative">
            
            {/* Left Actions / Mobile Menu Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-start">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#55443B] hover:bg-[#FAF6F0] rounded-lg transition-colors cursor-pointer"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <button 
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search delicacies"
                className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#55443B] hover:text-[#9E2016] bg-[#FAF6F0] hover:bg-[#F9E4B7]/40 px-3 py-1.5 rounded-full border border-[#EAE2D5] transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-[#9E2016]" />
                <span>Search delicacies...</span>
              </button>

              <button 
                onClick={() => setIsWholesaleOpen(true)}
                className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-[#7A1810] hover:text-[#9E2016] px-2.5 py-1 rounded-md hover:bg-[#FAF6F0] transition-colors cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-[#E09F3E]" />
                <span>Bulk Orders</span>
              </button>
            </div>

            {/* Middle: Brand Heading Kataria Foods & Kataria Grah Udyog */}
            <div className="flex flex-col items-center justify-center text-center px-2">
              <a href="#" className="flex flex-col items-center group">
                <div className="flex items-center gap-2 sm:gap-2.5 justify-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#9E2016] flex items-center justify-center text-white shadow-sm overflow-hidden p-1 transition-transform group-hover:scale-105 shrink-0">
                    <img 
                      src="https://lh3.googleusercontent.com/aida/AEtjO1U696bhqR5ROInDwzJmgrJ8eTv2PhBLqyQDiBsTt_m49geAaeeUIoLy1rOFhmlBB-EhnOU72Z7pouOyqZDOtctxff4t4qf6vHHzuDs2cDWKqGS5dQye_RSxt6AETxMPkb_1kfYIXKrbwxfFRdUpb2HwGfnLSyxB-YsJx_MJg4aMc18n97vFWX5UfTYm-rlUsyJsu2-Yj_HFAQS-jGModowt3updO-DE_OHzWrlBtfiuy7ykp6YrXMde8rik"
                      alt="Kataria Foods"
                      className="w-6 h-6 sm:w-8 sm:h-8 object-contain invert brightness-200"
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<span class="font-display font-bold text-sm sm:text-base">KF</span>';
                        }
                      }}
                    />
                  </div>
                  <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#9E2016] leading-none tracking-tight block text-center">
                    Kataria Foods
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] tracking-[0.24em] text-[#6B5A52] uppercase font-bold text-center mt-1">
                  Kataria Grah Udyog
                </span>
              </a>
            </div>

            {/* Right side Utility Actions */}
            <div className="flex items-center gap-1.5 sm:gap-3 flex-1 justify-end">
              <button 
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search delicacies"
                className="sm:hidden w-8 h-8 rounded-full flex items-center justify-center text-[#55443B] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>

              <button 
                onClick={() => setIsWishlistOpen(true)}
                aria-label="View Wishlist"
                className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[#55443B] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#E09F3E] text-[#7A1810] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setIsCartOpen(true)}
                aria-label="Cart"
                className="relative flex items-center gap-1.5 sm:gap-2 bg-[#FAF6F0] hover:bg-[#F9E4B7]/60 text-[#9E2016] px-2.5 sm:px-3 py-1.5 rounded-full transition-colors shadow-xs cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="text-xs font-bold hidden md:inline">Cart</span>
                <span className="bg-[#C0392B] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                  {totalCartCount}
                </span>
              </button>
            </div>
          </div>

          {/* Desktop Navigation Menu (Centered below heading) */}
          <nav className="hidden lg:flex items-center justify-center gap-8 py-2.5 border-t border-[#EAE2D5]/70 text-xs font-bold uppercase tracking-wider">
            <a href="#bestsellers" className="text-[#9E2016] border-b-2 border-[#9E2016] pb-0.5 hover:text-[#7A1810]">
              Shop All
            </a>
            <a href="#categories" className="text-[#4A3D36] hover:text-[#9E2016] transition-colors">
              Fruit Bars
            </a>
            <a href="#categories" className="text-[#4A3D36] hover:text-[#9E2016] transition-colors">
              Fruit Katlis
            </a>
            <a href="#categories" className="text-[#4A3D36] hover:text-[#9E2016] transition-colors">
              Digestives
            </a>
            <a 
              href="#confectionery" 
              className="text-[#4A3D36] hover:text-[#9E2016] transition-colors flex items-center gap-1.5"
            >
              <span>Candies & Toffees</span>
              <span className="bg-[#C0392B] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                New
              </span>
            </a>
            <button 
              onClick={() => setIsWholesaleOpen(true)}
              className="text-[#4A3D36] hover:text-[#9E2016] transition-colors cursor-pointer"
            >
              Bulk Orders
            </button>
            <a href="#heritage" className="text-[#4A3D36] hover:text-[#9E2016] transition-colors">
              Our Heritage
            </a>
          </nav>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#EAE2D5] px-4 py-3 space-y-2.5">
            <a 
              href="#bestsellers" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold text-[#9E2016]"
            >
              Shop All Delicacies
            </a>
            <a 
              href="#categories" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-gray-700 hover:text-[#9E2016]"
            >
              Fruit Bars & Katlis
            </a>
            <a 
              href="#confectionery" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-gray-700 hover:text-[#9E2016] flex items-center justify-between"
            >
              <span>Candies & Toffees</span>
              <span className="bg-[#C0392B] text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">New</span>
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setIsWholesaleOpen(true);
              }}
              className="block text-left w-full text-sm font-semibold text-gray-700 hover:text-[#9E2016]"
            >
              Bulk & Corporate Orders
            </button>
            <a 
              href="#heritage" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-gray-700 hover:text-[#9E2016]"
            >
              Our Heritage (Since 1984)
            </a>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Notification Ribbon */}
        <section className="bg-[#F9E4B7] text-[#7A1810] py-2 px-3 border-b border-[#EAE2D5]">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs font-semibold gap-1.5">
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#C0392B] shrink-0" />
              <span>A Legacy of Sweetness: Now presenting our comprehensive Kataria Foods pantry & confectionery collection.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#4A6B35] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A6B35] animate-pulse"></span>
                100% Real Fruit Sun-Dehydrated
              </span>
              <a href="#confectionery" className="text-[#C0392B] hover:text-[#7A1810] underline font-bold tracking-wide">
                BUY 2 GET 1 FREE LIVE
              </a>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative py-8 md:py-12 overflow-hidden bg-[#FAF6F0] border-b border-[#EAE2D5]">
          <div className="max-w-7xl mx-auto px-3 sm:px-6">
            
            {/* Centered Hero Heading & Description in the Middle */}
            <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-3.5 mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-1.5 bg-[#F9E4B7]/80 text-[#7A1810] px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border border-[#EAE2D5] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C0392B]" />
                <span>Kataria Grah Udyog • Since 1984</span>
              </div>

              <h1 className="font-display hero-headline text-4xl sm:text-5xl lg:text-6xl text-[#9E2016] font-bold leading-[1.1] tracking-tight text-center">
                Meet your new <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#7A1810]">snack-time favourites.</span>
              </h1>

              <p className="text-base md:text-lg text-[#55443B] leading-relaxed max-w-2xl text-center mx-auto">
                Authentic sun-ripened Alphonso pulps, nostalgic sour imli bites, handcrafted fruit katlis, and refreshing raw mango candies. Generations of Rajasthani confectionery craftsmanship, made for modern wholesome cravings.
              </p>

              {/* Centered Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
                <a 
                  href="#confectionery" 
                  className="bg-[#C0392B] hover:bg-[#7A1810] text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 group"
                >
                  <span>EXPLORE THE NEW RANGE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#bestsellers" 
                  className="bg-white hover:bg-[#F9E4B7]/40 text-[#7A1810] border border-[#EAE2D5] font-bold text-sm px-6 py-3.5 rounded-xl transition-colors shadow-xs"
                >
                  View Bestsellers
                </a>
              </div>
            </div>

            {/* Value Props & Hero Visual Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Value Prop Badges */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                <div className="bg-[#FFFDF9] p-3.5 sm:p-4 rounded-xl border border-[#EAE2D5] text-center shadow-xs">
                  <Leaf className="w-5 sm:w-6 h-5 sm:h-6 text-[#C0392B] mx-auto mb-1" />
                  <p className="text-xs font-bold text-gray-900">100% Real Fruit</p>
                  <p className="text-[11px] text-gray-500">Zero wax or gelatine</p>
                </div>
                <div className="bg-[#FFFDF9] p-3.5 sm:p-4 rounded-xl border border-[#EAE2D5] text-center shadow-xs">
                  <Heart className="w-5 sm:w-6 h-5 sm:h-6 text-[#4A6B35] mx-auto mb-1" />
                  <p className="text-xs font-bold text-gray-900">0% Cholesterol</p>
                  <p className="text-[11px] text-gray-500">Clean guilt-free chew</p>
                </div>
                <div className="bg-[#FFFDF9] p-3.5 sm:p-4 rounded-xl border border-[#EAE2D5] text-center shadow-xs">
                  <Award className="w-5 sm:w-6 h-5 sm:h-6 text-[#E09F3E] mx-auto mb-1" />
                  <p className="text-xs font-bold text-gray-900">Royal Heritage</p>
                  <p className="text-[11px] text-gray-500">Traditional recipes</p>
                </div>
                <div className="bg-[#FFFDF9] p-3.5 sm:p-4 rounded-xl border border-[#EAE2D5] text-center shadow-xs">
                  <ShieldCheck className="w-5 sm:w-6 h-5 sm:h-6 text-[#9E2016] mx-auto mb-1" />
                  <p className="text-xs font-bold text-gray-900">Hygienic Pack</p>
                  <p className="text-[11px] text-gray-500">Freshness sealed</p>
                </div>
              </div>

              {/* Hero Visual Banner Image Card */}
              <div className="lg:col-span-7 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                  <img 
                    src="/images/hero_kataria_sweets_1792174204979.jpg"
                    alt="Kataria Foods Heritage Assortment"
                    className="w-full h-[320px] sm:h-[380px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-[#EAE2D5] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-[#E09F3E] text-xs font-bold">
                        <span>★★★★★</span>
                        <span className="text-gray-900 ml-1">4.9 / 5.0</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">Loved by 45,000+ Families Across India</p>
                      <p className="text-xs text-gray-600">Fresh batch dispatch direct from factory</p>
                    </div>
                    <span className="bg-[#C0392B] text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide shrink-0">
                      B2G1 Sale
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Category Exploration Section */}
        <section className="py-8 md:py-10 bg-white" id="categories">
          <div className="max-w-7xl mx-auto px-3 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#9E2016]">
                The Kataria Foods Experience
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#9E2016] mt-0.5">
                Generations of Fruity Indulgence
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                From timeless royal Rajasthani recipes to modern fruit snacking, discover our core pantry offerings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Category 1: Fruit Bars */}
              <div 
                onClick={() => {
                  const el = document.getElementById('bestsellers');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#FAF6F0] rounded-2xl overflow-hidden border border-[#EAE2D5] flex flex-col group hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="h-60 bg-[#F9E4B7]/40 overflow-hidden relative">
                  <img 
                    src="/images/cat_fruit_bars_1792174206008.jpg"
                    alt="Kataria Fruit Bars"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                  <span className="absolute top-3 left-3 bg-[#C0392B] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Signature
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#9E2016]">Fruit Bars</h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      The chewy, fruity snack loved since childhood. Real dehydrated mango, guava, and raw mango layers.
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#EAE2D5] flex items-center justify-between text-[#C0392B] font-bold text-sm">
                    <span>View 8 Flavors</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Category 2: Fruit Katli */}
              <div 
                onClick={() => {
                  const el = document.getElementById('bestsellers');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#FAF6F0] rounded-2xl overflow-hidden border border-[#EAE2D5] flex flex-col group hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="h-60 bg-[#F9E4B7]/40 overflow-hidden relative">
                  <img 
                    src="/images/cat_fruit_katli_1792174206783.jpg"
                    alt="Kataria Fruit Katli"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                  <span className="absolute top-3 left-3 bg-[#4A6B35] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Guilt-Free Mithai
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#9E2016]">Fruit Katlis</h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      Real fruit pulps shaped into sparkling diamond sweets. Alphonso mango, amla dry fruit, and black currant cuts.
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#EAE2D5] flex items-center justify-between text-[#C0392B] font-bold text-sm">
                    <span>View Royal Katlis</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Category 3: Candies & Digestives */}
              <div 
                onClick={() => {
                  const el = document.getElementById('confectionery');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#FAF6F0] rounded-2xl overflow-hidden border border-[#EAE2D5] flex flex-col group hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="h-60 bg-[#F9E4B7]/40 overflow-hidden relative">
                  <img 
                    src="/images/cat_digestives_candies_1792174206869.jpg"
                    alt="Kataria Candies and Digestives"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                  <span className="absolute top-3 left-3 bg-[#E09F3E] text-[#7A1810] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Ayurvedic & Tangy
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#9E2016]">Digestives & Candies</h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      Zesty tamarind toffees, tangy raw mango shots, sweet neem mukhwas, and stomach-soothing churan bites.
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#EAE2D5] flex items-center justify-between text-[#C0392B] font-bold text-sm">
                    <span>Explore Candies & Digestives</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Promotional Sale Banner */}
        <section className="bg-[#C0392B] text-white py-6 px-3 sm:px-6 shadow-inner">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <span className="bg-[#F9E4B7] text-[#7A1810] text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                Festive Pantry Offer
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold mt-1.5">
                Buy Any 2 Confectioneries, Get 1 Free!
              </h3>
              <p className="text-xs sm:text-sm text-[#F9E4B7]/90 mt-0.5">
                Mix and match across authentic fruit bars, diamond katlis, and pet jars of tangy imli candies.
              </p>
            </div>
            <a 
              href="#confectionery" 
              className="bg-white hover:bg-[#F9E4B7] text-[#9E2016] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors shadow-md shrink-0"
            >
              Shop The Collection
            </a>
          </div>
        </section>

        {/* Section 1: Customer Hall of Fame (Loved Across India) */}
        <section className="py-8 md:py-10 bg-[#FAF6F0]" id="bestsellers">
          <div className="max-w-7xl mx-auto px-3 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-3">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#9E2016]">
                  Customer Hall of Fame
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#9E2016] mt-0.5">
                  Loved Across India
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                  From corporate gifting to family snack boxes — Kataria Foods is a slice of home, delivered.
                </p>
              </div>
              <span className="bg-[#F9E4B7] text-[#7A1810] text-xs font-bold px-3 py-1.5 rounded-lg border border-[#EAE2D5] w-max">
                8 Signature Picks
              </span>
            </div>

            {/* 8 Bestseller Cards */}
            <div className="grid responsive-product-grid gap-4 sm:gap-5">
              {BESTSELLER_PRODUCTS.map((product) => {
                const isItemWishlisted = wishlist.some((w) => w.id === product.id);
                return (
                  <div 
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="bg-white rounded-2xl overflow-hidden border border-[#EAE2D5] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[#F9E4B7]/20">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        onError={handleImageError}
                      />
                      <span className="absolute top-3 left-3 bg-[#C0392B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Sale
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleWishlist(product);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-600 flex items-center justify-center transition-colors shadow-xs"
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isItemWishlisted ? 'fill-[#C0392B] text-[#C0392B]' : ''}`} />
                      </button>
                    </div>

                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="text-xs text-[#E09F3E] font-bold mb-1 flex items-center">
                          <span>★★★★★</span>
                          <span className="text-gray-500 font-normal ml-1">({product.reviewsCount.toLocaleString()})</span>
                        </div>
                        <h4 className="font-display text-lg font-bold text-gray-900 group-hover:text-[#9E2016] transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {product.tagline}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#EAE2D5] flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-[#C0392B] font-mono">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through ml-1.5 font-mono">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className="bg-[#C0392B] hover:bg-[#7A1810] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer active:scale-95"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 2: Confectionery & Candies Line (Newly Launched Under Kataria Foods) */}
        <section className="py-8 md:py-10 bg-white" id="confectionery">
          <div className="max-w-7xl mx-auto px-3 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-[#F9E4B7] text-[#7A1810] px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-3 h-3 text-[#C0392B]" />
                  <span>Newly Launched Under Kataria Foods</span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#9E2016]">
                  Traditional Candies, Toffees & Fruit Burfi Bars
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5 max-w-2xl">
                  Now integrated seamlessly into the Kataria Foods house. Authentic tamarind burfis, tangy raw mango shots, chewy fruit cubes, and creamy mango toffees.
                </p>
              </div>
              <span className="text-xs font-bold text-[#4A6B35] bg-[#4A6B35]/10 border border-[#4A6B35]/20 px-2.5 py-1 rounded-lg w-max">
                Direct From Confectionery Factory
              </span>
            </div>

            {/* 8 Confectionery Products */}
            <div className="grid responsive-product-grid gap-4 sm:gap-5">
              {CONFECTIONERY_PRODUCTS.map((product) => {
                const isItemWishlisted = wishlist.some((w) => w.id === product.id);
                return (
                  <div 
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="bg-[#FAF6F0] rounded-2xl overflow-hidden border border-[#EAE2D5] p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-[#F9E4B7]/30 mb-4">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        onError={handleImageError}
                      />
                      <span 
                        className="absolute top-2.5 left-2.5 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                        style={{ backgroundColor: product.tagColor || '#C0392B' }}
                      >
                        {product.tag}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleWishlist(product);
                        }}
                        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-gray-600 flex items-center justify-center transition-colors shadow-xs"
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isItemWishlisted ? 'fill-[#C0392B] text-[#C0392B]' : ''}`} />
                      </button>
                    </div>

                    <div>
                      <span 
                        className="text-[11px] font-bold uppercase tracking-wider block"
                        style={{ color: product.tagColor || '#9E2016' }}
                      >
                        {product.packType}
                      </span>
                      <h4 className="font-display text-lg font-bold text-gray-900 group-hover:text-[#9E2016] transition-colors mt-0.5">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed line-clamp-2">
                        {product.tagline}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#EAE2D5] flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-[#C0392B] font-mono">₹{product.price}</span>
                        {product.unitLabel && (
                          <span className="text-xs text-gray-500">{product.unitLabel}</span>
                        )}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="bg-[#9E2016] hover:bg-[#7A1810] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1 transition-colors cursor-pointer active:scale-95"
                      >
                        <span>+ Add</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Legacy & Craftsmanship Section */}
        <section className="py-8 md:py-10 bg-[#FAF6F0] border-t border-[#EAE2D5]" id="heritage">
          <div className="max-w-7xl mx-auto px-3 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white p-1.5 group">
                  <img 
                    src="/images/craft_archive_heritage_1792174206620.jpg"
                    alt="Artisanal confectionery craft at Kataria Foods"
                    className="w-full h-[320px] sm:h-[350px] object-cover object-center rounded-xl group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                  <div className="p-3 text-center">
                    <span className="text-[11px] font-bold text-[#9E2016] uppercase tracking-widest">
                      Kataria Grah Udyog Archive
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5">
                      Pioneers in Fruit Dehydration & Authentic Indian Sweets
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col gap-3.5">
                <span className="text-xs uppercase tracking-widest font-bold text-[#C0392B]">
                  Generations of Craft
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#9E2016] leading-tight">
                  A Legacy of Sweetness: Welcome to Kataria Foods
                </h2>
                <p className="text-xs sm:text-sm text-[#4A3D36] leading-relaxed">
                  Kataria Foods has long been synonymous with authentic packaged fruit bars, fruit katlis, masala aam papads, and digestive snacks. With our expanded confectionery line, we cherish age-old Indian confection recipes and blend them with modern manufacturing technology to bring you the best of both worlds.
                </p>
                <p className="text-xs sm:text-sm text-[#4A3D36] leading-relaxed">
                  We process harvest-fresh mangoes, raw kachha aam, tamarind (imli), Indian gooseberry (amla), strawberries, and guava into wholesome snacks that are naturally rich in fiber and free from cholesterol.
                </p>

                {/* 4 Core Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-[#EAE2D5] shadow-xs">
                    <div className="w-9 h-9 rounded-lg bg-[#F9E4B7] text-[#9E2016] flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-900">Unmatched Quality</h5>
                      <p className="text-[11px] text-gray-500 mt-0.5">Finest ingredients and strict adherence to highest taste standards.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-[#EAE2D5] shadow-xs">
                    <div className="w-9 h-9 rounded-lg bg-[#F9E4B7] text-[#4A6B35] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-900">Hygiene & Safety</h5>
                      <p className="text-[11px] text-gray-500 mt-0.5">State-of-the-art manufacturing complying with rigorous food safety norms.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-[#EAE2D5] shadow-xs">
                    <div className="w-9 h-9 rounded-lg bg-[#F9E4B7] text-[#E09F3E] flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-900">Traditional Taste</h5>
                      <p className="text-[11px] text-gray-500 mt-0.5">Authentic recipes passed through generations, delivering real Indian nostalgia.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-[#EAE2D5] shadow-xs">
                    <div className="w-9 h-9 rounded-lg bg-[#F9E4B7] text-[#7A1810] flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-900">Modern Packaging</h5>
                      <p className="text-[11px] text-gray-500 mt-0.5">Multi-layer freshness seals locking in aroma, crunch, and chew.</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Wholesale & Bulk Order Banner */}
        <section className="bg-[#9E2016] text-white py-8 px-3 sm:px-6" id="bulk-orders">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="bg-[#F9E4B7] text-[#7A1810] text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                B2B & Corporate Supply
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold mt-1.5">
                Partner with Kataria Foods
              </h3>
              <p className="text-xs sm:text-sm text-[#F9E4B7]/80 mt-1 leading-relaxed">
                Manufacturer of premium fruit bar toffees, candies, and dried fruit sweets. Flavours include Mango, Kachha Mango, Imli, Guava, Strawberry, and more. Perfect for retail distributors, supermarkets, export, and festive bulk gifting.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a 
                href="tel:+919309489012" 
                className="bg-[#E09F3E] hover:bg-white text-[#7A1810] font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors shadow-md flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>+91 9309489012</span>
              </a>
              <button 
                onClick={() => setIsWholesaleOpen(true)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-white/20 transition-colors cursor-pointer"
              >
                Request Wholesale Catalog
              </button>
            </div>
          </div>
        </section>

        {/* Partner & Distributor Testimonials */}
        <section className="py-8 md:py-10 bg-white" id="testimonials">
          <div className="max-w-7xl mx-auto px-3 sm:px-6">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#9E2016]">
                Word on the Street
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#9E2016] mt-0.5">
                What Our Partners Say
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                Trusted across general trade, modern retail, and regional distributors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              
              <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#EAE2D5] flex flex-col justify-between">
                <div>
                  <div className="text-[#E09F3E] text-xs mb-1.5">★★★★★</div>
                  <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                    “Kataria Foods has been our trusted confectionery partner for years. Their commitment to quality and timely delivery is unparalleled. Our customers love their fruit bars!”
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EAE2D5] flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#F9E4B7] text-[#9E2016] font-bold flex items-center justify-center text-xs">
                    R
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Rajesh Kumar</p>
                    <p className="text-[11px] text-gray-500">Distributor, North India</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#EAE2D5] flex flex-col justify-between">
                <div>
                  <div className="text-[#E09F3E] text-xs mb-1.5">★★★★★</div>
                  <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                    “The variety and authentic taste of Kataria Foods candies make them a top seller in our store. The fresh-lock packaging attracts premium customers.”
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EAE2D5] flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#F9E4B7] text-[#9E2016] font-bold flex items-center justify-center text-xs">
                    P
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Priya Sharma</p>
                    <p className="text-[11px] text-gray-500">Retail Partner, Mumbai</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#EAE2D5] flex flex-col justify-between">
                <div>
                  <div className="text-[#E09F3E] text-xs mb-1.5">★★★★★</div>
                  <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                    “A great range of products, especially the fruit bars and diamond katlis. Consistent quality and good profit margins. Proud to partner with Kataria Foods.”
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EAE2D5] flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#F9E4B7] text-[#9E2016] font-bold flex items-center justify-center text-xs">
                    A
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Amit Singh</p>
                    <p className="text-[11px] text-gray-500">Wholesaler, Gujarat</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <footer className="bg-[#7A1810] text-white pt-8 pb-5 border-t border-[#EAE2D5]/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          
          {/* 4 Trust Badges Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <Leaf className="w-6 h-6 text-[#E09F3E] shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-white">Fiber-Rich Goodness</h5>
                <p className="text-[11px] text-[#F9E4B7]/70">Keeps you fuller, longer</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Heart className="w-6 h-6 text-[#E09F3E] shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-white">0% Cholesterol</h5>
                <p className="text-[11px] text-[#F9E4B7]/70">Guilt-free every time</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-6 h-6 text-[#E09F3E] shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-white">Real Fruit, Real Taste</h5>
                <p className="text-[11px] text-[#F9E4B7]/70">No artificial nonsense</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Award className="w-6 h-6 text-[#E09F3E] shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-white">Heritage Quality</h5>
                <p className="text-[11px] text-[#F9E4B7]/70">Kataria Grah Udyog craft</p>
              </div>
            </div>
          </div>

          {/* Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-white/10">
            <div className="md:col-span-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl font-bold text-[#E09F3E]">Kataria Foods</span>
              </div>
              <p className="text-xs text-[#F9E4B7]/80 leading-relaxed max-w-sm">
                Kataria Grah Udyog — Manufacturer of premium fruit bars, royal fruit katlis, chatori aam papad, toffees, and traditional digestive candies made with authentic fruit pulps.
              </p>
              <div className="text-xs text-[#F9E4B7]/70 mt-2 space-y-1">
                <p><strong className="text-white">Wholesale & Retail:</strong> +91 9309489012</p>
                <p><strong className="text-white">Email:</strong> sales@thekatariafoods.com</p>
                <p><strong className="text-white">Facility:</strong> Rajasthan & Maharashtra, India</p>
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col gap-2">
              <h6 className="text-xs font-bold uppercase tracking-wider text-[#E09F3E] mb-2">
                Product Categories
              </h6>
              <a href="#bestsellers" className="text-xs text-[#F9E4B7]/80 hover:text-white transition-colors">
                Fruit Bars & Burfis
              </a>
              <a href="#bestsellers" className="text-xs text-[#F9E4B7]/80 hover:text-white transition-colors">
                Fruit Katlis (Mango, Amla, Currant)
              </a>
              <a href="#confectionery" className="text-xs text-[#F9E4B7]/80 hover:text-white transition-colors">
                Candies & Toffees (Imli, Mango)
              </a>
              <a href="#categories" className="text-xs text-[#F9E4B7]/80 hover:text-white transition-colors">
                Digestives & Churan Drops
              </a>
              <a href="#bestsellers" className="text-xs text-[#F9E4B7]/80 hover:text-white transition-colors">
                Dry Fruit & Sugar Free Snacks
              </a>
              <button 
                onClick={() => setIsWholesaleOpen(true)}
                className="text-left text-xs text-[#F9E4B7]/80 hover:text-white transition-colors cursor-pointer"
              >
                Bulk Orders & Hampers
              </button>
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <h6 className="text-xs font-bold uppercase tracking-wider text-[#E09F3E] mb-2">
                Quick Links
              </h6>
              <a href="#heritage" className="text-xs text-[#F9E4B7]/80 hover:text-white transition-colors">
                About Us
              </a>
              <a href="#bestsellers" className="text-xs text-[#F9E4B7]/80 hover:text-white transition-colors">
                Bestsellers
              </a>
              <a href="#testimonials" className="text-xs text-[#F9E4B7]/80 hover:text-white transition-colors">
                Partner Reviews
              </a>
              <button 
                onClick={() => setIsWholesaleOpen(true)}
                className="text-left text-xs text-[#F9E4B7]/80 hover:text-white transition-colors cursor-pointer"
              >
                Wholesale Pricing
              </button>
              <a href="#" className="text-xs text-[#F9E4B7]/80 hover:text-white transition-colors">
                Shipping & Policies
              </a>
            </div>

            <div className="md:col-span-3 flex flex-col gap-3">
              <h6 className="text-xs font-bold uppercase tracking-wider text-[#E09F3E] mb-1">
                We send tasty emails
              </h6>
              <p className="text-xs text-[#F9E4B7]/80">
                Get seasonal harvest fruit drops, B2G1 discounts, and festive gift boxes in your inbox.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 mt-2">
                <input 
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-[#F9E4B7]/50 focus:outline-none focus:ring-1 focus:ring-[#E09F3E] flex-1"
                />
                <button 
                  type="submit"
                  className="bg-[#C0392B] hover:bg-[#E09F3E] hover:text-[#7A1810] text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
              {newsletterSubscribed && (
                <p className="text-xs text-[#E09F3E] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Welcome! Check your inbox for your 10% coupon.
                </p>
              )}
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F9E4B7]/60 gap-4">
            <p>© 2026 Kataria Grah Udyog (Kataria Foods). All rights reserved.</p>
            <p>100% Vegetarian • FSSAI Certified Manufacturing • Authentic Indian Taste</p>
          </div>

        </div>
      </footer>

      {/* Interactive Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onOpenProduct={(product) => {
          setIsCartOpen(false);
          setSelectedProduct(product);
        }}
      />

      {/* Product Quick View / Detail Modal */}
      <ProductModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlist.some((p) => p.id === selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={handleAddToCart}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemove={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
        onAddToCart={handleAddToCart}
      />

      {/* B2B Wholesale Modal */}
      <WholesaleModal 
        isOpen={isWholesaleOpen}
        onClose={() => setIsWholesaleOpen(false)}
      />

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderSuccess={() => {
          setCart([]);
        }}
      />

      {/* Add to Cart Floating Toasts */}
      <div className="fixed bottom-20 md:bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            className="bg-[#7A1810] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#E09F3E]/30 animate-bounce pointer-events-auto"
          >
            <CheckCircle2 className="w-5 h-5 text-[#E09F3E] shrink-0" />
            <div>
              <p className="text-xs font-bold">{toast.productName} added to cart</p>
              <p className="text-[11px] text-[#F9E4B7]">₹{toast.price} | Buy 2 Get 1 Applied</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Mobile Bottom Navigation Bar (Visible only on mobile screens <= 768px via CSS Media Query) */}
      <nav className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAE2D5] py-2 px-3 justify-around items-center shadow-lg safe-area-bottom">
        <a 
          href="#bestsellers" 
          className="flex flex-col items-center text-[#7A1810] hover:text-[#9E2016] text-[11px] font-semibold touch-target justify-center"
        >
          <Award className="w-5 h-5 mb-0.5 text-[#9E2016]" />
          <span>Shop</span>
        </a>
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center text-[#7A1810] hover:text-[#9E2016] text-[11px] font-semibold touch-target justify-center cursor-pointer"
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span>Search</span>
        </button>
        <button 
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center text-[#7A1810] hover:text-[#9E2016] text-[11px] font-semibold touch-target justify-center cursor-pointer"
        >
          <Heart className="w-5 h-5 mb-0.5" />
          <span>Wishlist</span>
          {wishlist.length > 0 && (
            <span className="absolute top-0 right-1 bg-[#E09F3E] text-[#7A1810] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </button>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center text-[#9E2016] hover:text-[#7A1810] text-[11px] font-bold touch-target justify-center cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          <span>Cart</span>
          {totalCartCount > 0 && (
            <span className="absolute top-0 right-1 bg-[#C0392B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </button>
      </nav>

    </div>
  );
}
