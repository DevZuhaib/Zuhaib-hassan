
import React, { useState } from 'react';
import { Product } from '../types';
// Fix: Import PAYMENT_DETAILS from the correct file (constants.tsx)
import { PAYMENT_DETAILS } from '../constants';

interface CartViewProps {
  cart: { productId: string; quantity: number }[];
  setCart: React.Dispatch<React.SetStateAction<{ productId: string; quantity: number }[]>>;
  products: Product[];
  placeOrder: (method: 'EasyPaisa' | 'Bank Transfer', reference: string) => void;
  isLoggedIn: boolean;
  onAuthClick: () => void;
}

const CartView: React.FC<CartViewProps> = ({ cart, setCart, products, placeOrder, isLoggedIn, onAuthClick }) => {
  const [step, setStep] = useState<'review' | 'payment'>('review');
  const [paymentMethod, setPaymentMethod] = useState<'EasyPaisa' | 'Bank Transfer'>('EasyPaisa');
  const [reference, setReference] = useState('');

  const cartItems = cart.map(c => {
    const product = products.find(p => p.id === c.productId)!;
    return { ...product, cartQuantity: c.quantity };
  });

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0);

  const handleRemove = (id: string) => {
    setCart(prev => prev.filter(i => i.productId !== id));
  };

  const handleConfirmPayment = () => {
    if (!reference.trim()) {
      alert("Please enter a transaction ID or reference number!");
      return;
    }
    placeOrder(paymentMethod, reference);
  };

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center glass rounded-3xl p-12 border border-white/5">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-3xl font-black font-display text-white mb-2">Cart is empty</h2>
        <p className="text-gray-500 mb-8">Go back to the store and find something amazing.</p>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-4xl font-black font-display text-white">SHOPPING CART</h2>
        <div className="h-px flex-grow bg-white/10"></div>
      </div>

      {step === 'review' ? (
        <div className="space-y-6">
          <div className="glass rounded-3xl border border-white/10 overflow-hidden">
            <div className="p-8 space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <img src={item.image} className="w-16 h-16 rounded-xl object-cover bg-white/5" />
                    <div>
                      <h4 className="text-white font-bold">{item.name}</h4>
                      <p className="text-gray-500 text-sm">${item.price} x {item.cartQuantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xl font-bold text-white">${item.price * item.cartQuantity}</span>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="p-2 hover:text-red-400 text-gray-600 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white/5 p-8 flex justify-between items-center border-t border-white/10">
              <div>
                <span className="text-gray-500 text-sm uppercase tracking-widest font-bold">Grand Total</span>
                <div className="text-4xl font-black text-blue-400">${total}</div>
              </div>
              {isLoggedIn ? (
                <button 
                  onClick={() => setStep('payment')}
                  className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl shadow-white/10"
                >
                  Proceed to Payment
                </button>
              ) : (
                <button 
                  onClick={onAuthClick}
                  className="px-10 py-4 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-all"
                >
                  Sign In to Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="glass rounded-3xl border border-white/10 p-8">
           <button onClick={() => setStep('review')} className="text-blue-400 font-bold mb-6 flex items-center gap-2 hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Review
           </button>
           
           <h3 className="text-2xl font-bold text-white mb-8">Secure Payment Gateway</h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
             <button 
                onClick={() => setPaymentMethod('EasyPaisa')}
                className={`p-6 rounded-2xl border transition-all text-left ${paymentMethod === 'EasyPaisa' ? 'bg-blue-500/10 border-blue-500 ring-2 ring-blue-500/20' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
             >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center font-black text-white italic">ep</div>
                  <span className="font-bold text-white">EasyPaisa</span>
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Send funds to:</p>
                <p className="text-xl font-mono text-white tracking-widest">{PAYMENT_DETAILS.easypaisa}</p>
                <p className="text-xs text-gray-400 mt-1">Name: {PAYMENT_DETAILS.accountName}</p>
             </button>

             <button 
                onClick={() => setPaymentMethod('Bank Transfer')}
                className={`p-6 rounded-2xl border transition-all text-left ${paymentMethod === 'Bank Transfer' ? 'bg-purple-500/10 border-purple-500 ring-2 ring-purple-500/20' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
             >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3-3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <span className="font-bold text-white">Bank Transfer</span>
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Send funds to:</p>
                <p className="text-xl font-mono text-white tracking-widest">{PAYMENT_DETAILS.bankTransfer}</p>
                <p className="text-xs text-gray-400 mt-1">Name: {PAYMENT_DETAILS.accountName}</p>
             </button>
           </div>

           <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest">Transaction ID / Reference Number</label>
              <input 
                type="text" 
                placeholder="Enter the TID from your payment confirmation"
                value={reference}
                onChange={e => setReference(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-colors"
              />
              <p className="text-xs text-gray-500 italic">* Our admin team will verify this reference before shipping your items.</p>
           </div>

           <button 
             onClick={handleConfirmPayment}
             className="w-full mt-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-black text-xl rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-blue-500/20 uppercase tracking-tighter"
           >
              Confirm & Complete Payment
           </button>
        </div>
      )}
    </div>
  );
};

export default CartView;
