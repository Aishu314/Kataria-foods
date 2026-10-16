import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Mail, FileText, Building2, Package, Sparkles } from 'lucide-react';

interface WholesaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WholesaleModal: React.FC<WholesaleModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    businessType: 'Distributor',
    city: '',
    estimatedVolume: '50 - 200 kg / month',
    note: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#EAE2D5] z-10 my-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-[#4A6B35]/10 text-[#4A6B35] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#7A1810]">
                Wholesale Inquiry Received!
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Our Kataria Foods B2B Trade Desk has received your request for <strong>{formData.company || 'your business'}</strong>.
              </p>
              <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#EAE2D5] text-left text-xs text-gray-700 space-y-1.5 max-w-md mx-auto">
                <p><strong>Direct Priority Line:</strong> +91 9309489012</p>
                <p><strong>Wholesale Catalog:</strong> Sent to {formData.email || 'your email'}</p>
                <p><strong>Sample Box:</strong> Our team will dispatch tasting samples for {formData.city || 'your store location'}.</p>
              </div>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-3 bg-[#9E2016] text-white font-bold text-sm rounded-xl hover:bg-[#7A1810] transition-colors"
              >
                Close & Return to Store
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 bg-[#F9E4B7] text-[#7A1810] px-3 py-1 rounded-full text-xs font-bold w-max uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C0392B]" />
                B2B, Institutional & Exports
              </div>

              <h3 className="font-display text-2xl font-bold text-[#7A1810]">
                Request Kataria Foods Wholesale Catalog
              </h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Direct manufacturer prices on pure fruit bars, diamond katlis, authentic imli candies, and festive confectionery gift tins.
              </p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs border border-[#EAE2D5] rounded-xl px-3.5 py-2.5 bg-[#FAF6F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9E2016]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Company / Store Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Royal Sweets & Mart"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full text-xs border border-[#EAE2D5] rounded-xl px-3.5 py-2.5 bg-[#FAF6F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9E2016]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp / Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs border border-[#EAE2D5] rounded-xl px-3.5 py-2.5 bg-[#FAF6F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9E2016]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Business Email *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="trade@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs border border-[#EAE2D5] rounded-xl px-3.5 py-2.5 bg-[#FAF6F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9E2016]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Business Type</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full text-xs border border-[#EAE2D5] rounded-xl px-3.5 py-2.5 bg-[#FAF6F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9E2016]"
                    >
                      <option>Regional Distributor</option>
                      <option>Supermarket / Retail Chain</option>
                      <option>Corporate Gifting / HR</option>
                      <option>Exporter / Overseas Buyer</option>
                      <option>Sweet Shop / Mithai Outlet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">City & State *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Jaipur, Rajasthan"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs border border-[#EAE2D5] rounded-xl px-3.5 py-2.5 bg-[#FAF6F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9E2016]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Requirement & Questions</label>
                  <textarea 
                    rows={2}
                    placeholder="Tell us which products you need (e.g. 500kg Alphonso Aam Papad, 250gm Imli Candies for Diwali hampers)"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full text-xs border border-[#EAE2D5] rounded-xl px-3.5 py-2 bg-[#FAF6F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9E2016]"
                  />
                </div>

                <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#EAE2D5] flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#9E2016]" />
                    <span>Instant Price Matrix & FSSAI Lab Report included</span>
                  </div>
                  <span className="font-bold text-[#4A6B35]">PDF Available</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#9E2016] hover:bg-[#7A1810] text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  <span>SUBMIT WHOLESALE REQUEST</span>
                </button>
              </form>

              <div className="mt-4 pt-3 border-t border-[#EAE2D5] flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#9E2016]" /> +91 9309489012
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#9E2016]" /> sales@thekatariafoods.com
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
